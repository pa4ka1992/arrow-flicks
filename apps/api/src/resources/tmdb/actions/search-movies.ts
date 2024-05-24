import { z } from 'zod';

import { userService } from 'resources/user';

import { validateMiddleware } from 'middlewares';

import { searchQuerySchema } from 'schemas';
import { AppKoaContext, AppRouter, SearchMovieResult } from 'types';

import tmdbService from '../tmdb.service';

type ValidatedData = z.infer<typeof searchQuerySchema>;

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const userId = ctx.headers.authorization;
  const response = await tmdbService.searchMovies(ctx.validatedData);
  const searchResult = (await response.json()) as SearchMovieResult;
  let body = searchResult;

  if (userId) {
    const user = await userService.findOne({ _id: userId });

    if (user) {
      const moviesWithRating = searchResult.results.map((movie) => {
        const rating = user.ratedMovies[movie.id];

        return { ...movie, rating };
      });

      body = { ...searchResult, results: moviesWithRating };
    }
  }

  ctx.body = body;
  ctx.status = 200;
}

export default (router: AppRouter) => {
  router.get('/search-movies', validateMiddleware(searchQuerySchema), handler);
};
