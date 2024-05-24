import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { Button, Container, Image, Stack, Title } from '@mantine/core';

import { useRestoreQuery } from 'utils';

import { RoutePath } from 'routes';

const EmptyRated: FC = () => {
  const router = useRouter();
  const { path } = useRestoreQuery(RoutePath.Home);

  const navigateHome = () => router.push(path);

  return (
    <Container display="flex" px={{ base: 'xs', md: 'md' }} size={1020}>
      <Stack align="center" justify="center" gap="sm" mt={{ base: 'lg', sm: '0' }}>
        <Image
          alt="Rated movies not found"
          fit="contain"
          mah={{ base: 170, xs: 200, sm: 252 }}
          src="/images/empty-rated.png"
        />

        <Title fz={{ base: 'sm', sm: 'md' }} order={2} ta="center">
          You haven&apos;t rated any films yet
        </Title>

        <Button variant="filled" onClick={navigateHome}>
          Find movies
        </Button>
      </Stack>
    </Container>
  );
};

export default EmptyRated;
