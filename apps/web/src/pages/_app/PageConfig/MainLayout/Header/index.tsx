import React, { FC } from 'react';
import { AppShell, Group } from '@mantine/core';

import Logo from '../Logo';

const Header: FC = () => (
  <AppShell.Header bg="purple.3" hiddenFrom="lg" mr={-16} p="xs" withBorder={false}>
    <Group align="center" h="100%" justify="flex-start" grow>
      <Logo />
    </Group>
  </AppShell.Header>
);

export default Header;
