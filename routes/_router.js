import path from "path";
import { getRoutes } from "../utils/utils";

export default async app => {
  const routes = await getRoutes(path.join(__dirname));
  routes.forEach(([route, routeObj]) => {
    app.use(`/${route}`, routeObj);
  });
};
