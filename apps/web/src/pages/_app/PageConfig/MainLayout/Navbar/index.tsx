import React, { FC } from 'react';
import { AppShell } from '@mantine/core';

import { Logo } from 'components';

import Navigation from '../Navigation';

const Navbar: FC = () => (
  <AppShell.Navbar bg="purple.0" visibleFrom="sm" py="lg" px={{ base: 6, lg: 'lg' }} withBorder={false}>
    <Logo visibleFrom="lg" />

    <Navigation />
  </AppShell.Navbar>
);

export default Navbar;
