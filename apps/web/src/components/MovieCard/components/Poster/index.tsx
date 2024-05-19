import React, { FC } from 'react';
import Link from 'next/link';
import { Anchor, Image } from '@mantine/core';
import { Movie } from 'app-types';

import { MovieCardVariant } from 'components/MovieCard/constants';

import { RoutePath } from 'routes';
import config from 'config';

import NoPoster from '../NoPoster';
import { PosterVariant } from './constants';

interface PosterProps {
  movieId: Movie['id'];
  path: Movie['poster_path'];
  variant: `${MovieCardVariant}`;
}

const Poster: FC<PosterProps> = ({ movieId, path, variant }) => {
  const posterProps = PosterVariant[variant];

  const poster = path ? <Image alt="movie poster" height="100%" src={`${config.TMDB_URL}/${path}`} /> : <NoPoster />;

  return (
    <Anchor
      component={Link}
      display="block"
      flex="0 0 100%"
      href={{ pathname: RoutePath.Movie, query: { id: movieId } }}
      underline="never"
      {...posterProps}
    >
      {poster}
    </Anchor>
  );
};

export default Poster;
