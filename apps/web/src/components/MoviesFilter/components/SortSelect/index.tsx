import React, { FC } from 'react';
import { Select } from '@mantine/core';

import { TMDB_SEARCH_SORT_OPTIONS } from 'app-constants';

import { useFilterFormContext } from '../../form.context';

const SortSelect: FC = () => {
  const form = useFilterFormContext();

  return (
    <Select
      data={TMDB_SEARCH_SORT_OPTIONS}
      flex={1}
      key={form.key('sort_by')}
      label="Sort by"
      ml={{ base: 0, md: 'auto' }}
      mr={0}
      miw={{ base: 200, md: 288 }}
      maw={288}
      {...form.getInputProps('sort_by')}
    />
  );
};

export default SortSelect;
