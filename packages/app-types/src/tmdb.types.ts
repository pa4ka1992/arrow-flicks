import { MovieSort } from 'enums';
import z from 'zod';

import { searchQuerySchema } from 'schemas';

interface Movie {
  original_title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

export interface MovieGenre {
  id: number;
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

export interface GeneralMovie extends Movie {
  genre_ids: number[];
}

export interface SearchMovieResult {
  page: number;
  results: GeneralMovie[];
  total_pages: number;
  total_results: number;
}

export interface DetailedMovie extends Movie {
  runtime: number;
  budget: number;
  revenue: number;
  genres: MovieGenre[];
  overview: string;
  production_companies: string;
  videos: {
    results: MovieTrailer[];
  };
}

export type SearchQuery = z.infer<typeof searchQuerySchema>;

type VoteAverage = {
  lte?: string | number;
  gte?: string | number;
};

export type SearchQueryForm = {
  with_genres?: string[];
  primary_release_year?: Date[];
  sort_by: MovieSort;
  vote_average: VoteAverage;
};
