import { QuerySeparator, SearchQueryForm } from 'app-types';

import { TMDB_DEFAULT_PAGE } from 'app-constants';

type StringifySearchParams = (formData: SearchQueryForm) => URLSearchParams;

const getDatesYear = (dates?: Date[]) => dates?.map((date) => date.getFullYear());

const getQueryArray = (array?: unknown[]) => array?.join(QuerySeparator.OR);

const getQueryNumber = (number?: number | '') => (number ? String(number.toFixed(1)) : number);

export const stringifySearchParams: StringifySearchParams = ({
  with_genres,
  primary_release_year,
  sort_by,
  vote_average,
}) => {
  const queryPairs: [string, string | number | undefined][] = [
    ['with_genres', getQueryArray(with_genres)],
    ['primary_release_year', getQueryArray(getDatesYear(primary_release_year))],
    ['sort_by', sort_by],
    ['vote_average.lte', getQueryNumber(vote_average.lte)],
    ['vote_average.gte', getQueryNumber(vote_average.gte)],
    ['page', String(TMDB_DEFAULT_PAGE)],
  ];

  const fiteredPairs = queryPairs.filter((pair): pair is [string, string] => !!pair[1]);

  return new URLSearchParams(fiteredPairs);
};
