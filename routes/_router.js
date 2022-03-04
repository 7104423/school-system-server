const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname);

const getRoutes = () => {
  fs.readdir(directoryPath, (error, files) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error(`Unable to scan directory: ${error}`);
      return [];
    }
    return files
      .filter((file) => !file.startsWith('_'))
      .map((file) => file.replace('.js', ''));
  });
};

module.exports = (app) => {
  getRoutes().forEach(([route, routeObj]) => {
    app.use(route, routeObj);
  });
};
