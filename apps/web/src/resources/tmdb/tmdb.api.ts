import { useQuery } from '@tanstack/react-query';

import { apiService } from 'services';

import { DetailedMovie, MovieGenre, SearchMovieResult } from 'types';

export const useSearchMovies = <T extends URLSearchParams>(params: T, enabled: boolean) =>
  useQuery<SearchMovieResult>({
    queryKey: ['movies', params.toString()],
    queryFn: () => apiService.get(`/movies/search-movies?${params}`),
    enabled,
  });

export const useGetMovieDetail = <T>(params: T) =>
  useQuery<DetailedMovie>({
    queryKey: ['movie', params],
    queryFn: () => apiService.get('/movies/get-movie-details', params),
  });

export const useGetMoviesGenres = () =>
  useQuery<{ genres: MovieGenre[] }>({
    queryKey: ['genres'],
    queryFn: () => apiService.get('/movies/get-movies-genres'),
  });
