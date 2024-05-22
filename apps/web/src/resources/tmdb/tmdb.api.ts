import { useQuery } from '@tanstack/react-query';

import { apiService } from 'services';

import { DetailedMovie, MovieGenre, SearchMovieResult } from 'types';

export const useSearchMovies = <T extends URLSearchParams>(params: T, enabled = true) =>
  useQuery<SearchMovieResult>({
    queryKey: ['movies', params.toString()],
    queryFn: () => apiService.get(`/movies/search-movies?${params}`),
    enabled,
  });

export const useGetMovieDetail = <T extends { movieId?: string | string[] }>(params: T) =>
  useQuery<DetailedMovie>({
    queryKey: ['movie', params],
    queryFn: () => apiService.get('/movies/get-movie-details', params),
    enabled: !!params?.movieId,
  });

export const useGetMoviesGenres = () =>
  useQuery<{ genres: MovieGenre[] }>({
    queryKey: ['genres'],
    queryFn: () => apiService.get('/movies/get-movies-genres'),
  });
