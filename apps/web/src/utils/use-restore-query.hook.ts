'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { StorageKey } from 'app-types';

import { RoutePath } from 'routes';

export default function useRestoreQuery(defaultPath: `${RoutePath}`) {
  const params = useSearchParams();
  const [path, setPath] = useState<string>(defaultPath);

  useEffect(() => {
    const query = localStorage.getItem(StorageKey.FILTER);

    if (query) {
      setPath(`${RoutePath.Home}?${query}`);
    }
  }, [params]);

  return { path };
}
