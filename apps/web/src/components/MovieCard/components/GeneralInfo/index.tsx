import React, { FC, useMemo } from 'react';
import { Text, Tooltip } from '@mantine/core';
import { GeneralMovie } from 'app-types';

import { tmdbApi } from 'resources/tmdb';

import { getGenres } from '../utils';

interface GeneralInfoProps {
  genres: GeneralMovie['genre_ids'];
}

const MAX_SHOWN_GENRES = 2;

const GeneralInfo: FC<GeneralInfoProps> = ({ genres }) => {
  const { data } = tmdbApi.useGetMoviesGenres();

  const activeGenres = useMemo(() => data?.genres?.filter(({ id }) => genres?.includes(id)), [data, genres]);

  const slicedGenres = activeGenres?.slice(0, MAX_SHOWN_GENRES);

  if (!activeGenres?.length) {
    return null;
  }

  return (
    <>
      <Text fz="sm" c="grey.6">
        Genres
      </Text>
      <Tooltip label={getGenres(activeGenres)}>
        <Text fz="sm">
          {' '}
          {getGenres(slicedGenres)}
          {activeGenres.length > 2 ? '...' : ''}
        </Text>
      </Tooltip>
    </>
  );
};

export default GeneralInfo;
