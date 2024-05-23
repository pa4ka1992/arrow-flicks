import { Movie } from 'app-types';

export const getMovieFields = ({
  id,
  genre_ids,
  release_date,
  original_title,
  vote_average,
  vote_count,
  poster_path,
  rating,
}: Movie) => ({
  id,
  genre_ids,
  release_date,
  original_title,
  vote_average,
  vote_count,
  poster_path,
  rating,
});
