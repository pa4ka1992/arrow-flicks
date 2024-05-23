import { routeUtil } from 'utils';

import addRating from './actions/add-rating';
import deleteRating from './actions/delete-rating';
import getMovieDetails from './actions/get-movie-details';
import getMoviesGenres from './actions/get-movies-genres';
import getRatedMovies from './actions/get-rated-movies';
import searchMovies from './actions/search-movies';
import updateRating from './actions/update-rating';

const publicRoutes = routeUtil.getRoutes([
  addRating,
  updateRating,
  deleteRating,
  searchMovies,
  getMoviesGenres,
  getMovieDetails,
  getRatedMovies,
]);

export default {
  publicRoutes,
};
