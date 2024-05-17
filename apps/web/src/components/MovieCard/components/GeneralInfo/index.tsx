import React, { FC, useMemo } from 'react';
import { Grid } from '@mantine/core';
import { GeneralMovie } from 'app-types';

import { tmdbApi } from 'resources/tmdb';

interface GeneralInfoProps {
  genres: GeneralMovie['genre_ids'];
}

const GeneralInfo: FC<GeneralInfoProps> = ({ genres }) => {
  const { data } = tmdbApi.useGetMoviesGenres();

  const activeGenres = useMemo(() => data?.genres.filter(({ id }) => genres.includes(id)), [data, genres]);

  return (
    <>
      <Grid.Col c="grey.6" span="content">
        Genres
      </Grid.Col>
      <Grid.Col span="auto">{activeGenres?.map(({ name }) => name).join(', ')}</Grid.Col>
    </>
  );
};

export default GeneralInfo;
