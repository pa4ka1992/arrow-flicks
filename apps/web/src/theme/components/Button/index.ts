import { Button } from '@mantine/core';

import classes from './index.module.css';

export default Button.extend({
  defaultProps: {
    radius: 'md',
    size: 'md',
    fz: 'xs',
  },
  classNames: {
    root: classes.root,
  },
});
