import { SearchQueryForm } from 'app-types';

import { TMDB_DEFAULT_SORT } from 'app-constants';

export const INITIAL_VALUES: SearchQueryForm = {
  with_genres: [],
  primary_release_year: null,
  vote_average: {
    gte: '',
    lte: '',
  },
  sort_by: TMDB_DEFAULT_SORT,
};

export const DEBOUNCE_TIME = 500;
