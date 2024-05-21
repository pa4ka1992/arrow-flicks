import React, { FC } from 'react';
import { DateFormatter, YearPickerInput } from '@mantine/dates';
import { IconChevronDown } from '@tabler/icons-react';

import { useFilterFormContext } from '../../form.context';

const ReleaseYearSelect: FC = () => {
  const form = useFilterFormContext();

  const valueFormatter: DateFormatter = ({ type, date }) => {
    if (type === 'multiple' && Array.isArray(date)) {
      if (date.length === 1) {
        return String(date[0].getFullYear());
      }

      if (date.length > 1) {
        return `${date.length} dates selected`;
      }

      return '';
    }

    return '';
  };

  return (
    <YearPickerInput
      label="Release year"
      key={form.key('primary_release_year')}
      placeholder="Select release year"
      rightSection={<IconChevronDown stroke={1.2} />}
      rightSectionPointerEvents="none"
      type="multiple"
      miw={180}
      maw={280}
      {...{ valueFormatter }}
      {...form.getInputProps('primary_release_year')}
    />
  );
};

export default ReleaseYearSelect;
