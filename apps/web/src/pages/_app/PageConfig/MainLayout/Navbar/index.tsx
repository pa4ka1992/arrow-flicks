import React, { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AppShell, Group, Image, NavLink, Stack, Title } from '@mantine/core';

import { RoutePath } from 'routes';

const Navbar: FC = () => {
  const { route } = useRouter();
  const isHomePage = route === RoutePath.Home;

  return (
    <AppShell.Navbar bg="purple.0" p="lg" withBorder={false}>
      <NavLink
        data-logo
        component={Link}
        href={RoutePath.Home}
        p={0}
        label={
          <Group gap="sm" c="purple.6">
            <Image src="/images/logo.svg" />
            <Title order={2}>ArrowFlicks</Title>
          </Group>
        }
        unstyled
        style={{ textDecoration: 'none' }}
      />

      <Stack gap="sm" mt={80}>
        <NavLink active={isHomePage} component={Link} href={RoutePath.Home} label="Movies" />
        <NavLink active={!isHomePage} component={Link} href={RoutePath.Rated} label="Rated movies" />
      </Stack>
    </AppShell.Navbar>
  );
};

export default Navbar;
