import React, { FC, useEffect, useMemo, useState } from 'react';
import { Combobox, Input, Pill, PillsInput, useCombobox } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';

import { tmdbApi } from 'resources/tmdb';

import { useFilterFormContext } from '../../form.context';
import Dropdown from './Dropdown';
import { getInputView } from './utils';

import classes from './index.module.css';

const Placeholder = <Input.Placeholder>Select genres</Input.Placeholder>;

interface GenresSelectProps {
  formIsReady: boolean;
}

export const GenresSelect: FC<GenresSelectProps> = ({ formIsReady }) => {
  const form = useFilterFormContext();
  const { data: result, isLoading } = tmdbApi.useGetMoviesGenres();
  const [genresId, setGenresId] = useState<string[]>([]);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const selectOption = (newOption: string) => {
    const isOptionActive = genresId.includes(newOption);

    const updatedOptions = isOptionActive
      ? genresId.filter((option) => option !== newOption)
      : [...genresId, newOption];

    form.setFieldValue('with_genres', updatedOptions);

    setGenresId(updatedOptions);
  };

  const inputView = useMemo(() => {
    if (!result || !genresId.length) {
      return Placeholder;
    }

    const genresNames = result.genres.filter(({ id }) => genresId.includes(`${id}`)).map(({ name }) => name);

    return getInputView(genresNames);
  }, [result, genresId]);

  useEffect(() => {
    if (!form.isDirty()) {
      setGenresId([]);
    }
  }, [form]);

  useEffect(() => {
    if (!formIsReady) {
      return;
    }

    const initialGenres = form.getValues().with_genres;

    if (initialGenres) {
      setGenresId(initialGenres);
    }
  }, [form, formIsReady]);

  return (
    <Combobox disabled={isLoading} onOptionSubmit={selectOption} store={combobox} withinPortal={false}>
      <Combobox.DropdownTarget>
        <PillsInput
          classNames={{
            label: classes.label,
            input: classes.input,
            section: classes.section,
          }}
          data-expanded={!isLoading && combobox.dropdownOpened}
          disabled={isLoading}
          label="Genres"
          maw={284}
          miw={180}
          pointer
          onClick={() => combobox.toggleDropdown()}
          size="md"
          radius="md"
          rightSection={<IconChevronDown stroke={1.2} />}
          rightSectionWidth={34}
          rightSectionPointerEvents="none"
        >
          <Pill.Group fz="xs" lh={{ base: 1.4, md: 1.8 }}>
            {inputView}
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Dropdown key={form.key('with_genres')} {...{ genresId }} />
    </Combobox>
  );
};

export default GenresSelect;
