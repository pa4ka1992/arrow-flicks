import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Anchor, Breadcrumbs, Container, Stack } from '@mantine/core';

import { tmdbApi } from 'resources/tmdb';

import { MovieCard, TrailerCard } from 'components';

import { useRestoreQuery } from 'utils';

import { RoutePath } from 'routes';

const Movie: NextPage = () => {
  const router = useRouter();
  const { path } = useRestoreQuery(RoutePath.Home);

  const { data: movie } = tmdbApi.useGetMovieDetail({ movieId: router.query.id });

  const breadcrumbs = [
    { title: 'Movies', href: path },
    { title: movie?.original_title, href: '#' },
  ];

  if (!movie) {
    return null;
  }

  return (
    <Container size={840}>
      <Breadcrumbs
        fz="xs"
        styles={{
          separator: {
            margin: '0 10px',
          },
        }}
      >
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
