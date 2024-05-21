import React, { FC, useEffect } from 'react';
import Link from 'next/link';
import { Burger, Drawer, Group, Image, NavLink, NavLinkProps, Title } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

import { useRestoreQuery } from 'utils';

import { RoutePath } from 'routes';

import Navigation from '../Navigation';

import classes from './index.module.css';

const Logo: FC<NavLinkProps> = ({ ...navlinkProps }) => {
  const xs = useMediaQuery('(max-width: 36em)');
  const [opened, { toggle, close }] = useDisclosure();
  const { path } = useRestoreQuery(RoutePath.Home);

  useEffect(() => {
    if (!xs) {
      close();
    }
  }, [xs, close]);

  return (
    <>
      <Drawer
        hiddenFrom="xs"
        bg="purple.3"
        classNames={{
          inner: classes.inner,
          content: classes.content,
        }}
        onClose={toggle}
        position="top"
        overlayProps={{
          top: 60,
        }}
        transitionProps={{ transition: 'slide-right' }}
        shadow="none"
        withCloseButton={false}
        {...{ opened }}
      >
        <Navigation {...{ toggle }} />
      </Drawer>

      <Group>
        <Burger
          aria-label="Toggle navigation"
          color="purple.6"
          hiddenFrom="xs"
          onClick={toggle}
          w={32}
          h={32}
          {...{ opened }}
        />

        <NavLink
          data-logo
          component={Link}
          href={path}
          p={0}
          label={
            <Group classNames={{ root: classes.logo }} gap="sm" c="purple.6">
              <Image src="/images/logo.svg" visibleFrom="xs" />
              <Title order={2}>ArrowFlicks</Title>
            </Group>
          }
          unstyled
          style={{ textDecoration: 'none' }}
          {...navlinkProps}
        />
      </Group>
    </>
  );
};

export default Logo;
