import { useQuery } from '@tanstack/react-query';

import { apiService } from 'services';

import { DetailedMovie, MovieGenre, SearchMovieResult } from 'types';

export const useSearchMovies = <T>(params: T) =>
  useQuery<SearchMovieResult>({
    queryKey: ['movies', params],
    queryFn: () => apiService.get('/movies/search-movies', params),
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
