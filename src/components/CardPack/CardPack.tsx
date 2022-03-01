import { FC, memo, useState } from 'react';

import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import style from './style/cardPack.module.scss';

import { CardPackType } from 'bll/types';
import { Button } from 'components/common/Button';
import { Input } from 'components/common/Input';
import { Modal } from 'components/common/Modal';
import { lastUpdateDate } from 'const';
import { selectCurrentUserId } from 'selectors/profileSelectors';

interface CartPack {
  cardPack: CardPackType;
  deleteCardPack: (id: string) => void;
  editCardPack: (id: string, name: string) => void;
}

export const CardPack: FC<CartPack> = memo(
  ({ cardPack, deleteCardPack, editCardPack }) => {
    const userId = useSelector(selectCurrentUserId);

    const [activeDeleteModal, setActiveDeleteModal] = useState<boolean>(false);
    const [activeEditModal, setActiveEditModal] = useState<boolean>(false);
    const [editPackName, setEditPackName] = useState<string>('');

    const handleToggleDeleteModalClick = (): void => {
      setActiveDeleteModal(!activeDeleteModal);
    };

    const handleToggleEditModalClick = (): void => {
      setActiveEditModal(!activeEditModal);
    };

    const handleDeleteCardPackClick = (): void => {
      deleteCardPack(cardPack._id);
    };

    const handleEditCardPackClick = (): void => {
      editCardPack(cardPack._id, editPackName);
    };

    return (
      <tr>
        <td>
          <NavLink
            style={{ textDecoration: 'none', color: '#1d1d1d' }}
            to={`/card/${cardPack._id}`}
          >
            <span>{cardPack.name}</span>
          </NavLink>
        </td>
        <td>{cardPack.cardsCount}</td>
        <td>{lastUpdateDate(cardPack.created)}</td>
        <td>{cardPack.user_name}</td>
        <td>
          <div className={style.buttons}>
            {cardPack.user_id === userId && (
              <>
                <Button id="delete" onClick={handleToggleDeleteModalClick}>
                  Delete
                </Button>
                <Modal active={activeDeleteModal} setActive={setActiveDeleteModal}>
                  <h1 className={style.modalTitle}>Delete Pack</h1>

                  <p className={style.modalDescription}>
                    Do you really want to remove Pack Name - {cardPack.name} ? All cards
                    will be excluded from this course.
                  </p>

                  <div className={style.modalButtons}>
                    <Button onClick={handleToggleDeleteModalClick}>Cancel</Button>

                    <Button id="delete" onClick={handleDeleteCardPackClick}>
                      Delete
                    </Button>
                  </div>
                </Modal>
              </>
            )}
            {cardPack.user_id === userId && (
              <>
                <Button onClick={handleToggleEditModalClick}>Edit</Button>
                <Modal active={activeEditModal} setActive={setActiveEditModal}>
                  <h1 className={style.modalTitle}>Edit Pack</h1>

                  <label>{`${'Name pack'}`}</label>
                  <Input value={editPackName} onChangeText={setEditPackName} />

                  <div className={style.modalButtons}>
                    <Button onClick={handleToggleEditModalClick}>Cancel</Button>

                    <Button id="save" onClick={handleEditCardPackClick}>
                      Save
                    </Button>
                  </div>
                </Modal>
              </>
            )}

            <NavLink to={`/learn/${cardPack._id}`}>
              <Button>Learn</Button>
            </NavLink>
          </div>
        </td>
      </tr>
    );
  },
);
