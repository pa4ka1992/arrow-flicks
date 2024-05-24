import React, { FC, ReactNode } from 'react';
import { Box, Center, Grid, Stack } from '@mantine/core';
import { UseQueryResult } from '@tanstack/react-query';
import { RatedMovieResult } from 'app-types';

import EmptyMovies from 'components/EmptyMovies';
import Loader from 'components/Loader';
import LoadingOverlay from 'components/LoadingOverlay';

import MovieCard from '../MovieCard';

interface RatedMovieListProps {
  searchValue: string;
  query: UseQueryResult<RatedMovieResult, Error>;
  children: ReactNode;
}

const RatedMovieList: FC<RatedMovieListProps> = ({ query, children, searchValue }) => {
  const { data: ratedSearch, isLoading, isFetching, isFetched } = query;

  if (isLoading) {
    return (
      <Center mt="xl">
        <Loader />
      </Center>
    );
  }

  if (searchValue && isFetched && !ratedSearch?.count) {
    return <EmptyMovies />;
  }

  return (
    <Box>
      <LoadingOverlay visible={isFetching && !isLoading} />

      <Stack gap="lg">
        <Grid gutter={{ base: 'xs', md: 'sm' }}>
          {ratedSearch?.results.map((movie) => (
            <Grid.Col key={movie.id} span={{ base: 12, xs: 6 }}>
              <MovieCard mih={170} {...{ movie }}>
                <MovieCard.GeneralInfo genres={movie.genre_ids} />
              </MovieCard>
            </Grid.Col>
          ))}
        </Grid>

        {children}
      </Stack>
    </Box>
  );
};

export default RatedMovieList;
