import axios from 'axios';
import { Dispatch } from 'redux';

import { setError } from 'features/authorization/dal/authReducer/authActions';

export const errorString = 'Something wrong, try again later';

export const handleCatchError = (error: unknown, dispatch: Dispatch): void => {
  if (axios.isAxiosError(error) && error.response)
    dispatch(setError(error.response.data.error));
  else if (axios.isAxiosError(error)) {
    dispatch(setError(error.message));
  }
};

export const lastUpdateDate = (value: string): string =>
  new Date(value).toLocaleString('ru', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
