import React, { FC } from 'react';
import { Image, Stack, Title } from '@mantine/core';

const EmptyMovies: FC = () => (
  <Stack gap="sm" mt={{ base: 'lg', sm: '0' }}>
    <Image alt="Movies not found" fit="contain" mah={{ base: 170, xs: 200, sm: 252 }} src="/images/empty-movies.png" />
    <Title fz={{ base: 'sm', sm: 'md' }} order={2} ta="center">
      We don&apos;t have such movies, look for another one
    </Title>
  </Stack>
);

export default EmptyMovies;
