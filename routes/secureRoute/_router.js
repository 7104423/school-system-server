const path = require('path');
const { getRoutes } = require('../../utils/utils');

const directoryPath = path.join(__dirname);

module.exports = (app) => {
  getRoutes(directoryPath).forEach(([route, routeObj]) => {
    app.use(route, routeObj);
  });
};
