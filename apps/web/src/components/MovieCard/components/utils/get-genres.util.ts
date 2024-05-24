import { MovieGenre } from 'app-types';

export const getGenres = (genres?: MovieGenre[]) => {
  if (!genres?.length) {
    return undefined;
  }

  return genres.map(({ name }) => name).join(', ');
};
