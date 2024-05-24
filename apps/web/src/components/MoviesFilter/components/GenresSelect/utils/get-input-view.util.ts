import { MAX_DISPLAYED_VALUES } from '../constants';

export const getInputView = (genres: string[]) =>
  genres.length <= MAX_DISPLAYED_VALUES
    ? genres.slice(0, MAX_DISPLAYED_VALUES).join(', ')
    : `${genres.length} genres selected`;
