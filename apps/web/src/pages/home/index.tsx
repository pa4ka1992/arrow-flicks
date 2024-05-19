import React from 'react';
import { NextPage } from 'next';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { Grid, Stack } from '@mantine/core';

import { tmdbApi } from 'resources/tmdb';

import { MovieCard, MoviesPagination } from 'components';

const Home: NextPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const { data: movieSearch } = tmdbApi.useSearchMovies(params, router.isReady);

  return (
    <Stack gap="lg">
      <Grid gutter="sm">
        {movieSearch?.results?.map((movie) => (
          <Grid.Col key={movie.id} span={6}>
            <MovieCard mih={170} {...{ movie }}>
              <MovieCard.GeneralInfo genres={movie.genre_ids} />
            </MovieCard>
          </Grid.Col>
        ))}
      </Grid>

      <MoviesPagination total={movieSearch?.total_pages} styles={{ root: { alignSelf: 'flex-end' } }} />
    </Stack>
  );
};

export default Home;
