import React, { FC, Fragment } from 'react';
import { Text } from '@mantine/core';
import { DetailedMovie } from 'app-types';

import { getGenres } from '../utils';
import { getBudget, getDuration, getReleaseDate } from './utils';

interface DetailedInfoProps {
  movie: DetailedMovie;
}

const DetailedInfo: FC<DetailedInfoProps> = ({ movie: { runtime, release_date, revenue, budget, genres } }) => {
  const itemDetails = [
    {
      title: 'Duration',
      value: getDuration(runtime),
    },
    {
      title: 'Premiere',
      value: getReleaseDate(release_date),
    },
    {
      title: 'Budget',
      value: getBudget(budget),
    },
    {
      title: 'Gross worldwide',
      value: getBudget(revenue),
    },
    {
      title: 'Genres',
      value: getGenres(genres),
    },
  ];

  return (
    <>
      {itemDetails.map(
        ({ title, value }) =>
          !!value && (
            <Fragment key={title}>
              <Text c="grey.6" fz={{ base: 'xs', md: 'sm' }} pr="xs" style={{ whiteSpace: 'nowrap' }}>
                {title}
              </Text>
              <Text fz={{ base: 'xs', md: 'sm' }}>{value}</Text>
            </Fragment>
          ),
      )}
    </>
  );
};

export default DetailedInfo;
