import React, { FC, Fragment, ReactElement } from 'react';
import { useRouter } from 'next/router';

import { LayoutType, RoutePath, routesConfiguration } from 'routes';

import MainLayout from './MainLayout';

const layoutToComponent = {
  [LayoutType.HOME]: MainLayout,
  [LayoutType.RATED]: MainLayout,
  [LayoutType.MOVIE]: MainLayout,
};

interface PageConfigProps {
  children: ReactElement;
}

const PageConfig: FC<PageConfigProps> = ({ children }) => {
  const { route } = useRouter();

  const { layout } = routesConfiguration[route as RoutePath] || {};

  const Layout = layout ? layoutToComponent[layout] : Fragment;

  return <Layout>{children}</Layout>;
};

export default PageConfig;
