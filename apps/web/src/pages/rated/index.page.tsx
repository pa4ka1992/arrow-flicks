import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Container, Group, Pagination, Title } from '@mantine/core';

import { tmdbApi } from 'resources/tmdb';

import { EmptyRated, RatedSearch } from 'components';
import RatedMovieList from 'components/RatedMovieList';

import { TMDB_DEFAULT_PAGE } from 'app-constants';

const RATED_PER_PAGE = 4;

const Rated: NextPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(TMDB_DEFAULT_PAGE);

  const getRatedMovies = tmdbApi.useGetRatedMovies({ page, searchValue, perPage: RATED_PER_PAGE });

  const { data: ratedSearch, isFetched } = getRatedMovies;

  const updateSearch = (value: string) => setSearchValue(value);

  const changePage = (newPage: number) => setPage(newPage);

  const isEmptyRated = !searchValue && isFetched && !ratedSearch?.count;

  if (isEmptyRated) {
    return <EmptyRated />;
  }

  return (
    <>
      <Head>
        <title>Rated movies</title>
      </Head>

      <Container px={{ base: 'xs', md: 'md' }} size={1020} style={{ flexGrow: 1 }}>
        <Group align="center" justify="space-between" mb={{ base: 'sm', xs: 'md', lg: 40 }} mt={{ base: 'xs', lg: 0 }}>
          <Title fz={{ base: 'md', sm: 'lg', lg: 'xl' }} fw={700} order={1}>
            Rated movies
          </Title>

          <RatedSearch {...{ updateSearch, search: searchValue }} />
        </Group>

        <RatedMovieList query={getRatedMovies} {...{ searchValue }}>
          {ratedSearch && (
            <Pagination
              onChange={changePage}
              total={ratedSearch.pagesCount}
              value={page}
              style={{ alignSelf: 'center' }}
            />
          )}
        </RatedMovieList>
      </Container>
    </>
  );
};

export default Rated;
