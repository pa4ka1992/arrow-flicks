import React, { FC, useState } from 'react';
import { ActionIcon, Button, Group, Modal, Rating as MantineRating, Stack, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconStarFilled } from '@tabler/icons-react';
import { Movie } from 'app-types';

import { TMDB_MAX_RATING } from 'app-constants';

interface RatingProps {
  id: Movie['id'];
  title: Movie['original_title'];
}

const Rating: FC<RatingProps> = ({ id, title }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [rating, setRating] = useState(0);

  const updateRating = (value: number) => setRating(value);

  const removeRating = () => setRating(0);

  return (
    <>
      <Modal centered opened={opened} onClose={close} title="Your rating" size="sm">
        <Stack gap="sm">
          <Title order={4}>
            {title}
            {id}
          </Title>

          <MantineRating count={TMDB_MAX_RATING} onChange={updateRating} value={rating} />

          <Group gap={0}>
            <Button>Save</Button>
            <Button onClick={removeRating} variant="transparent">
              Remove rating
            </Button>
          </Group>
        </Stack>
      </Modal>

      <ActionIcon c="grey.4" variant="transparent" onClick={open} aria-label="Rating">
        <IconStarFilled width={26} height={26} />
      </ActionIcon>
    </>
  );
};

export default Rating;
