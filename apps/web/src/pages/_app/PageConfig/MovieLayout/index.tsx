import React, { FC, ReactElement } from 'react';

import SharedLayout from '../SharedLayout';
import Container from './Container';
import Header from './Header';

interface HomeLayoutProps {
  children: ReactElement;
}

const MovieLayout: FC<HomeLayoutProps> = ({ children }) => (
  <SharedLayout header={<Header />} headerConfig={{ height: 80 }}>
    <Container h="100%" pb={82}>
      {children}
    </Container>
  </SharedLayout>
);

export default MovieLayout;
