import { Inter } from 'next/font/google';
import { createTheme, DEFAULT_THEME, rem } from '@mantine/core';

import * as components from './components';

const inter = Inter({ subsets: ['latin'] });

const theme = createTheme({
  fontFamily: inter.style.fontFamily,
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: {
    fontFamily: `${inter.style.fontFamily}, ${DEFAULT_THEME.fontFamily}`,
    fontWeight: '600',
    sizes: {
      h1: {
        fontSize: rem(32),
      },
    },
  },
  fontSizes: {
    xl: rem(32),
    lg: rem(24),
    md: rem(20),
    sm: rem(16),
    xs: rem(14),
  },
  spacing: {
    xl: rem(32),
    lg: rem(24),
    md: rem(20),
    sm: rem(16),
    xs: rem(12),
  },
  primaryColor: 'purple',
  colors: {
    purple: [
      '#F2EBF9',
      '#F2EBF9',
      '#F2EBF9',
      '#E5D5FA',
      '#D1B4F8',
      '#BD93F7',
      '#9854F6',
      '#541F9D',
      '#541F9D',
      '#541F9D',
    ],
  },
  components,
});

export default theme;
