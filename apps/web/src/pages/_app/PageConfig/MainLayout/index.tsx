import React, { FC, ReactElement } from 'react';
import { AppShell } from '@mantine/core';

import Header from './Header';
import Navbar from './Navbar';

interface MainLayoutProps {
  children: ReactElement;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => (
  <AppShell
    padding={0}
    layout="default"
    header={{
      height: {
        base: 50,
        sm: 60,
        lg: 0,
      },
    }}
    navbar={{
      width: {
        base: 0,
        sm: 60,
        lg: 280,
      },
      breakpoint: 'xs',
    }}
    bg="grey.2"
  >
    <Header />
    <Navbar />

    <AppShell.Main pt={{ base: 0, lg: 40 }} pb={82}>
      {children}
    </AppShell.Main>
  </AppShell>
);

export default MainLayout;
