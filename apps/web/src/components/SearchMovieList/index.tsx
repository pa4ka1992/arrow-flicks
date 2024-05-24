import React, { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { Box, Center, Grid, Stack } from '@mantine/core';

import { tmdbApi } from 'resources/tmdb';

import EmptyMovies from 'components/EmptyMovies';
import Loader from 'components/Loader';
import LoadingOverlay from 'components/LoadingOverlay';

import MovieCard from '../MovieCard';
import MoviesPagination from '../MoviesPagination';

const SearchMovieList: FC = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [enableQuery, setEnableQuery] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      setEnableQuery(true);
    }
  }, [router]);

  const { data: movieSearch, isLoading, isFetching, isFetched } = tmdbApi.useSearchMovies(params, enableQuery);

  if (isLoading || !enableQuery) {
    return (
      <Center mt="xl">
        <Loader />
      </Center>
    );
  }

  if (isFetched && !movieSearch?.results.length) {
    return <EmptyMovies />;
  }

  return (
    <Box>
      <LoadingOverlay visible={isFetching && !isLoading} />

      <Stack gap="lg">
        <Grid gutter={{ base: 'xs', md: 'sm' }}>
          {movieSearch?.results.map((movie) => (
            <Grid.Col key={movie.id} span={{ base: 12, xs: 6 }}>
              <MovieCard mih={170} {...{ movie }}>
                <MovieCard.GeneralInfo genres={movie.genre_ids} />
              </MovieCard>
            </Grid.Col>
          ))}
        </Grid>

        {movieSearch && (
          <MoviesPagination total={movieSearch.total_pages} styles={{ root: { alignSelf: 'flex-end' } }} />
        )}
      </Stack>
    </Box>
  );
};

export default SearchMovieList;
