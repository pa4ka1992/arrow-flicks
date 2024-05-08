import config from 'config';

import { GetMovieDetailsParams, SearchMoviesParams, TmdbServiceConstructorProps } from './tmdb.types';

class TmdbService {
  apiUrl: string | undefined;

  apiKey: string | undefined;

  constructor({ apiUrl, apiKey }: TmdbServiceConstructorProps) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
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
