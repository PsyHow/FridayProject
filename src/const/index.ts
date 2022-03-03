import axios from 'axios';
import { Dispatch } from 'redux';

import { setError } from 'bll/actions';

export type Nullabale<T> = T | null;

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

export const avatar =
  'https://habrastorage.org/r/w780/webt/fs/uc/ng/fsucngwjrulpxpcwgrrmehvhhf0.jpeg';

export const grades = [
  'Did not know',
  'Forgot',
  'A lot of thought',
  'Confused',
  'Knew the answer',
];
