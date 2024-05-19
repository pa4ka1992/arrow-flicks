import React, { FC } from 'react';
import { AppShell, Title } from '@mantine/core';

import { MoviesFilter } from 'components';

import Container from '../Container';

const Header: FC = () => (
  <AppShell.Header pt={40} bg="grey.2" withBorder={false}>
    <Container>
      <Title mb={40} fw={700} order={1}>
        Movies
      </Title>

      <MoviesFilter />
    </Container>
  </AppShell.Header>
);

export default Header;
