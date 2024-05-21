import { NumberInput } from '@mantine/core';

import classes from './index.module.css';

export default NumberInput.extend({
  defaultProps: {
    radius: 'md',
    decimalScale: 1,
    fixedDecimalScale: true,
    allowNegative: false,
    step: 0.1,
    stepHoldDelay: 500,
    stepHoldInterval: 100,
    rightSectionWidth: 35,
  },
  classNames: classes,
});
