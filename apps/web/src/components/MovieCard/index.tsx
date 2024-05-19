import React, { ReactNode } from 'react';
import { Box, Card, Group, MantineStyleProps, Stack } from '@mantine/core';
import { Movie } from 'app-types';

import { DetailedInfo, GeneralInfo, Header, Poster } from './components';
import { MovieCardVariant } from './constants';

import classes from './index.module.css';

interface MovieCardProps extends MantineStyleProps {
  movie: Movie;
  children: ReactNode;
  variant?: `${MovieCardVariant}`;
}

const MovieCard = ({ movie, children, variant = 'list', ...mantineProps }: MovieCardProps) => {
  const { id, poster_path } = movie;

  return (
    <Card h="100%">
      <Group align="flex-start" gap="sm" wrap="nowrap" {...mantineProps}>
        <Poster movieId={id} path={poster_path} {...{ variant }} />

        <Stack flex="1 1 100%" gap={0} justify="space-between" mih="inherit" maw="100%">
          <Header {...movie} />

          <Box className={classes.info} display="grid" fz="sm" mt="lg">
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
