import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Box, Container, Title } from '@mantine/core';

import { MoviesFilter, SearchMovieList } from 'components';

const Home: NextPage = () => (
  <>
    <Head>
      <title>Search movies</title>
    </Head>

    <Container px={{ base: 'xs', md: 'md' }} size={1020} style={{ flexGrow: 1 }}>
      <Box bg="grey.0" pt={{ base: 'xs', lg: 0 }} pb={{ base: 'xs', lg: 'lg' }}>
        <Title mb={{ base: 'sm', xs: 'md', lg: 40 }} fz={{ base: 'md', sm: 'lg', lg: 'xl' }} fw={700} order={1}>
          Movies
        </Title>

        <MoviesFilter />
      </Box>

      <SearchMovieList />
    </Container>
  </>
);

export default Home;
