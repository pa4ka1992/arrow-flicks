import React, { FC } from 'react';
import { AppShell, Title } from '@mantine/core';

import { MoviesFilter } from 'components';

const Header: FC = () => (
  <AppShell.Header px={90} pt={40} bg="transparent" withBorder={false}>
    <Title mb={40} fw={700} order={1}>
      Movies
    </Title>

    <MoviesFilter />
  </AppShell.Header>
);

export default Header;
