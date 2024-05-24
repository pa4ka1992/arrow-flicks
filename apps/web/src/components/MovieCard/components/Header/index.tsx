import React, { FC } from 'react';
import Link from 'next/link';
import { Anchor, Group, GroupProps, Title } from '@mantine/core';
import { Movie } from 'app-types';

import { RoutePath } from 'routes';

import Rating from '../Rating';

interface HeaderProps extends GroupProps {
  movie: Movie;
}

const Header: FC<HeaderProps> = ({ movie, ...groupProps }) => (
  <Group align="flex-start" gap="sm" justify="space-between" wrap="nowrap" {...groupProps}>
    <Anchor component={Link} href={{ pathname: RoutePath.Movie, query: { id: movie.id } }}>
      <Title c="purple.6" fz={{ base: 'sm', sm: 'md' }} order={3}>
        {movie.original_title}
      </Title>
    </Anchor>

    <Rating {...{ movie }} />
  </Group>
);

export default Header;
