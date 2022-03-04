const path = require('path');
const passport = require('passport');
const { getRoutes } = require('../../utils/utils');

const directoryPath = path.join(__dirname);

module.exports = async (app) => {
  const routes = await getRoutes(directoryPath);
  routes.forEach(([route, routeObj]) => {
    app.use(
      `/app/${route}`,
      passport.authenticate('jwt', { session: false }),
      routeObj,
    );
  });
};
