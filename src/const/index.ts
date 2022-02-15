import axios from 'axios';
import { Dispatch } from 'redux';

import { setCardsError } from 'features/Cards/bll/cardsActions';

export const errorString = 'Something wrong, try again later';

export const handleCatchError = (error: unknown, dispatch: Dispatch): void => {
  if (axios.isAxiosError(error) && error.response)
    dispatch(setCardsError(error.response.data.error));
  else if (axios.isAxiosError(error)) {
    dispatch(setCardsError(error.message));
  }
};
