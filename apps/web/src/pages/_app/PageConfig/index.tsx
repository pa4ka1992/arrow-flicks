import React, { FC, Fragment, ReactElement } from 'react';
import { useRouter } from 'next/router';

import { LayoutType, RoutePath, routesConfiguration } from 'routes';

import HomeLayout from './HomeLayout';
import MovieLayout from './MovieLayout';

import 'resources/user/user.handlers';

const layoutToComponent = {
  [LayoutType.HOME]: HomeLayout,
  [LayoutType.RATED]: HomeLayout,
  [LayoutType.MOVIE]: MovieLayout,
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
