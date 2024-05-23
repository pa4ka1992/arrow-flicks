import { z } from 'zod';

import { userService } from 'resources/user';

import { validateMiddleware } from 'middlewares';
import { tmdbService } from 'services';

import { AppKoaContext, AppRouter, DetailedMovie } from 'types';

const schema = z.object({
  movieId: z.string(),
});

type ValidatedData = z.infer<typeof schema>;

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const userId = ctx.headers.authorization;
  const response = await tmdbService.getMovieDetails(ctx.validatedData);
  const detailedMovie = (await response.json()) as DetailedMovie;

  let body = detailedMovie;

  if (userId) {
    const user = await userService.findOne({ _id: userId });

    if (user) {
      const rating = user.ratedMovies[detailedMovie.id];

      body = { ...detailedMovie, rating };
    }
  }

  ctx.body = body;
  ctx.status = 200;
}

export default (router: AppRouter) => {
  router.get('/get-movie-details', validateMiddleware(schema), handler);
};
