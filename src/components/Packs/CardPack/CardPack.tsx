import React, { FC, memo } from 'react';

import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { CardPackType } from 'bll/types';
import { Button } from 'components/common/Button';
import style from 'components/Packs/style/table.module.scss';
import { lastUpdateDate } from 'const';
import { selectCurrentUserId } from 'selectors/profileSelectors';

interface CartPack {
  cardPack: CardPackType;
  deleteCardPack: (id: string) => void;
  editCardPack: (id: string, name: string) => void;
}

export const CardPack: FC<CartPack> = memo(({ cardPack, ...restProps }) => {
  const userId = useSelector(selectCurrentUserId);

  const deleteCardPack = (): void => {
    restProps.deleteCardPack(cardPack._id);
  };

  const editCardPack = (): void => {
    //  захардкодженное имя
    restProps.editCardPack(cardPack._id, 'ssssss');
  };

  // console.log('rerender cardPack');
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
            <Button id="delete" onClick={deleteCardPack}>
              Delete
            </Button>
          )}
          {cardPack.user_id === userId && <Button onClick={editCardPack}>Edit</Button>}

          <NavLink to={`/learn/${cardPack._id}`}>
            <Button>Learn</Button>
          </NavLink>
        </div>
      </td>
    </tr>
  );
});
