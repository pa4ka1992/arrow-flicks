import { NavLink } from '@mantine/core';

import classes from './index.module.css';

export default NavLink.extend({
  defaultProps: {
    fz: 'sm',
  },
  classNames: {
    root: classes.root,
    label: classes.label,
  },
});
