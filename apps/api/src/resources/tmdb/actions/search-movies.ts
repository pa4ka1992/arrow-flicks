import { z } from 'zod';

import { validateMiddleware } from 'middlewares';
import { tmdbService } from 'services';

import { searchQuerySchema } from 'schemas';
import { AppKoaContext, AppRouter } from 'types';

type ValidatedData = z.infer<typeof searchQuerySchema>;

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const response = await tmdbService.searchMovies(ctx.validatedData);
  const body = await response.json();

  ctx.body = body;
  ctx.status = 200;
}

export default (router: AppRouter) => {
  router.get('/search-movies', validateMiddleware(searchQuerySchema), handler);
};
