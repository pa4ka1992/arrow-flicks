import z from 'zod';

import { validateMiddleware } from 'middlewares';
import { tmdbService } from 'services';

import { paginationSchema } from 'schemas';
import { AppKoaContext, AppRouter } from 'types';

type ValidatedData = z.infer<typeof paginationSchema>;

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const userId = ctx.headers.authorization;
  const { page, perPage, searchValue } = ctx.validatedData;

  if (userId) {
    const ratedMovies = await tmdbService.db.find(
      { userId, original_title: { $regex: searchValue, $options: 'i' } },
      { page, perPage },
    );

    ctx.body = ratedMovies;
    ctx.status = 201;

    return;
  }

  ctx.throwClientError({ error: 'User id is not defined' }, 401);
}

export default (router: AppRouter) => {
  router.get('/get-rated-movies', validateMiddleware(paginationSchema), handler);
};
