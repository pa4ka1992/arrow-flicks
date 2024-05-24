import { routeUtil } from 'utils';

import signUp from './actions/sign-up';

const publicRoutes = routeUtil.getRoutes([signUp]);

export default {
  publicRoutes,
};
