export enum ScopeType {
  PUBLIC = 'PUBLIC',
}

export enum LayoutType {
  HOME = 'HOME',
  MOVIE = 'MOVIE',
  RATED = 'RATED',
}

export enum RoutePath {
  Home = '/',
  Movie = '/movie/[id]',
  Rated = '/rated',

  NotFound = '/404',
}

type RoutesConfiguration = {
  [routePath in RoutePath]: {
    scope?: ScopeType;
    layout?: LayoutType;
  };
};

export const routesConfiguration: RoutesConfiguration = {
  [RoutePath.Home]: {
    scope: ScopeType.PUBLIC,
    layout: LayoutType.HOME,
  },
  [RoutePath.Rated]: {
    scope: ScopeType.PUBLIC,
    layout: LayoutType.RATED,
  },

  [RoutePath.Movie]: {
    scope: ScopeType.PUBLIC,
    layout: LayoutType.MOVIE,
  },

  [RoutePath.NotFound]: {},
};
