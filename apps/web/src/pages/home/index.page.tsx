import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { Box, Center, Container, Grid, Loader, LoadingOverlay, Stack, Title } from '@mantine/core';

import { tmdbApi } from 'resources/tmdb';

import { MovieCard, MoviesFilter, MoviesPagination } from 'components';

const Home: NextPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [enableQuery, setEnableQuery] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      setEnableQuery(true);
    }
  }, [router]);

  const { data: movieSearch, isLoading, isFetching } = tmdbApi.useSearchMovies(params, enableQuery);

  return (
    <>
      <Head>
        <title>Search movies</title>
      </Head>

      <LoadingOverlay visible={isFetching && !isLoading} zIndex={1000} overlayProps={{ radius: 'sm' }} />

      <Container px={{ base: 'xs', md: 'md' }} pos="relative" size={1020}>
        <Box bg="grey.0" pt={{ base: 'xs', lg: 0 }} pb={{ base: 'xs', lg: 'lg' }}>
          <Title mb={{ base: 'sm', xs: 'md', lg: 40 }} fz={{ base: 'md', sm: 'lg', lg: 'xl' }} fw={700} order={1}>
            Movies
          </Title>

          <MoviesFilter />
        </Box>

        {isLoading || !enableQuery ? (
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
