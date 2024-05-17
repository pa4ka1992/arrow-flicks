import React, { FC, ReactElement } from 'react';
import { AppShell } from '@mantine/core';

import Container from './Container';
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
      height: 320,
    }}
    navbar={{
      width: {
        base: 280,
      },
      breakpoint: 'sm',
    }}
    bg="grey.2"
  >
    <Header />
    <Navbar />

    <AppShell.Main>
      <Container pb={82}>{children}</Container>
    </AppShell.Main>
  </AppShell>
);

export default MainLayout;
