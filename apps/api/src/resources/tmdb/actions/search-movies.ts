import { z } from 'zod';

import { validateMiddleware } from 'middlewares';
import { tmdbService } from 'services';

import { AppKoaContext, AppRouter } from 'types';

const sortTypeSchema = z.enum(['original_title.asc', 'popularity.asc']);

const schema = z.object({
  page: z.string(),
  with_genres: z.string().optional(),
  primary_release_year: z.string().optional(),
  'vote_average.lte': z.string().optional(),
  'vote_average.gte': z.string().optional(),
  sort_by: sortTypeSchema.optional(),
});

type ValidatedData = z.infer<typeof schema>;

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const response = await tmdbService.searchMovies(ctx.validatedData);
  const body = await response.json();

  ctx.body = body;
  ctx.status = 200;
}

export default (router: AppRouter) => {
  router.get('/search-movies', validateMiddleware(schema), handler);
};
