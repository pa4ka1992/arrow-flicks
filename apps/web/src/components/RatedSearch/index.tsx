import React, { FC } from 'react';
import { Button, Input } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

import classes from './index.module.css';

const RatedSearch: FC = () => (
  <Input
    classNames={classes}
    leftSection={<IconSearch size={18} />}
    leftSectionPointerEvents="none"
    maw={{ base: 350, sm: 400, md: 490 }}
    placeholder="Search movie title"
    rightSection={<Button size="xs">Search</Button>}
    rightSectionPointerEvents="all"
  />
);

export default RatedSearch;
