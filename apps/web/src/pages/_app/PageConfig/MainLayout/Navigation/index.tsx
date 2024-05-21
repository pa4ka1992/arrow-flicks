import React, { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NavLink, Stack, Tooltip } from '@mantine/core';

import { useRestoreQuery } from 'utils';

import { RoutePath } from 'routes';

import { NAVBAR_LINK } from './constants';

import classes from './index.module.css';

interface NavigationProps {
  toggle?: () => void;
}

const Navigation: FC<NavigationProps> = ({ toggle }) => {
  const { route } = useRouter();
  const { path } = useRestoreQuery(RoutePath.Home);

  const isRatedPage = route === RoutePath.Rated;

  const navlinkActive = [
    { ...NAVBAR_LINK.home, active: !isRatedPage, href: path },
    { ...NAVBAR_LINK.rated, active: isRatedPage },
  ];

  return (
    <Stack gap="sm" mt={{ base: 0, lg: 80, xs: 40 }}>
      {navlinkActive.map(({ label, ...props }) => (
        <Tooltip visibleFrom="xs" hiddenFrom="lg" key={label} position="right" {...{ label }}>
          <NavLink classNames={classes} component={Link} onClick={toggle} py={10} px="xs" {...{ label }} {...props} />
        </Tooltip>
      ))}
    </Stack>
  );
};

export default Navigation;
