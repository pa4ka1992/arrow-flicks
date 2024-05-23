import React, { FC, useState } from 'react';
import { ActionIcon, Button, Group, Modal, Rating as MantineRating, Stack, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconStarFilled } from '@tabler/icons-react';
import { Movie } from 'app-types';

import { tmdbApi } from 'resources/tmdb';

import { TMDB_MAX_RATING } from 'app-constants';

import { getMovieFields } from './utils';

import classes from './index.module.css';

interface RatingProps {
  movie: Movie;
}

const Rating: FC<RatingProps> = ({ movie }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [rating, setRating] = useState(movie.rating ?? 0);
  const addRating = tmdbApi.useAddRating();
  const updateRating = tmdbApi.useUpdateRating();
  const deleteRating = tmdbApi.useDeleteRating();

  const isRatingAssigned = typeof movie.rating !== 'undefined';

  const changeRating = (value: number) => setRating(value);

  const removeRating = () => {
    const { mutate } = deleteRating;

    setRating(0);
    mutate({ id: movie.id });
    close();
  };

  const submitRating = () => {
    if (isRatingAssigned) {
      const { mutate } = updateRating;

      mutate({ id: movie.id, rating });
      close();

      return;
    }

    const body = getMovieFields(movie);
    const { mutate } = addRating;

    close();
    mutate({ ...body, rating });
  };

  const closeModal = () => {
    setRating(movie.rating ?? 0);
    close();
  };

  return (
    <>
      <Modal keepMounted={false} centered opened={opened} onClose={closeModal} title="Your rating" size="sm">
        <Stack className={classes.box}>
          <Title order={4}>{movie.original_title}</Title>

          <MantineRating count={TMDB_MAX_RATING} onChange={changeRating} value={rating} />

          <Group gap={3}>
            <Button onClick={submitRating}>Save</Button>
            <Button onClick={removeRating} variant="subtle">
              Remove rating
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Group gap={3} wrap="nowrap">
        <ActionIcon
          className={isRatingAssigned ? classes.active : classes.default}
          variant="transparent"
          onClick={open}
          aria-label="Rating"
        >
          <IconStarFilled className={classes.rating} />
        </ActionIcon>
        <Text size="sm">{movie.rating?.toFixed(1)}</Text>
      </Group>
    </>
  );
};

export default Rating;
