// Imports
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";
import { createStream } from "rotating-file-stream";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTstrategy, ExtractJwt } from "passport-jwt";
import { OAuth2Client } from "google-auth-library";
import { authenticate } from "./src/utils";
import { UserDAO } from "./src/dao/user.dao";
import AppRouter from "./src/controller/app";

require("dotenv").config();

// App config
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Logger
let accessLogStream = createStream("access.log", {
  interval: "1d",
  rotate: 5,
  path: path.join(__dirname, "logs"),
});

app.use(logger("dev"));
app.use(
  logger(
    '":date[iso]";":remote-addr";":remote-user";":method :url HTTP/:http-version";":status";":res[content-length]";":user-agent"',
    { stream: accessLogStream }
  )
);

// Cors
const cors = require("cors");

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Body parser
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// DB connect
// eslint-disable-next-line max-len
// @ts-ignore
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true });
const db = mongoose.connection;
if (!db) {
  // eslint-disable-next-line no-console
  console.error("Error connecting db");
} else {
  // eslint-disable-next-line no-console
  console.log("Db connected successfully");
}

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await UserDAO.findByEmail(email);

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error, false, { message: error.message });
      }
    }
  )
);

passport.use(
  "google",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "idToken",
    },
    async (email, idToken, done) => {
      try {
        const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        await googleClient.verifyIdToken({
          idToken,
          audience: process.env.GOOGLE_CLIENT_ID,
        });
        const user = await UserDAO.findByEmail(email);
        return done(null, user);
      } catch (error) {
        return done(error, false, { message: "Incorrect Google token" });
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        const id = token?.user?.id ?? null;
        const user = await UserDAO.findByID(id);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Router
/**
 * @param {string} directoryPath
 * @returns {Promise}
 */
const getRoutes = async (directoryPath) => {
  const files = await fs.promises.readdir(directoryPath);
  return files
    .filter((file) => !file.startsWith("_") && file.endsWith(".js"))
    .map((file) => [
      file.replace(".js", ""),
      import(`${directoryPath}/${file}`),
    ]);
};

(async () => {
  const routes = await getRoutes(`${path.join(__dirname)}/src/controller/api`);
  routes.forEach(async ([route, routeFilePromise]) => {
    const { default: routeObj } = await routeFilePromise;
    app.use(`/api/${route}`, routeObj);
  });
})();

(async () => {
  const securedRoutes = await getRoutes(
    `${path.join(__dirname)}/src/controller/api/_secured`
  );
  securedRoutes.forEach(async ([route, routeFilePromise]) => {
    const { default: routeObj } = await routeFilePromise;
    app.use(`/api/app/${route}`, authenticate(), routeObj);
  });
})();

// Built frontend
app.use(express.static("public"));
app.use(`/app`, AppRouter);

// eslint-disable-next-line no-console
console.log("Application runs on: http://localhost:3000/");

/**
 * Module dependencies.
 */

const debug = require("debug")("express:server");
const http = require("http");

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const innerPort = parseInt(val, 10);

  if (Number.isNaN(innerPort)) {
    // named pipe
    return val;
  }

  if (innerPort >= 0) {
    // port number
    return innerPort;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      // eslint-disable-next-line no-console
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      // eslint-disable-next-line no-console
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

export default app;
