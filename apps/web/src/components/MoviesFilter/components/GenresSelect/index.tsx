import React, { FC, useEffect, useMemo, useState } from 'react';
import { Combobox, Input, Pill, PillsInput, useCombobox } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';

import { tmdbApi } from 'resources/tmdb';

import { useFilterFormContext } from '../../form.context';
import Dropdown from './Dropdown';
import { getInputView, splitGenresIds } from './utils';

import classes from './index.module.css';

const Placeholder = <Input.Placeholder>Select genres</Input.Placeholder>;

interface GenresSelectProps {
  formIsReady: boolean;
}

export const GenresSelect: FC<GenresSelectProps> = ({ formIsReady }) => {
  const form = useFilterFormContext();
  const { data: result } = tmdbApi.useGetMoviesGenres();
  const [genresId, setGenresId] = useState<string[]>([]);
  const [isInitalGenresApplied, setIsInitialGenresApplied] = useState(false);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const selectOption = (newOption: string) => {
    setGenresId((prev) =>
      prev.includes(newOption) ? prev.filter((option) => option !== newOption) : [...prev, newOption],
    );
  };

  const inputView = useMemo(() => {
    if (!result || !genresId.length) {
      return Placeholder;
    }

    const genresNames = result.genres.filter(({ id }) => genresId.includes(`${id}`)).map(({ name }) => name);

    return getInputView(genresNames);
  }, [result, genresId]);

  useEffect(() => {
    if (!isInitalGenresApplied) {
      return;
    }

    if (!genresId.length) {
      form.setFieldValue('with_genres', undefined);
      return;
    }

    form.setFieldValue('with_genres', splitGenresIds(genresId));
  }, [genresId, isInitalGenresApplied]);

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

    setIsInitialGenresApplied(true);
  }, [formIsReady]);

  return (
    <Combobox onOptionSubmit={selectOption} store={combobox} withinPortal={false}>
      <Combobox.DropdownTarget>
        <PillsInput
          classNames={{
            label: classes.label,
            input: classes.input,
            section: classes.section,
          }}
          data-expanded={combobox.dropdownOpened}
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
