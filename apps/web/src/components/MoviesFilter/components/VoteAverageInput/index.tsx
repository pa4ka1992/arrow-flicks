import React, { FC } from 'react';
import { NumberInput } from '@mantine/core';

import { TMDB_MAX_RATING } from 'app-constants';

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
      max={TMDB_MAX_RATING}
      maw={139}
      miw={100}
      {...{ placeholder, label }}
      {...form.getInputProps(formKey)}
    />
  );
};

export default VoteAverageInput;
