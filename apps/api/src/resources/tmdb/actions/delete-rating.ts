import { z } from 'zod';

import { userService } from 'resources/user';

import { validateMiddleware } from 'middlewares';

import { AppKoaContext, AppRouter } from 'types';

import tmdbService from '../tmdb.service';

const schema = z.object({
  id: z.number(),
});

type ValidatedData = z.infer<typeof schema>;

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const userId = ctx.headers.authorization;
  const { id } = ctx.validatedData;

  if (userId) {
    const user = await userService.findOne({ _id: userId });

    if (user) {
      const ratedMovies = { ...user.ratedMovies };

      delete ratedMovies[id];
      await userService.updateOne({ _id: userId }, () => ({ ratedMovies }));

      await tmdbService.db.deleteOne({ userId, id });

      ctx.body = ctx.validatedData;
      ctx.status = 200;

      return;
    }
  }

  ctx.throwClientError({ error: 'User id is not defined' }, 401);
}

export default (router: AppRouter) => {
  router.delete('/delete-rating', validateMiddleware(schema), handler);
};
