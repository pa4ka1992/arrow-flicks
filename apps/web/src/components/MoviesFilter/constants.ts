import { SearchQueryForm } from 'app-types';

import { TMDB_DEFAULT_SORT } from 'app-constants';

export const INITIAL_VALUES: SearchQueryForm = {
  with_genres: undefined,
  primary_release_year: undefined,
  vote_average: {},
  sort_by: TMDB_DEFAULT_SORT,
};

export const DEBOUNCE_TIME = 300;
