import { tmdbService } from 'services';

import { AppKoaContext, AppRouter } from 'types';

async function handler(ctx: AppKoaContext) {
  const response = await tmdbService.getMoviesGenres();
  const body = await response.json();

  ctx.body = body;
  ctx.status = 200;
}

export default (router: AppRouter) => {
  router.get('/get-movies-genres', handler);
};
