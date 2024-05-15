import React, { FC, ReactElement } from 'react';
import { AppShell, Box } from '@mantine/core';

import Header from './Header';
import Navbar from './Navbar';

interface MainLayoutProps {
  children: ReactElement;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => (
  <AppShell
    padding={0}
    layout="alt"
    header={{
      height: 300,
    }}
    navbar={{
      width: {
        base: 280,
      },
      breakpoint: 'sm',
    }}
    bg="gray.0"
  >
    <Header />
    <Navbar />

    <AppShell.Main display="flex">
      <Box flex="1 0 100%" px={90} pt="md" pb={82}>
        {children}
      </Box>
    </AppShell.Main>
  </AppShell>
);

export default MainLayout;
