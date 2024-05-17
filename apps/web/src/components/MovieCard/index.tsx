import React, { ReactNode } from 'react';
import { Card, Grid, Group, Image, Stack } from '@mantine/core';
import { Movie } from 'app-types';

import config from 'config';

import NoPoster from '../NoPoster';
import { GeneralInfo, Header } from './components';

interface MovieCardProps {
  movie: Movie;
  children: ReactNode;
}

const MovieCard = ({ movie, children }: MovieCardProps) => {
  const { poster_path } = movie;

  const poster = poster_path ? (
    <Image src={`${config.TMDB_URL}/${poster_path}`} height={170} alt="movie poster" />
  ) : (
    <NoPoster />
  );

  return (
    <Card mih={218} h="100%">
      <Group align="flex-start" h="100%" gap="sm" grow wrap="nowrap">
        {poster}

        <Stack gap="sm" h="100%" justify="space-between" maw="100%">
          <Header {...movie} />

          <Grid fz="sm" gutter="xs">
            {children}
          </Grid>
        </Stack>
      </Group>
    </Card>
  );
};

MovieCard.GeneralInfo = GeneralInfo;

export default MovieCard;
