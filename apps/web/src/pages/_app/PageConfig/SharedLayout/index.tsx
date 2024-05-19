import React, { FC, ReactElement } from 'react';
import { AppShell, AppShellHeaderConfiguration } from '@mantine/core';

import Navbar from './Navbar';

interface SharedLayoutProps {
  children: ReactElement;
  header: ReactElement;
  headerConfig?: AppShellHeaderConfiguration;
}

const SharedLayout: FC<SharedLayoutProps> = ({ header, headerConfig, children }) => (
  <AppShell
    padding={0}
    layout="alt"
    header={headerConfig}
    navbar={{
      width: {
        base: 280,
      },
      breakpoint: 'sm',
    }}
    bg="grey.2"
  >
    {header}
    <Navbar />

    <AppShell.Main>{children}</AppShell.Main>
  </AppShell>
);

export default SharedLayout;
