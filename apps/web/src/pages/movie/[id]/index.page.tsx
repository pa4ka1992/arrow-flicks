import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Anchor, Breadcrumbs, Container, LoadingOverlay, Stack } from '@mantine/core';

import { tmdbApi } from 'resources/tmdb';

import { MovieCard, TrailerCard } from 'components';

import { useRestoreQuery } from 'utils';

import { RoutePath } from 'routes';

import classes from './index.module.css';

const Movie: NextPage = () => {
  const router = useRouter();
  const { path } = useRestoreQuery(RoutePath.Home);

  const { data: movie, isLoading } = tmdbApi.useGetMovieDetail({ movieId: router.query.id });

  const breadcrumbs = [
    { title: 'Movies', href: path },
    { title: movie?.original_title, href: '#' },
  ];

  if (isLoading) {
    return <LoadingOverlay visible zIndex={1000} overlayProps={{ radius: 'sm' }} />;
  }

  if (!movie) {
    return null;
  }

  return (
    <Container px={{ base: 'xs', md: 'md' }} size={840}>
      <Breadcrumbs classNames={classes} fz="xs" mt={{ base: 'sm', sm: 'md', lg: 0 }} mb={{ base: 'sm', sm: 'md' }}>
        {breadcrumbs.map(({ title, href }) => (
          <Anchor fz="xs" component={Link} {...{ href }} key={href}>
            {title}
          </Anchor>
        ))}
      </Breadcrumbs>

      <Stack gap="md">
        <MovieCard mih={350} variant="page" {...{ movie }}>
          <MovieCard.DetailedInfo {...{ movie }} />
        </MovieCard>

        <TrailerCard {...{ movie }} />
      </Stack>
    </Container>
  );
};

export default Movie;
