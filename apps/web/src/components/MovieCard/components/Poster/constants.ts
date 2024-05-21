import { AnchorProps } from '@mantine/core';

import { MovieCardVariant } from '../../constants';

export const PosterVariant: Record<`${MovieCardVariant}`, AnchorProps> = {
  [MovieCardVariant.LIST]: {
    maw: { base: 200, xs: 120 },
    h: { base: 300, xs: 170 },
  },

  [MovieCardVariant.PAGE]: {
    maw: { base: 230, xs: 250 },
    miw: 0,
    h: { base: 330, xs: 350 },
  },
};
