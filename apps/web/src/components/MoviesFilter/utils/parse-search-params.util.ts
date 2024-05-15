import { ReadonlyURLSearchParams } from 'next/navigation';
import { QuerySeparator, SearchQueryForm } from 'app-types';

type ParseSearchParams = (params: ReadonlyURLSearchParams) => SearchQueryForm;

export const parseSearchParams: ParseSearchParams = (params) => {
  const initialValues: any = { vote_average: {} };

  params.forEach((value, key) => {
    if (key === 'with_genres') {
      const genresArray = value.split(QuerySeparator.OR);

      initialValues[key] = genresArray;
      return;
    }

    if (key === 'primary_release_year') {
      const yearArray = value.split(QuerySeparator.OR);

      initialValues[key] = yearArray.map((year) => new Date(`01.01.${year}`));
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
