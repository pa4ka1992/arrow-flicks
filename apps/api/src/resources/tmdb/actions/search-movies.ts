import { z } from 'zod';

import { userService } from 'resources/user';

import { validateMiddleware } from 'middlewares';

import redisClient from 'redis-client';

import { searchQuerySchema } from 'schemas';
import { AppKoaContext, AppRouter, SearchMovieResult } from 'types';

import tmdbService from '../tmdb.service';

type ValidatedData = z.infer<typeof searchQuerySchema>;

const SEARCH_MOVIE_LIFETIME = 20;

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const userId = ctx.headers.authorization;
  const redisKey = `search?${ctx.querystring}`;
  const redisMovies = await redisClient.get(redisKey);

  let searchResult: SearchMovieResult;

  if (redisMovies) {
    const movies = JSON.parse(redisMovies) as SearchMovieResult;

    searchResult = movies;
  } else {
    const response = await tmdbService.searchMovies(ctx.validatedData);
    const movies = (await response.json()) as SearchMovieResult;

    searchResult = movies;
    await redisClient.setex(redisKey, SEARCH_MOVIE_LIFETIME, JSON.stringify(searchResult));
  }

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
