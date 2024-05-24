import { ID_DIVIDER } from '../constants';

export const splitGenresIds = (genres: string[]) => genres.map((genre) => genre.split(ID_DIVIDER)[0]);
