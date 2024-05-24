import { useMutation } from '@tanstack/react-query';
import { StorageKey } from 'app-types';

import { apiService } from 'services';

interface SignUpResponse {
  id: string;
}

export const useSignUp = () =>
  useMutation<SignUpResponse>({
    mutationFn: () => apiService.post('/account/sign-up'),

    onSuccess: (data) => {
      localStorage.setItem(StorageKey.USER_ID, data.id);
    },
  });
