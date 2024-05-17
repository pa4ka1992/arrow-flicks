import { MovieSort } from 'app-types';

export const TMDB_DEFAULT_PAGE = 1;

export const TMDB_MAX_PAGE_LIMIT = 500;

export const TMDB_DEFAULT_SORT = MovieSort.POPULARITY_DESC;

export const TMDB_MAX_RATING = 10;

export const TMDB_SEARCH_SORT_OPTIONS = [
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
    label: 'Least popular',
  },
  {
    value: MovieSort.POPULARITY_DESC,
    label: 'Most popular',
  },
  {
    value: MovieSort.RELEASE_DATE_ASC,
    label: 'Earliest release',
  },
  {
    value: MovieSort.RELEASE_DATE_DESC,
    label: 'Latest release',
  },
  {
    value: MovieSort.REVENUE_ASC,
    label: 'Lowest grosser',
  },
  {
    value: MovieSort.REVENUE_DESC,
    label: 'Highest grosser',
  },
  {
    value: MovieSort.VOTE_COUNT_ASC,
    label: 'Least voted',
  },
  {
    value: MovieSort.VOTE_COUNT_DESC,
    label: 'Most voted',
  },
  {
    value: MovieSort.VOTE_AVERAGE_ASC,
    label: 'Lowest rating',
  },
  {
    value: MovieSort.VOTE_AVERAGE_DESC,
    label: 'Highest rating',
  },
];
