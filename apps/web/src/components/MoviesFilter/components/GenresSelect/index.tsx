import React, { FC, useMemo } from 'react';
import { MultiSelect } from '@mantine/core';

import { tmdbApi } from 'resources/tmdb';

import { useFilterFormContext } from '../../form.context';

const GenresSelect: FC = () => {
  const form = useFilterFormContext();
  const { data } = tmdbApi.useGetMoviesGenres();

  const genresOptions = useMemo(() => data?.genres.map(({ name }) => name), [data]);

  return (
    <MultiSelect
      data={genresOptions}
      key={form.key('with_genres')}
      label="Genres"
      placeholder="Select genre"
      {...form.getInputProps('with_genres')}
    />
  );
};

export default GenresSelect;
