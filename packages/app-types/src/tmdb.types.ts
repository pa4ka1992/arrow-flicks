import { MovieSort } from 'enums';
import z from 'zod';

import { ratedMovieSchema, searchQuerySchema } from 'schemas';

export interface Movie {
  id: number;
  original_title: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  poster_path?: string;
  rating?: number;
}

export interface MovieGenre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
}

interface MovieTrailer {
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface DetailedMovie extends Omit<Movie, 'genre_ids'> {
  runtime: number;
  budget: number;
  revenue: number;
  genres: MovieGenre[];
  overview: string;
  production_companies: ProductionCompany[];
  videos: {
    results: MovieTrailer[];
  };
}

export interface SearchMovieResult {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export type SearchQuery = z.infer<typeof searchQuerySchema>;

export type RatedMovie = z.infer<typeof ratedMovieSchema>;

type VoteAverage = {
  lte?: '' | number;
  gte?: '' | number;
};

export type SearchQueryForm = {
  primary_release_year?: Date[];
  sort_by: MovieSort;
  vote_average: VoteAverage;
  with_genres?: string[];
};
