import React, { FC } from 'react';
import { Button, Input } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconSearch } from '@tabler/icons-react';
import { FormName, SearchRatedForm } from 'app-types';

import classes from './index.module.css';

interface RatedSearchProps {
  search: string;
  updateSearch: (value: string) => void;
}

const RatedSearch: FC<RatedSearchProps> = ({ search, updateSearch }) => {
  const form = useForm<SearchRatedForm>({
    name: FormName.MOVIE_SEARCH,
    mode: 'uncontrolled',
    initialValues: {
      searchValue: search,
    },
  });

  const applySearch = ({ searchValue }: SearchRatedForm) => updateSearch(searchValue);

  return (
    <form onSubmit={form.onSubmit(applySearch)}>
      <Input
        classNames={classes}
        leftSection={<IconSearch size={18} />}
        leftSectionPointerEvents="none"
        key={form.key('searchValue')}
        maw={{ base: 350, sm: 400, md: 490 }}
        placeholder="Search movie title"
        rightSection={
          <Button type="submit" size="xs">
            Search
          </Button>
        }
        rightSectionPointerEvents="all"
        {...form.getInputProps('searchValue')}
      />
    </form>
  );
};

export default RatedSearch;
