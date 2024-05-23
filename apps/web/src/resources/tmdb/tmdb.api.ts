import { useMutation, useQuery } from '@tanstack/react-query';

import { apiService } from 'services';

import queryClient from 'query-client';

import { DetailedMovie, Movie, MovieGenre, SearchMovieResult } from 'types';

type GetMovieDetailParams = { movieId?: string | string[] };

type UpdateRatingBody = {
  id: number;
  rating: number;
};

type DeleteRatingBody = {
  id: number;
};

export const useSearchMovies = <T extends URLSearchParams>(params: T, enabled = true) =>
  useQuery<SearchMovieResult>({
    queryKey: ['movie', `params:${params.toString()}`],
    queryFn: () => apiService.get(`/movies/search-movies?${params}`),
    enabled,
  });

export const useGetMovieDetail = <T extends GetMovieDetailParams>(params: T) =>
  useQuery<DetailedMovie>({
    queryKey: ['movie', `id:${params}`],
    queryFn: () => apiService.get('/movies/get-movie-details', params),
    enabled: !!params?.movieId,
  });

export const useGetMoviesGenres = () =>
  useQuery<{ genres: MovieGenre[] }>({
    queryKey: ['genres'],
    queryFn: () => apiService.get('/movies/get-movies-genres'),
  });

export const useAddRating = <T extends Movie>() =>
  useMutation<void, unknown, T>({
    mutationFn: (data: T) => apiService.post('/movies/add-rating', data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['movie'],
      });
    },
  });

export const useUpdateRating = <T extends UpdateRatingBody>() =>
  useMutation<void, unknown, T>({
    mutationFn: (data: T) => apiService.put('/movies/update-rating', data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['movie'],
      });
    },
  });

export const useDeleteRating = <T extends DeleteRatingBody>() =>
  useMutation<void, unknown, T>({
    mutationFn: (data: T) => apiService.delete('/movies/delete-rating', data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['movie'],
      });
    },
  });
