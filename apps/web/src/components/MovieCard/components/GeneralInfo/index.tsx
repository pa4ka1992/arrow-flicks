import React, { FC, useMemo } from 'react';
import { Text } from '@mantine/core';
import { GeneralMovie } from 'app-types';

import { tmdbApi } from 'resources/tmdb';

import { getGenres } from '../utils';

interface GeneralInfoProps {
  genres: GeneralMovie['genre_ids'];
}

const GeneralInfo: FC<GeneralInfoProps> = ({ genres }) => {
  const { data } = tmdbApi.useGetMoviesGenres();

  const activeGenres = useMemo(() => data?.genres.filter(({ id }) => genres.includes(id)), [data, genres]);

  if (!activeGenres?.length) {
    return null;
  }

  return (
    <>
      <Text fz="sm" c="grey.6">
        Genres
      </Text>
      <Text fz="sm"> {getGenres(activeGenres)}</Text>
    </>
  );
};

export default GeneralInfo;
