import path from 'path'
import passport from 'passport';
import { getRoutes } from '../utils/utils'

export default async (app) => {
  const routes = await getRoutes(path.join(__dirname));
  routes.forEach(([route, routeObj]) => {
    app.use(
      `/app/${route}`,
      passport.authenticate('jwt', { session: false }),
      routeObj,
    );
  });
};
