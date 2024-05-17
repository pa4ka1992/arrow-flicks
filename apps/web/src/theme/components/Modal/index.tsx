import { Modal } from '@mantine/core';

import classes from './index.module.css';

export default Modal.extend({
  defaultProps: {
    radius: 'md',
    fz: 'sm',
    closeButtonProps: {
      c: 'grey.5',
      size: 'sm',
    },
  },
  classNames: {
    header: classes.header,
    title: classes.title,
    close: classes.close,
    body: classes.body,
  },
});
