import React, { FC, useRef } from 'react';
import Link from 'next/link';
import { Anchor, Group, Stack, Text, Title } from '@mantine/core';
import { IconStarFilled } from '@tabler/icons-react';
import { Movie } from 'app-types';

import { RoutePath } from 'routes';

import Rating from '../Rating';

const Header: FC<Movie> = ({ id, original_title, release_date, vote_average, vote_count }) => {
  const formatter = useRef(Intl.NumberFormat('en', { notation: 'compact' }));

  return (
    <Stack gap={6}>
      <Group align="flex-start" justify="space-between" wrap="nowrap">
        <Anchor component={Link} href={{ pathname: RoutePath.Movie, query: { id } }}>
          <Title c="purple.6" order={3}>
            {original_title}
          </Title>
        </Anchor>

        <Rating {...{ id }} title={original_title} />
      </Group>

      <Text c="grey.6" fz="sm">
        {parseInt(release_date, 10)}
      </Text>

      <Group align="center" c="yellow.6" lh={1} gap={4}>
        <IconStarFilled width={26} height={26} />
        <Text c="black" fw={600} fz="sm">
          {vote_average.toFixed(1)}
        </Text>
        <Text c="grey.6" fz="sm" pl={4}>
          ({formatter.current.format(vote_count)})
        </Text>
      </Group>
    </Stack>
  );
};

export default Header;
