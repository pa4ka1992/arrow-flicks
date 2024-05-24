import React, { FC } from 'react';
import { Loader as LoaderMantine, Stack, Text } from '@mantine/core';

const Loader: FC = () => (
  <Stack align="center" maw="50dvw">
    <LoaderMantine size="md" />
    <Text ta="center" fz={{ base: 'xs', xs: 'sm' }}>
      Application is deployed on render service. The first boot can take up to 50 seconds. If nothing happens, reload
      the page
    </Text>
  </Stack>
);
export default Loader;
