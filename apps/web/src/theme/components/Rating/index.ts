import { Rating } from '@mantine/core';

import classes from './index.module.css';

export default Rating.extend({
  defaultProps: {
    fractions: 2,
    size: 'lg',
  },
  classNames: {
    root: classes.root,
  },
  vars: () => ({
    root: {
      '--rating-size': '30px',
    },
  }),
});
