import React, { FC, ReactElement } from 'react';

import SharedLayout from '../SharedLayout';
import Container from './Container';
import Header from './Header';

interface HomeLayoutProps {
  children: ReactElement;
}

const HomeLayout: FC<HomeLayoutProps> = ({ children }) => (
  <SharedLayout header={<Header />} headerConfig={{ height: 320 }}>
    <Container pb={82}>{children}</Container>
  </SharedLayout>
);

export default HomeLayout;
