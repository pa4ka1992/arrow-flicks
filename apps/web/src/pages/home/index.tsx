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
  const { data: result } = tmdbApi.useSearchMovies(params, router.isReady);

  return (
    <Stack gap="lg">
      <Grid gutter="sm">
        <Grid.Col key="asdasdasdasdas" span={6}>
          <MovieCard
            {...{
              movie: {
                id: 123123,
                original_title: 'asdasdss',
                release_date: '1992',
                vote_count: 12313,
                vote_average: 12312,
              },
            }}
          >
            <MovieCard.GeneralInfo genres={[1]} />
          </MovieCard>
        </Grid.Col>

        {result?.results?.map((movie) => (
          <Grid.Col key={movie.id} span={6}>
            <MovieCard {...{ movie }}>
              <MovieCard.GeneralInfo genres={movie.genre_ids} />
            </MovieCard>
          </Grid.Col>
        ))}
      </Grid>

      <MoviesPagination total={result?.total_pages} styles={{ root: { alignSelf: 'flex-end' } }} />
    </Stack>
  );
};

export default Home;
