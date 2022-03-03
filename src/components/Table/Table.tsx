import { FC, memo } from 'react';

import { useSelector } from 'react-redux';

import style from './style/table.module.scss';

import { CardPackType } from 'bll/types';
import { Preloader } from 'components';
import { CardPack } from 'components/CardPack';
import { Sorting } from 'components/common/Sorting';
import { selectIsFetching } from 'selectors/authSelectors';

interface TableProps {
  cardPacks: CardPackType[];
  onDeleteClick: (id: string) => void;
  onEditClick: (id: string, name: string) => void;
  id?: string;
}

export const Table: FC<TableProps> = memo(
  ({ cardPacks, onDeleteClick, onEditClick, id }) => {
    const isFetching = useSelector(selectIsFetching);

    return (
      <table className={style.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>
              Cards
              <Sorting id={id} sortName="cardsCount" />
            </td>
            <td>
              LastUpdated
              <Sorting id={id} sortName="updated" />
            </td>
            <td>Created by</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {isFetching ? (
            <div className={style.preloaderContainer}>
              <Preloader />
            </div>
          ) : (
            cardPacks.map(cardPack => (
              <CardPack
                key={cardPack._id}
                cardPack={cardPack}
                deleteCardPack={onDeleteClick}
                editCardPack={onEditClick}
              />
            ))
          )}
        </tbody>
      </table>
    );
  },
);
