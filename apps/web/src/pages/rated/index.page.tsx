import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Container, Group, Title } from '@mantine/core';

import { RatedSearch } from 'components';

const Rated: NextPage = () => (
  <>
    <Head>
      <title>Rated movies</title>
    </Head>

    <Container px={{ base: 'xs', md: 'md' }} size={1020}>
      <Group align="center" justify="space-between" mb={{ base: 'sm', xs: 'md', lg: 40 }} mt={{ base: 'xs', lg: 0 }}>
        <Title fz={{ base: 'md', sm: 'lg', lg: 'xl' }} fw={700} order={1}>
          Rated movies
        </Title>

        <RatedSearch />
      </Group>
    </Container>
  </>
);

export default Rated;
