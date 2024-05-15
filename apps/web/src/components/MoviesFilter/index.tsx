import React, { FC, useLayoutEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { Button, Group } from '@mantine/core';
import { MovieSort, SearchQueryForm } from 'app-types';

import { tmdbApi } from 'resources/tmdb';

import { debouce } from 'utils';

import { RoutePath } from 'routes';

import { GenresSelect, ReleaseYearSelect, SortSelect, VoteAverageInput } from './components';
import { FilterFormProvider, useFilterForm } from './form.context';
import { parseSearchParams, stringifySearchParams } from './utils';

const INITIAL_VALUES: SearchQueryForm = {
  with_genres: undefined,
  primary_release_year: undefined,
  vote_average: {},
  sort_by: MovieSort.POPULARITY_ASC,
};

const MoviesFilter: FC = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const { isSuccess: isGenresSuccess } = tmdbApi.useGetMoviesGenres();

  const replaceQuery = (query: URLSearchParams) => replace(`${RoutePath.Home}?${query}`);

  const applyQueries = debouce(replaceQuery, 300, timer.current);

  const form = useFilterForm({
    mode: 'uncontrolled',
    initialValues: INITIAL_VALUES,

    onValuesChange: (values) => {
      const queryString = stringifySearchParams(values);

      applyQueries(queryString);
    },
  });

  const resetForm = () => {
    form.setValues(INITIAL_VALUES);
  };

  useLayoutEffect(() => {
    if (searchParams.size && isGenresSuccess) {
      form.initialize(parseSearchParams(searchParams));
    }
  }, [form, searchParams, isGenresSuccess]);

  return (
    <FilterFormProvider form={form}>
      <form>
        <Group align="flex-end" wrap="nowrap" gap="sm">
          <GenresSelect />
          <ReleaseYearSelect />
          <Group align="flex-end" wrap="nowrap" gap={8}>
            <VoteAverageInput label="Ratings" placeholder="From" formKey="vote_average.lte" />
            <VoteAverageInput placeholder="To" formKey="vote_average.gte" />
          </Group>

          <Button c="gray.6" fw={500} h={42} p={0} onClick={resetForm} type="reset" variant="transparent">
            Reset filters
          </Button>
        </Group>

        <Group mt="lg" justify="flex-end">
          <SortSelect />
        </Group>
      </form>
    </FilterFormProvider>
  );
};

export default MoviesFilter;
