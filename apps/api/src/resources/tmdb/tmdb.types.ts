export interface TmdbServiceConstructorProps {
  apiUrl: string | undefined;
  apiKey: string | undefined;
}

export type SearchMoviesParams = Record<string, string>;

export type GetMovieDetailsParams = { movieId: string };
