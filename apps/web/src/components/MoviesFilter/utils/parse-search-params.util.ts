import { ReadonlyURLSearchParams } from 'next/navigation';
import { QuerySeparator, SearchQueryForm } from 'app-types';

type ParseSearchParams = (params: ReadonlyURLSearchParams) => SearchQueryForm;

const getArrayQuery = (array: string) => array.split(QuerySeparator.OR);

export const parseSearchParams: ParseSearchParams = (params) => {
  const initialValues: any = { vote_average: {} };

  params.forEach((value, key) => {
    if (key === 'page') {
      return;
    }

    if (key === 'with_genres') {
      const genresArray = getArrayQuery(value);

      initialValues[key] = genresArray;
      return;
    }

    if (key === 'primary_release_year') {
      const yearArray = getArrayQuery(value);

      initialValues[key] = yearArray.map((year) => new Date(String(year)));
      return;
    }

    if (['vote_average.lte', 'vote_average.gte'].includes(key)) {
      const slicedKey = key.replace('vote_average.', '');

      initialValues.vote_average[slicedKey] = Number(value);
      return;
    }

    initialValues[key] = value;
  });

  return initialValues as SearchQueryForm;
};
