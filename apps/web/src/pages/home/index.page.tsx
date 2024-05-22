import React from 'react';
import { NextPage } from 'next';
import { useSearchParams } from 'next/navigation';
import { Box, Center, Container, Grid, Loader, LoadingOverlay, Stack, Title } from '@mantine/core';

import { tmdbApi } from 'resources/tmdb';

import { MovieCard, MoviesFilter, MoviesPagination } from 'components';

const Home: NextPage = () => {
  const params = useSearchParams();

  const { data: movieSearch, isLoading, isFetching } = tmdbApi.useSearchMovies(params);

  return (
    <>
      <LoadingOverlay visible={isFetching} zIndex={1000} overlayProps={{ radius: 'sm' }} />

      <Container px={{ base: 'xs', md: 'md' }} pos="relative" size={1020}>
        <Box bg="grey.0" pt={{ base: 'xs', lg: 0 }} pb={{ base: 'xs', lg: 'lg' }}>
          <Title mb={{ base: 'sm', xs: 'md', lg: 40 }} fz={{ base: 'md', sm: 'lg', lg: 'xl' }} fw={700} order={1}>
            Movies
          </Title>

          <MoviesFilter />
        </Box>

        {isLoading ? (
          <Center mt="xl">
            <Loader size="md" />
          </Center>
        ) : (
          <Box>
            <Stack gap="lg">
              <Grid gutter={{ base: 'xs', md: 'sm' }}>
                {movieSearch?.results?.map((movie) => (
                  <Grid.Col key={movie.id} span={{ base: 12, xs: 6 }}>
                    <MovieCard mih={170} {...{ movie }}>
                      <MovieCard.GeneralInfo genres={movie.genre_ids} />
                    </MovieCard>
                  </Grid.Col>
                ))}
              </Grid>

              <MoviesPagination total={movieSearch?.total_pages} styles={{ root: { alignSelf: 'flex-end' } }} />
            </Stack>
          </Box>
        )}
      </Container>
    </>
  );
};

export default Home;
