import redisClient from 'redis-client';

import { AppKoaContext, AppRouter, MovieGenre } from 'types';

import tmdbService from '../tmdb.service';

const GENRES_LIFETIME = 120;
const REDIS_KEY = 'genres';

async function handler(ctx: AppKoaContext) {
  const redisGenres = await redisClient.get(REDIS_KEY);

  let movieGenres: MovieGenre[];

  if (redisGenres) {
    const genres = JSON.parse(redisGenres) as MovieGenre[];

    movieGenres = genres;
  } else {
    const response = await tmdbService.getMoviesGenres();
    const genres = (await response.json()) as MovieGenre[];

    movieGenres = genres;
    await redisClient.setex(REDIS_KEY, GENRES_LIFETIME, JSON.stringify(genres));
  }

  ctx.body = movieGenres;
  ctx.status = 200;
}

export default (router: AppRouter) => {
  router.get('/get-movies-genres', handler);
};
