import React from 'react';
import { IconMovie, IconStar } from '@tabler/icons-react';

import { RoutePath } from 'routes';

export const NAVBAR_LINK = {
  home: { label: 'Movies', leftSection: <IconMovie /> },
  rated: { label: 'Rated movies', leftSection: <IconStar />, href: RoutePath.Rated },
};
