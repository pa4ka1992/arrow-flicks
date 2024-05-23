import React, { FC } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import { Anchor, Image } from '@mantine/core';
import { Movie } from 'app-types';

import { MovieCardVariant } from 'components/MovieCard/constants';

import { RoutePath } from 'routes';
import config from 'config';

import NoPoster from '../NoPoster';
import { rgbDataURL } from './utils/get-placeholder.util';
import { PosterVariant } from './constants';

import classes from './index.module.css';

interface PosterProps {
  movieId: Movie['id'];
  path: Movie['poster_path'];
  variant: `${MovieCardVariant}`;
}

const Poster: FC<PosterProps> = ({ movieId, path, variant }) => {
  const posterProps = PosterVariant[variant];

  const poster = path ? (
    <Image
      component={NextImage}
      alt="movie poster"
      fill
      sizes="100vw"
      src={`${config.TMDB_URL}/${path}`}
      quality={80}
      placeholder="blur"
      blurDataURL={rgbDataURL(152, 84, 246)}
    />
  ) : (
    <NoPoster />
  );

  return (
    <Anchor
      bg="primary.6"
      className={classes.link}
      component={Link}
      display="block"
      href={{ pathname: RoutePath.Movie, query: { id: movieId } }}
      mih={{ base: posterProps.h.base, xs: 'auto' }}
      miw={{ base: posterProps.maw.base, xs: 'auto' }}
      pos="relative"
      underline="never"
      {...posterProps}
    >
      {poster}
    </Anchor>
  );
};

export default Poster;
