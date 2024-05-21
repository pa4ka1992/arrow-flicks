import React, { ReactNode, useRef } from 'react';
import { Box, Card, Group, MantineStyleProps, Stack, Text } from '@mantine/core';
import { IconStarFilled } from '@tabler/icons-react';
import { Movie } from 'app-types';

import { DetailedInfo, GeneralInfo, Header, Poster } from './components';
import { MovieCardVariant } from './constants';

import classes from './index.module.css';

interface MovieCardProps extends MantineStyleProps {
  movie: Movie;
  children: ReactNode;
  variant?: `${MovieCardVariant}`;
}

const MovieCard = ({
  movie: { id, poster_path, original_title, release_date, vote_average, vote_count },
  children,
  variant = 'list',
  ...mantineProps
}: MovieCardProps) => {
  const formatter = useRef(Intl.NumberFormat('en', { notation: 'compact' }));

  return (
    <Card p={{ base: 'xs', md: 'lg' }} h="100%">
      <Header display={{ base: 'flex', md: 'none' }} movieId={id} pb="xs" title={original_title} />

      <Group className={classes.infoBox} align="flex-start" gap="sm" wrap="nowrap" {...mantineProps}>
        <Poster movieId={id} path={poster_path} {...{ variant }} />

        <Stack flex="1 1 100%" gap={0} justify="space-between" mih={{ base: 'auto', sm: 'inherit' }} maw="100%">
          <Stack className={classes.statistics} gap={6}>
            <Header display={{ base: 'none', md: 'flex' }} movieId={id} title={original_title} />

            {release_date && (
              <Text c="grey.6" fz={{ base: 'xs', md: 'sm' }}>
                {parseInt(release_date, 10)}
              </Text>
            )}

            <Group align="center" c="yellow.6" lh={1} gap={4}>
              <IconStarFilled className={classes.rating} width={26} height={26} />

              {vote_average && (
                <Text c="black" fw={600} fz={{ base: 'xs', md: 'sm' }}>
                  {vote_average.toFixed(1)}
                </Text>
              )}

              <Text c="grey.6" fz={{ base: 'xs', md: 'sm' }} pl={4}>
                ({formatter.current.format(vote_count)})
              </Text>
            </Group>
          </Stack>

          <Box className={classes.info} display="grid" fz="sm" mt={{ base: 'xs', sm: 'lg' }}>
            {children}
          </Box>
        </Stack>
      </Group>
    </Card>
  );
};

MovieCard.GeneralInfo = GeneralInfo;
MovieCard.DetailedInfo = DetailedInfo;

export default MovieCard;
