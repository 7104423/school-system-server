import path from "path";
import { authenticate, getRoutes } from "../../utils";

export default async app => {
  const routes = await getRoutes(path.join(__dirname));
  routes.forEach(async ([route, routeFilePromise]) => {
    const { default: routeObj } = await routeFilePromise;
    app.use(`/app/${route}`, authenticate(), routeObj);
  });
};
