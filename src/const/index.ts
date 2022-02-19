import axios from 'axios';
import { Dispatch } from 'redux';

import { setError } from 'bll/appReducer';

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

export const validateEmail = (value: string): boolean =>
  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
