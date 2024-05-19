import { AnchorProps } from '@mantine/core';

import { MovieCardVariant } from '../../constants';

export const PosterVariant: Record<`${MovieCardVariant}`, AnchorProps> = {
  [MovieCardVariant.LIST]: {
    maw: 120,
    h: 170,
  },

  [MovieCardVariant.PAGE]: {
    maw: 250,
    miw: 0,
    h: 350,
  },
};
