import { routeUtil } from 'utils';

import getMovieDetails from './actions/get-movie-details';
import getMoviesGenres from './actions/get-movies-genres';
import searchMovies from './actions/search-movies';

const publicRoutes = routeUtil.getRoutes([searchMovies, getMoviesGenres, getMovieDetails]);

export default {
  publicRoutes,
};
