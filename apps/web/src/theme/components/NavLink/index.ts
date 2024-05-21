import { NavLink } from '@mantine/core';

import classes from './index.module.css';

export default NavLink.extend({
  defaultProps: {
    fz: 'sm',
  },
  classNames: classes,
});
