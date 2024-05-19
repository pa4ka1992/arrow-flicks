import React, { FC } from 'react';
import { Container as MantineContainer, ContainerProps } from '@mantine/core';

const Container: FC<ContainerProps> = ({ children, ...containerProps }) => (
  <MantineContainer size={1020} {...containerProps}>
    {children}
  </MantineContainer>
);

export default Container;
