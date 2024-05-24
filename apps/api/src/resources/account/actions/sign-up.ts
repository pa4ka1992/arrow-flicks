import { userService } from 'resources/user';

import { AppKoaContext, AppRouter } from 'types';

async function handler(ctx: AppKoaContext) {
  const user = await userService.insertOne({ ratedMovies: {} });

  ctx.body = { id: user._id };

  ctx.status = 201;
}

export default (router: AppRouter) => {
  router.post('/sign-up', handler);
};
