import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Stack } from '@mantine/core';

import { tmdbApi } from 'resources/tmdb';

import { MovieCard, TrailerCard } from 'components';

const Movie: NextPage = () => {
  const router = useRouter();

  const { data: movie } = tmdbApi.useGetMovieDetail({ movieId: router.query.id });

  if (!movie) {
    return null;
  }

  return (
    <Stack gap="md">
      <MovieCard mih={350} variant="page" {...{ movie }}>
        <MovieCard.DetailedInfo {...{ movie }} />
      </MovieCard>

      <TrailerCard {...{ movie }} />
    </Stack>
  );
};

export default Movie;
