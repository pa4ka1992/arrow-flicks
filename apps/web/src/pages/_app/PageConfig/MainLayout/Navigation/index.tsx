import React, { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NavLink, Stack, Text, Tooltip } from '@mantine/core';

import { RoutePath } from 'routes';

import { NAVBAR_LINK } from './constants';

interface NavigationProps {
  toggle?: () => void;
}

const Navigation: FC<NavigationProps> = ({ toggle }) => {
  const { route } = useRouter();
  const isRatedPage = route === RoutePath.Rated;

  const navlinkActive = [
    { ...NAVBAR_LINK.home, active: !isRatedPage },
    { ...NAVBAR_LINK.rated, active: isRatedPage },
  ];

  return (
    <Stack gap="sm" mt={{ base: 0, lg: 80, xs: 40 }}>
      {navlinkActive.map(({ label, ...props }) => (
        <Tooltip visibleFrom="xs" hiddenFrom="lg" key={label} position="right" {...{ label }}>
          <NavLink
            component={Link}
            onClick={toggle}
            label={
              <Text fz="sm" style={{ whiteSpace: 'nowrap' }}>
                {label}
              </Text>
            }
            py={10}
            px="xs"
            styles={{
              section: {
                marginRight: 8,
              },
            }}
            {...props}
          />
        </Tooltip>
      ))}
    </Stack>
  );
};

export default Navigation;
