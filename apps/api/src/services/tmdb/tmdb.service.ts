import { RatedMovie } from 'app-types';

import config from 'config';

import db from 'db';

import { DATABASE_DOCUMENTS } from 'app-constants';
import { ratedMovieSchema } from 'schemas';

import { GetMovieDetailsParams, SearchMoviesParams, TmdbServiceConstructorProps } from './tmdb.types';

const service = db.createService<RatedMovie>(DATABASE_DOCUMENTS.MOVIES, {
  schemaValidator: (obj) => ratedMovieSchema.parseAsync(obj),
});

class TmdbService {
  apiUrl: string | undefined;

  apiKey: string | undefined;

  db: typeof service;

  constructor({ apiUrl, apiKey }: TmdbServiceConstructorProps) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
    this.db = service;
  }

  private prepareHeaders(params?: SearchMoviesParams) {
    const query = new URLSearchParams(params);
    const headers = {
      Authorization: `Bearer ${this.apiKey}`,
    };

    return { query, headers };
  }

  searchMovies(params?: SearchMoviesParams) {
    const { headers, query } = this.prepareHeaders(params);

    return fetch(`${this.apiUrl}/discover/movie?${query}`, {
      method: 'GET',
      headers,
    });
  }

  getMoviesGenres() {
    const { headers } = this.prepareHeaders();

    return fetch(`${this.apiUrl}/genre/movie/list`, {
      method: 'GET',
      headers,
    });
  }

  getMovieDetails(params: GetMovieDetailsParams) {
    const { movieId } = params;
    const withVideosQuery = { append_to_response: 'videos' };

    const { headers, query } = this.prepareHeaders(withVideosQuery);

    return fetch(`${this.apiUrl}/movie/${movieId}?${query}`, {
      method: 'GET',
      headers,
    });
  }
}

export default new TmdbService({
  apiUrl: config.TMDB_URL,
  apiKey: config.TMDB_KEY,
});
