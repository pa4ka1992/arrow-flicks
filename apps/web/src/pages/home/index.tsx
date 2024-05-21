import React from 'react';
import { NextPage } from 'next';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { Box, Container, Grid, Stack, Title } from '@mantine/core';

import { tmdbApi } from 'resources/tmdb';

import { MovieCard, MoviesFilter, MoviesPagination } from 'components';

const Home: NextPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const { data: movieSearch } = tmdbApi.useSearchMovies(params, router.isReady);

  return (
    <Container pos="relative" size={1020}>
      <Box bg="grey.0" pt={{ base: 30, lg: 0 }} pb="lg" top={0} style={{ zIndex: 1 }}>
        <Title mb={40} fw={700} order={1}>
          Movies
        </Title>

        <MoviesFilter />
      </Box>

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
    </Container>
  );
};

export default Home;
