import React, { FC } from 'react';
import Link from 'next/link';
import { Anchor, Group, GroupProps, Title } from '@mantine/core';
import { Movie } from 'app-types';

import { RoutePath } from 'routes';

import Rating from '../Rating';

interface HeaderProps extends GroupProps {
  movieId: Movie['id'];
  title: Movie['original_title'];
}

const Header: FC<HeaderProps> = ({ movieId, title, ...groupProps }) => (
  <Group align="flex-start" justify="space-between" wrap="nowrap" {...groupProps}>
    <Anchor component={Link} href={{ pathname: RoutePath.Movie, query: { id: movieId } }}>
      <Title c="purple.6" fz={{ base: 'sm', sm: 'md' }} order={3}>
        {title}
      </Title>
    </Anchor>

    <Rating {...{ movieId, title }} />
  </Group>
);

export default Header;
