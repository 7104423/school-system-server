const path = require('path');
const { getRoutes } = require('../../utils/utils');

module.exports = (app) => {
  const directoryPath = path.join(__dirname);
  getRoutes(directoryPath).forEach(([route, routeObj]) => {
    app.use(route, routeObj);
  });
};
