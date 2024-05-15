import { QuerySeparator, SearchQueryForm } from 'app-types';

type StringifySearchParams = (formData: SearchQueryForm) => URLSearchParams;

const INITIAL_QUERY = '?';

export const stringifySearchParams: StringifySearchParams = ({
  with_genres,
  primary_release_year,
  sort_by,
  vote_average,
}) => {
  const transformedValues = {
    with_genres,
    primary_release_year,
    sort_by,
    'vote_average.lte': vote_average.lte,
    'vote_average.gte': vote_average.gte,
  };

  const queryParams = Object.entries(transformedValues).reduce((queryString, [key, value]) => {
    if (!value) {
      return queryString;
    }

    if (!Array.isArray(value)) {
      const fixedValue = typeof value === 'number' ? value.toFixed(1) : value;

      queryString += `${key}=${fixedValue}&`;
      return queryString;
    }

    const transformDates = value.map((data) => {
      if (data instanceof Date) {
        return data.getFullYear();
      }

      return data;
    });

    if (!transformDates.length) {
      return queryString;
    }

    const joinedValues = transformDates.join(QuerySeparator.OR);

    queryString += `${key}=${joinedValues}&`;
    return queryString;
  }, INITIAL_QUERY);

  return new URLSearchParams(queryParams);
};
