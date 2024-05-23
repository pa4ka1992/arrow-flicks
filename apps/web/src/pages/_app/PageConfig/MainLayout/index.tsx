import React, { FC, ReactElement, useLayoutEffect } from 'react';
import { Affix, AppShell, Button, LoadingOverlay, rem, Transition } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { IconArrowUp } from '@tabler/icons-react';
import { StorageKey } from 'app-types';

import { accountApi } from 'resources/account';

import Header from './Header';
import Navbar from './Navbar';

interface MainLayoutProps {
  children: ReactElement;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const [scroll, scrollTo] = useWindowScroll();

  const { mutate, isPending, isPaused } = accountApi.useSignUp();

  useLayoutEffect(() => {
    const userId = localStorage.getItem(StorageKey.USER_ID);

    if (!userId) {
      mutate();
    }
  }, [mutate]);

  if (isPending || isPaused) {
    return <LoadingOverlay visible />;
  }

  return (
    <AppShell
      padding={0}
      layout="default"
      header={{
        height: {
          base: 50,
          sm: 60,
          lg: 0,
        },
      }}
      navbar={{
        width: {
          base: 0,
          sm: 60,
          lg: 280,
        },
        breakpoint: 'xs',
      }}
      bg="grey.2"
    >
      <Header />
      <Navbar />

      <AppShell.Main pt={{ base: 0, lg: 40 }} pb={{ base: 'xl', xs: 82 }}>
        {children}

        <Affix position={{ bottom: 20, right: 20 }}>
          <Transition transition="slide-up" mounted={scroll.y > 0}>
            {(transitionStyles) => (
              <Button
                leftSection={<IconArrowUp style={{ width: rem(16), height: rem(16) }} />}
                style={transitionStyles}
                onClick={() => scrollTo({ y: 0 })}
              >
                Scroll to top
              </Button>
            )}
          </Transition>
        </Affix>
      </AppShell.Main>
    </AppShell>
  );
};

export default MainLayout;
