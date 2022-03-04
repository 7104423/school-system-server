const path = require('path');
const { getRoutes } = require('../utils/utils');

const directoryPath = path.join(__dirname);

module.exports = async (app) => {
  const routes = await getRoutes(directoryPath);
  routes.forEach(([route, routeObj]) => {
    app.use(`/${route}`, routeObj);
  });
};
