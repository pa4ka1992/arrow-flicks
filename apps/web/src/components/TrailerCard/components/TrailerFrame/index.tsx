import React, { FC } from 'react';
import { AspectRatio, Box, Divider, Title } from '@mantine/core';
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
      <Title fw={700} fz={{ base: 'sm', sm: 'md' }} order={3} mb={{ base: 10, sm: 'sm' }}>
        Trailer
      </Title>

      <Box mx={{ base: -12, xs: 0 }}>
        <AspectRatio
          classNames={{
            root: classes.root,
          }}
          h={281}
          w={500}
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
      </Box>

      <Divider my={{ base: 'xs', sm: 'md' }} />
    </>
  );
};

export default TrailerFrame;
