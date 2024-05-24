import React, { FC } from 'react';
import { YearPickerInput } from '@mantine/dates';
import { IconChevronDown } from '@tabler/icons-react';

import { useFilterFormContext } from '../../form.context';

import classes from './index.module.css';

const ReleaseYearSelect: FC = () => {
  const form = useFilterFormContext();

  return (
    <YearPickerInput
      allowDeselect
      classNames={classes}
      label="Release year"
      key={form.key('primary_release_year')}
      placeholder="Select release year"
      rightSection={<IconChevronDown stroke={1.2} />}
      rightSectionPointerEvents="none"
      type="default"
      {...form.getInputProps('primary_release_year')}
    />
  );
};

export default ReleaseYearSelect;
