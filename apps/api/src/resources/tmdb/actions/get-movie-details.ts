import { z } from 'zod';

import { validateMiddleware } from 'middlewares';
import { tmdbService } from 'services';

import { AppKoaContext, AppRouter } from 'types';

const schema = z.object({
  movieId: z.string(),
});

type ValidatedData = z.infer<typeof schema>;

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const response = await tmdbService.getMovieDetails(ctx.validatedData);
  const body = await response.json();

  ctx.body = body;
  ctx.status = 200;
}

export default (router: AppRouter) => {
  router.get('/get-movie-details', validateMiddleware(schema), handler);
};
