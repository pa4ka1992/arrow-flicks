import React, { FC, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { Pagination, PaginationProps } from '@mantine/core';
import { StorageKey } from 'app-types';

import { TMDB_DEFAULT_PAGE, TMDB_MAX_PAGE_LIMIT } from 'app-constants';

const MoviesPagination: FC<Partial<PaginationProps>> = ({ total, ...paginationProps }) => {
  const router = useRouter();
  const params = useSearchParams();
  const [page, setPage] = useState(TMDB_DEFAULT_PAGE);

  const limitedTotalPages = total && total <= TMDB_MAX_PAGE_LIMIT ? total : TMDB_MAX_PAGE_LIMIT;

  const updateQueryPage = useCallback(
    (value: number) => {
      const updatedQuery = { ...router.query, page: String(value) };
      const updatedParams = new URLSearchParams(updatedQuery);

      setPage(value);
      localStorage.setItem(StorageKey.FILTER, updatedParams.toString());
      router.push(`${router.pathname}?${updatedParams}`);
    },
    [router],
  );

  useEffect(() => {
    const queryPage = params.get('page');

    if (!router.isReady || !total || !queryPage) {
      return;
    }

    const parsedPage = Number(queryPage);

    if (Number.isNaN(parsedPage)) {
      updateQueryPage(TMDB_DEFAULT_PAGE);

      return;
    }

    const isInRange = parsedPage <= limitedTotalPages;

    if (!isInRange) {
      updateQueryPage(limitedTotalPages);

      return;
    }

    setPage(parsedPage);
  }, [router, params, total, limitedTotalPages, updateQueryPage]);

  if (!total) {
    return null;
  }

  return <Pagination onChange={updateQueryPage} total={limitedTotalPages} value={page} {...paginationProps} />;
};

export default MoviesPagination;
