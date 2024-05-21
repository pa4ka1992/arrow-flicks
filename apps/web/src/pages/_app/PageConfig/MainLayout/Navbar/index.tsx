import React, { FC } from 'react';
import { AppShell } from '@mantine/core';

import Logo from '../Logo';
import Navigation from '../Navigation';

const Navbar: FC = () => (
  <AppShell.Navbar bg="purple.0" visibleFrom="xs" py="lg" px={{ base: 6, lg: 'lg' }} withBorder={false}>
    <Logo visibleFrom="lg" />

    <Navigation />
  </AppShell.Navbar>
);

export default Navbar;
