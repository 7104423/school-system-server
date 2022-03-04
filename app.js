// Imports
require('dotenv').config();
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from morgan;
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './routes/_router';
import secureRoute from './routes/app/_router';
import auth from './utils/auth';

// App config
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Body parser
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

// DB connect
// eslint-disable-next-line max-len
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true });
const db = mongoose.connection;
if (!db) {
  // eslint-disable-next-line no-console
  console.error('Error connecting db');
} else {
  // eslint-disable-next-line no-console
  console.log('Db connected successfully');
}

// Auth
auth();

// Router
router(app);
secureRoute(app);

// eslint-disable-next-line no-console
console.log('Application runs on: http://localhost:3000/');

export default app;
