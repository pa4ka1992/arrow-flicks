import { AppKoa } from 'types';

import attachCustomErrors from './middlewares/attach-custom-errors.middleware';
import attachCustomProperties from './middlewares/attach-custom-properties.middleware';
import extractTokens from './middlewares/extract-tokens.middleware';
import routeErrorHandler from './middlewares/route-error-handler.middleware';
import tryToAttachUser from './middlewares/try-to-attach-user.middleware';
import publicRoutes from './public.routes';

const defineRoutes = (app: AppKoa) => {
  app.use(attachCustomErrors);
  app.use(attachCustomProperties);
  app.use(routeErrorHandler);
  app.use(extractTokens);
  app.use(tryToAttachUser);

  publicRoutes(app);
};

export default defineRoutes;
