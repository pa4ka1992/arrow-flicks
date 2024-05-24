import { LoadingOverlay } from '@mantine/core';

export default LoadingOverlay.extend({
  defaultProps: {
    zIndex: 1000,
    overlayProps: { radius: 'sm', blur: 1.5 },
  },
});
