import { Input } from '@mantine/core';

import classes from './index.module.css';

export default Input.extend({
  defaultProps: {
    radius: 'md',
    size: 'md',
    fz: 'xs',
  },
  classNames: classes,
});
