import React, { FC } from 'react';
import { NumberInput } from '@mantine/core';

import { useFilterFormContext } from '../../form.context';

interface VoteAverageInputProps {
  formKey: 'vote_average.gte' | 'vote_average.lte';
  placeholder: string;
  label?: string;
}

const VoteAverageInput: FC<VoteAverageInputProps> = ({ placeholder, formKey, label }) => {
  const form = useFilterFormContext();

  return (
    <NumberInput
      allowNegative={false}
      clampBehavior="strict"
      key={form.key(formKey)}
      max={10}
      {...{ placeholder, label }}
      {...form.getInputProps(formKey)}
    />
  );
};

export default VoteAverageInput;
