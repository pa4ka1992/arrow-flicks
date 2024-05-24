import { ReadonlyURLSearchParams } from 'next/navigation';
import { MovieSort, QuerySeparator, SearchQueryForm } from 'app-types';

import { INITIAL_VALUES } from '../constants';

type ParseSearchParams = (params: ReadonlyURLSearchParams) => SearchQueryForm;

const getArrayQuery = (array: string) => array.split(QuerySeparator.OR);

export const parseSearchParams: ParseSearchParams = (params) => {
  const initialValues = structuredClone(INITIAL_VALUES);

  params.forEach((value, key) => {
    switch (key) {
      case 'with_genres':
        initialValues[key] = getArrayQuery(value);
        break;

      case 'primary_release_year':
        initialValues[key] = getArrayQuery(value).map((year) => new Date(String(year)));
        break;
      case 'sort_by':
        initialValues[key] = value as MovieSort;
        break;

      case 'vote_average.gte':
        initialValues.vote_average.gte = Number(value);
        break;

      case 'vote_average.lte':
        initialValues.vote_average.lte = Number(value);
        break;

      default:
        break;
    }
  });

  return initialValues;
};
