import React, { FC } from 'react';
import { Select } from '@mantine/core';

import { TMDB_SEARCH_SORT_OPTIONS } from 'app-constants';

import { useFilterFormContext } from '../../form.context';

const SortSelect: FC = () => {
  const form = useFilterFormContext();

  return (
    <Select
      data={TMDB_SEARCH_SORT_OPTIONS}
      key={form.key('sort_by')}
      label="Sort by"
      {...form.getInputProps('sort_by')}
    />
  );
};

export default SortSelect;
