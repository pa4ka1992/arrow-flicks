import React from 'react';
import { Select } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';

import classes from './index.module.css';

export default Select.extend({
  defaultProps: {
    radius: 'md',
    rightSection: <IconChevronDown stroke={1.2} />,
  },
  classNames: classes,
});
