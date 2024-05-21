import React, { FC } from 'react';
import { Combobox, ScrollArea } from '@mantine/core';

import { tmdbApi } from 'resources/tmdb';

import classes from './index.module.css';

interface DropdownProps {
  genresId: string[];
}

const Dropdown: FC<DropdownProps> = ({ genresId }) => {
  const { data: result } = tmdbApi.useGetMoviesGenres();

  return (
    <Combobox.Dropdown
      classNames={{
        dropdown: classes.dropdown,
      }}
    >
      <Combobox.Options>
        <ScrollArea.Autosize mah={220} type="always" scrollbarSize={6}>
          {result?.genres.map(({ id, name }) => (
            <Combobox.Option
              active={genresId.includes(`${id}`)}
              classNames={{
                option: classes.option,
              }}
              fz="xs"
              key={id}
              value={`${id}`}
            >
              <span>{name}</span>
            </Combobox.Option>
          ))}
        </ScrollArea.Autosize>
      </Combobox.Options>
    </Combobox.Dropdown>
  );
};

export default Dropdown;
