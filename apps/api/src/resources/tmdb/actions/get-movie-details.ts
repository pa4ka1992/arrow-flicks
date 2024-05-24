import { z } from 'zod';

import { userService } from 'resources/user';

import { validateMiddleware } from 'middlewares';

import redisClient from 'redis-client';

import { AppKoaContext, AppRouter, DetailedMovie } from 'types';

import tmdbService from '../tmdb.service';

const DETAILED_MOVIE_LIFETIME = 60;

const schema = z.object({
  movieId: z.string(),
});

type ValidatedData = z.infer<typeof schema>;

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const userId = ctx.headers.authorization;
  const redisKey = `movie?${ctx.querystring}`;
  const redisMovies = await redisClient.get(redisKey);

  let detailedMovie: DetailedMovie;

  if (redisMovies) {
    const movie = JSON.parse(redisMovies) as DetailedMovie;

    detailedMovie = movie;
  } else {
    const response = await tmdbService.getMovieDetails(ctx.validatedData);
    const movie = (await response.json()) as DetailedMovie;

    detailedMovie = movie;
    await redisClient.setex(redisKey, DETAILED_MOVIE_LIFETIME, JSON.stringify(movie));
  }

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
