const indexRouter = require('./index');
const usersRouter = require('./users');
const loginRouter = require('./login');

const ROUTES = [
  ['/', indexRouter],
  ['/users', usersRouter],
  ['/login', loginRouter],
];

module.exports = (app) => {
  ROUTES.forEach(([route, routeObj]) => {
    app.use(route, routeObj);
  });
};
