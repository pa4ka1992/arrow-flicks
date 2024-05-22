import React, { FC, useEffect } from 'react';
import Link from 'next/link';
import { Burger, Drawer, Group, Image, NavLink, NavLinkProps, Title } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

import { useRestoreQuery } from 'utils';

import { RoutePath } from 'routes';

import Navigation from '../../pages/_app/PageConfig/MainLayout/Navigation';

import classes from './index.module.css';

interface LogoProps extends NavLinkProps {
  hideLogo?: boolean;
}

const Logo: FC<LogoProps> = ({ hideLogo = true, ...navlinkProps }) => {
  const sm = useMediaQuery('(max-width: 48em)');
  const [opened, { toggle, close }] = useDisclosure();
  const { path } = useRestoreQuery(RoutePath.Home);

  useEffect(() => {
    if (!sm) {
      close();
    }
  }, [sm, close]);

  return (
    <>
      <Drawer
        hiddenFrom="sm"
        bg="purple.3"
        classNames={{
          inner: classes.inner,
          content: classes.content,
          body: classes.body,
        }}
        onClose={toggle}
        overlayProps={{
          top: 50,
        }}
        position="top"
        transitionProps={{ transition: 'slide-right' }}
        shadow="none"
        withCloseButton={false}
        {...{ opened }}
      >
        <Navigation {...{ toggle }} />
      </Drawer>

      <Group gap={4}>
        <Burger
          aria-label="Toggle navigation"
          color="purple.6"
          display={hideLogo ? 'block' : 'none'}
          hiddenFrom="sm"
          onClick={toggle}
          size="sm"
          {...{ opened }}
        />

        <NavLink
          data-logo
          component={Link}
          href={path}
          p={0}
          label={
            <Group classNames={{ root: classes.logo }} gap="sm" c="purple.6">
              <Image h={{ base: 24, sm: 32 }} src="/images/logo.svg" visibleFrom={hideLogo ? 'sm' : undefined} />
              <Title order={2} fz={{ base: 'md', sm: 'lg' }}>
                ArrowFlicks
              </Title>
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
