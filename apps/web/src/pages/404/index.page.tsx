import React, { NextPage } from 'next';
import Head from 'next/head';
import router from 'next/router';
import { AppShell, Button, Image, Stack, Title } from '@mantine/core';

import { Logo } from 'components';

import { useRestoreQuery } from 'utils';

import { RoutePath } from 'routes';

const NotFound: NextPage = () => {
  const { path } = useRestoreQuery(RoutePath.Home);

  return (
    <>
      <Head>
        <title>Page not found</title>
      </Head>

      <AppShell
        header={{
          height: { base: 56, sm: 80 },
        }}
        withBorder={false}
      >
        <AppShell.Header bg="grey.1">
          <Logo mt={{ base: 'xs', sm: 'lg' }} ml={{ base: 'xs', sm: 'lg' }} hideLogo={false} />
        </AppShell.Header>

        <AppShell.Main display="flex">
          <Stack align="center" gap="sm" maw={696} justify="center" px="md" m="auto">
            <Image alt="Page not found" src="/images/404.png" />
            <Title mt={{ base: 'xs', sm: 'xl' }} fz={{ base: 'sm', sm: 'md' }} order={2} ta="center">
              We can’t find the page you are looking for
            </Title>

            <Button onClick={() => router.push(path)}>Go home</Button>
          </Stack>
        </AppShell.Main>
      </AppShell>
    </>
  );
};

export default NotFound;
