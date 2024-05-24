import React, { FC } from 'react';
import { Avatar, Group, Stack, Title } from '@mantine/core';
import { DetailedMovie } from 'app-types';

import { ClapperboardIcon } from 'public/icons';

import config from 'config';

interface ProductionCompaniesProps {
  companies: DetailedMovie['production_companies'];
}

const ProductionCompanies: FC<ProductionCompaniesProps> = ({ companies }) => {
  if (!companies?.length) {
    return null;
  }

  return (
    <>
      <Title fw={700} fz={{ base: 'sm', sm: 'md' }} order={3} mb={{ base: 10, sm: 'sm' }}>
        Production
      </Title>

      <Stack gap="xs">
        {companies.map(({ id, logo_path, name }) => (
          <Group gap="xs" key={id}>
            <Avatar
              alt="company logo"
              src={`${config.TMDB_URL}/${logo_path}`}
              w={{ base: 32, sm: 40 }}
              h={{ base: 32, sm: 40 }}
              styles={{
                image: {
                  objectFit: 'contain',
                },
              }}
            >
              <ClapperboardIcon />
            </Avatar>
            <Title fw={700} fz={{ base: 'xs', sm: 'sm' }} order={4}>
              {name}
            </Title>
          </Group>
        ))}
      </Stack>
    </>
  );
};

export default ProductionCompanies;
