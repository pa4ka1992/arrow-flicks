import React from 'react';
import { YearPickerInput } from '@mantine/dates';
import { IconChevronDown } from '@tabler/icons-react';

import classes from './index.module.css';

export default YearPickerInput.extend({
  defaultProps: {
    radius: 'md',
    rightSection: <IconChevronDown stroke={1.2} />,
    size: 'xs',
  },
  classNames: classes,
});
