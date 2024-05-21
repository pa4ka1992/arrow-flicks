import React, { FC } from 'react';
import { AspectRatio, Divider, Title } from '@mantine/core';
import { DetailedMovie } from 'app-types';

import classes from './index.module.css';

interface TrailerFrameProps {
  videos?: DetailedMovie['videos'];
}

const TrailerFrame: FC<TrailerFrameProps> = ({ videos }) => {
  if (!videos?.results?.length) {
    return null;
  }

  return (
    <>
      <Title fw={700} order={3} mb="sm">
        Trailer
      </Title>

      <AspectRatio
        classNames={{
          root: classes.root,
        }}
        w={500}
        h={281}
        ratio={16 / 9}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videos.results[0].key}`}
          title="YouTube video player"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      </AspectRatio>

      <Divider my="md" />
    </>
  );
};

export default TrailerFrame;
