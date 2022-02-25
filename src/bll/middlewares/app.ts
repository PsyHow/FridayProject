import { setInitialized } from 'bll/actions';
import { authMe } from 'bll/middlewares';
import { AppThunkType } from 'bll/Store';

export const initializeApp = (): AppThunkType => dispatch => {
  const promise = dispatch(authMe());
  Promise.all([promise]).then(() => {
    dispatch(setInitialized(true));
  });
};
