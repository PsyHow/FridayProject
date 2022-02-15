import React, { FC } from 'react';

import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Button from '../../../components/common/Button/Button';
import { CardPackType } from '../bll/CardPacksTypes';

import { AppRootStoreType } from 'bll/Store';

type CardPackPropsType = {
  cardPack: CardPackType;
  deleteCardPack: (id: string) => void;
  editCardPack: (id: string, name: string) => void;
};

export const CardPack: FC<CardPackPropsType> = ({ cardPack, ...restProps }) => {
  const userId = useSelector<AppRootStoreType, string>(st => st.profileReducer.user._id);

  const deleteCardPack = (): void => {
    restProps.deleteCardPack(cardPack._id);
  };

  const editCardPack = (): void => {
    //  захардкодженное имя
    restProps.editCardPack(cardPack._id, 'ssssss');
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
      <td>{cardPack.updated}</td>
      <td>{cardPack.user_name}</td>
      <td>
        {cardPack.user_id === userId && <Button onClick={deleteCardPack}>Delete</Button>}
        {cardPack.user_id === userId && <Button onClick={editCardPack}>Edit</Button>}

        <NavLink to={`/learn/${cardPack._id}`}>
          <Button>Learn</Button>
        </NavLink>
      </td>
    </tr>
  );
};
