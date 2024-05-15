import React from 'react';
import { MultiSelect } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';

import classes from './index.module.css';

export default MultiSelect.extend({
  defaultProps: {
    radius: 'md',
    rightSection: <IconChevronDown stroke={1.2} />,
  },
  classNames: {
    root: classes.root,
    label: classes.label,
    input: classes.input,
    pillsList: classes.pillsList,
  },
});
