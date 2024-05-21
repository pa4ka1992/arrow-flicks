import React, { FC, useLayoutEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { Button, Flex, Group } from '@mantine/core';
import { FormName, StorageKey } from 'app-types';

import { tmdbApi } from 'resources/tmdb';

import { debouce } from 'utils';

import { GenresSelect, ReleaseYearSelect, SortSelect, VoteAverageInput } from './components';
import { DEBOUNCE_TIME, INITIAL_VALUES } from './constants';
import { FilterFormProvider, useFilterForm } from './form.context';
import { parseSearchParams, stringifySearchParams } from './utils';

import classes from './index.module.css';

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
        <Flex className={classes.filter} pos="relative" align="flex-start">
          <Group className={classes.filterGroup} grow wrap="wrap" style={{ flexGrow: 1 }} maw={{ base: 284, sm: 586 }}>
            <GenresSelect formIsReady={isInitialQueryApplied} />
            <ReleaseYearSelect />
          </Group>

          <Flex className={classes.filterGroup} direction="column" style={{ flexGrow: 1 }} maw={{ base: 288, md: 381 }}>
            <Group align="flex-end" wrap="nowrap" gap={8} grow>
              <VoteAverageInput label="Ratings" placeholder="From" formKey="vote_average.gte" />
              <VoteAverageInput placeholder="To" formKey="vote_average.lte" />

              <Button
                className={classes.reset}
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

            <SortSelect />
          </Flex>
        </Flex>
      </form>
    </FilterFormProvider>
  );
};

export default MoviesFilter;
