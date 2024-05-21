import React, { FC, useMemo } from 'react';
import { Text, Tooltip } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { GeneralMovie } from 'app-types';

import { tmdbApi } from 'resources/tmdb';

import { getGenres } from '../utils';

interface GeneralInfoProps {
  genres: GeneralMovie['genre_ids'];
}

const MAX_SHOWN_GENRES = 2;

const GeneralInfo: FC<GeneralInfoProps> = ({ genres }) => {
  const { data } = tmdbApi.useGetMoviesGenres();
  const xs = useMediaQuery('(max-width: 36em)');

  const activeGenres = useMemo(() => data?.genres?.filter(({ id }) => genres?.includes(id)), [data, genres]);
  const slicedGenres = !xs ? activeGenres?.slice(0, MAX_SHOWN_GENRES) : activeGenres;

  if (!activeGenres?.length) {
    return null;
  }

  const slicedDots = activeGenres.length > 2 && !xs ? '...' : '';

  return (
    <>
      <Text fz={{ base: 'xs', md: 'sm' }} c="grey.6">
        Genres
      </Text>
      <Tooltip visibleFrom="xs" label={getGenres(activeGenres)}>
        <Text fz={{ base: 'xs', md: 'sm' }}>
          {getGenres(slicedGenres)}
          {slicedDots}
        </Text>
      </Tooltip>
    </>
  );
};

export default GeneralInfo;
