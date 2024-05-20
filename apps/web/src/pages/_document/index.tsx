import React from 'react';
import { Head, Html, Main, NextScript } from 'next/document';
import { ColorSchemeScript } from '@mantine/core';

const Document = () => (
  <Html>
    <Head>
      <link rel="icon" href="/images/logo.svg" />
      <ColorSchemeScript defaultColorScheme="auto" />
    </Head>
    <body style={{ backgroundColor: 'var(--mantine-color-grey-1)' }}>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
