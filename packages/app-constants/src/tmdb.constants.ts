import { MovieSort } from 'app-types';

export const SEARCH_SORT_OPTIONS = [
  {
    value: MovieSort.TITLE_ASC,
    label: 'From A to Z',
  },
  {
    value: MovieSort.TITLE_DESC,
    label: 'From Z to A',
  },
  {
    value: MovieSort.POPULARITY_ASC,
    label: 'Most popular',
  },
  {
    value: MovieSort.POPULARITY_DESC,
    label: 'Least popular',
  },
  {
    value: MovieSort.RELEASE_DATE_ASC,
    label: 'Latest release',
  },
  {
    value: MovieSort.RELEASE_DATE_DESC,
    label: 'Earliest release',
  },
  {
    value: MovieSort.REVENUE_ASC,
    label: 'Highest grosser',
  },
  {
    value: MovieSort.REVENUE_DESC,
    label: 'Lowest grosser',
  },
  {
    value: MovieSort.VOTE_COUNT_ASC,
    label: 'Most voted',
  },
  {
    value: MovieSort.VOTE_COUNT_DESC,
    label: 'Least voted',
  },
  {
    value: MovieSort.VOTE_AVERAGE_ASC,
    label: 'Highest rating',
  },
  {
    value: MovieSort.VOTE_AVERAGE_DESC,
    label: 'Lowest rating',
  },
];
