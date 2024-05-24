import { z } from 'zod';

import { userService } from 'resources/user';

import { validateMiddleware } from 'middlewares';

import { AppKoaContext, AppRouter } from 'types';

import tmdbService from '../tmdb.service';

const schema = z.object({
  id: z.number(),
  rating: z.number(),
});

type ValidatedData = z.infer<typeof schema>;

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const userId = ctx.headers.authorization;
  const { id, rating } = ctx.validatedData;

  if (userId) {
    const user = await userService.findOne({ _id: userId });

    if (user) {
      const { ratedMovies } = user;

      ratedMovies[id] = rating;
      await userService.updateOne({ _id: userId }, () => ({ ratedMovies }));

      const updatedMovie = await tmdbService.db.updateOne({ userId, id }, () => ({
        rating,
      }));

      ctx.body = updatedMovie;
      ctx.status = 200;

      return;
    }
  }

  ctx.throwClientError({ error: 'User id is not defined' }, 401);
}

export default (router: AppRouter) => {
  router.put('/update-rating', validateMiddleware(schema), handler);
};
