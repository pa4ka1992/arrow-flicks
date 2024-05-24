import React, { FC } from 'react';
import { Center, Stack, Text } from '@mantine/core';
import { IconPhotoX } from '@tabler/icons-react';

const NoPoster: FC = () => (
  <Center flex="0 0 auto" c="grey.5" bg="grey.3" h="100%" w="100%">
    <Stack gap={0} align="center">
      <IconPhotoX stroke={2} />
      <Text c="grey.5" fw={500} fz="xs">
        No poster
      </Text>
    </Stack>
  </Center>
);

export default NoPoster;
