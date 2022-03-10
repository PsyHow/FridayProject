/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Dispatch, FC, memo, SetStateAction } from 'react';

import style from './style/modal.module.scss';

interface ModalProps {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}

export const Modal: FC<ModalProps> = memo(({ active, setActive, children }) => {
  const handleCloseClick = (): void => {
    setActive(false);
  };

  return (
    <div
      className={active ? `${style.modal} ${style.modalActive}` : style.modal}
      onClick={handleCloseClick}
    >
      <div
        className={active ? `${style.content} ${style.contentActive}` : style.content}
        onClick={event => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
});
