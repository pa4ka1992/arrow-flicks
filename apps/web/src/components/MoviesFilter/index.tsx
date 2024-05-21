import React, { FC, useLayoutEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { Button, Group } from '@mantine/core';
import { FormName, SearchQueryForm, StorageKey } from 'app-types';

import { tmdbApi } from 'resources/tmdb';

import { debouce } from 'utils';

import { TMDB_DEFAULT_SORT } from 'app-constants';

import { GenresSelect, ReleaseYearSelect, SortSelect, VoteAverageInput } from './components';
import { FilterFormProvider, useFilterForm } from './form.context';
import { parseSearchParams, stringifySearchParams } from './utils';

const INITIAL_VALUES: SearchQueryForm = {
  with_genres: undefined,
  primary_release_year: undefined,
  vote_average: {},
  sort_by: TMDB_DEFAULT_SORT,
};

const DEBOUNCE_TIME = 300;

const MoviesFilter: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const [isInitialQueryApplied, setIsInitialQueryApplied] = useState(false);

  const { isSuccess: isGenresSuccess } = tmdbApi.useGetMoviesGenres();

  const replaceQuery = (query: URLSearchParams) => router.replace(`${router.pathname}?${query}`);

  const applyQueries = debouce(replaceQuery, DEBOUNCE_TIME, timer.current);

  const form = useFilterForm({
    name: FormName.MOVIE_SEARCH,
    mode: 'uncontrolled',
    initialValues: INITIAL_VALUES,

    onValuesChange: (values) => {
      if (form.isTouched()) {
        const queryString = stringifySearchParams(values);

        localStorage.setItem(StorageKey.FILTER, queryString.toString());
        applyQueries(queryString);
      }
    },
  });

  const isResetDisabled = !form.isDirty();

  const resetForm = () => {
    form.reset();
    localStorage.removeItem(StorageKey.FILTER);
  };

  useLayoutEffect(() => {
    if (isInitialQueryApplied) {
      return;
    }

    if (router.isReady && isGenresSuccess) {
      form.setValues(parseSearchParams(searchParams));

      setIsInitialQueryApplied(true);
    }
  }, [form, searchParams, isGenresSuccess, router, isInitialQueryApplied]);

  return (
    <FilterFormProvider form={form}>
      <form>
        <Group align="flex-end" gap="sm" grow wrap="nowrap">
          <GenresSelect formIsReady={isInitialQueryApplied} />
          <ReleaseYearSelect />
          <Group align="flex-end" wrap="nowrap" gap={8}>
            <VoteAverageInput label="Ratings" placeholder="From" formKey="vote_average.gte" />
            <VoteAverageInput placeholder="To" formKey="vote_average.lte" />
          </Group>

          <Button
            disabled={isResetDisabled}
            flex="0 0 auto"
            p={0}
            onClick={resetForm}
            type="reset"
            variant="transparent"
          >
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
