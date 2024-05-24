import React, { FC, useEffect } from 'react';
import { LoadingOverlay as LoadingOverlayMantine, LoadingOverlayProps } from '@mantine/core';

import Loader from 'components/Loader';

const LoadingOverlay: FC<LoadingOverlayProps> = (props) => {
  const { visible } = props;

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [visible]);

  return <LoadingOverlayMantine {...props} pos="fixed" loaderProps={{ children: <Loader /> }} />;
};
export default LoadingOverlay;
