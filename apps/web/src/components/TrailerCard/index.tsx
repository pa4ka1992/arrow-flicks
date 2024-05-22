import React, { FC } from 'react';
import { Card, Divider, Text, Title } from '@mantine/core';
import { DetailedMovie } from 'app-types';

import { ProductionCompanies, TrailerFrame } from './components';

interface TrailerCardProps {
  movie: DetailedMovie;
}

const TrailerCard: FC<TrailerCardProps> = ({ movie: { videos, overview, production_companies } }) => {
  const isCardShown = videos.results.length && overview && production_companies.length;

  if (!isCardShown) {
    return null;
  }

  return (
    <Card p={{ base: 'xs', md: 'lg' }}>
      <TrailerFrame videos={videos} />

      {!!overview && (
        <>
          <Title fw={700} fz={{ base: 'sm', sm: 'md' }} order={3} mb={{ base: 10, sm: 'sm' }}>
            Description
          </Title>
          <Text fz={{ base: 'xs', sm: 'sm' }}>{overview}</Text>

          <Divider my={{ base: 'xs', sm: 'md' }} />
        </>
      )}

      <ProductionCompanies companies={production_companies} />
    </Card>
  );
};

export default TrailerCard;
