import React, { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Anchor, AppShell, Breadcrumbs } from '@mantine/core';

import { tmdbApi } from 'resources/tmdb';

import { RoutePath } from 'routes';

import Container from '../Container';

const Header: FC = () => {
  const router = useRouter();

  const { data: movie } = tmdbApi.useGetMovieDetail({ movieId: router.query.id });

  const items = [
    { title: 'Movies', href: RoutePath.Home },
    { title: movie?.original_title, href: '#' },
  ];

  return (
    <AppShell.Header pt={40} bg="grey.2" withBorder={false}>
      <Container>
        <Breadcrumbs
          fz="xs"
          styles={{
            separator: {
              margin: '0 10px',
            },
          }}
        >
          {items.map(({ title, href }) => (
            <Anchor fz="xs" component={Link} {...{ href }} key={href}>
              {title}
            </Anchor>
          ))}
        </Breadcrumbs>
      </Container>
    </AppShell.Header>
  );
};

export default Header;
