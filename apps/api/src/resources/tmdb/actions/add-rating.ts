import { z } from 'zod';

import { userService } from 'resources/user';

import { validateMiddleware } from 'middlewares';

import { ratedMovieSchema } from 'schemas';
import { AppKoaContext, AppRouter } from 'types';

import tmdbService from '../tmdb.service';

const schema = ratedMovieSchema.omit({ _id: true, userId: true });

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

      const createdMovie = await tmdbService.db.insertOne({ ...ctx.validatedData, userId });

      ctx.body = createdMovie;
      ctx.status = 201;

      return;
    }
  }

  ctx.throwClientError({ error: 'User id is not defined' }, 401);
}

export default (router: AppRouter) => {
  router.post('/add-rating', validateMiddleware(schema), handler);
};
