import { FC, memo } from 'react';

import style from './style/table.module.scss';

import { CardPackType } from 'bll/types';
import { CardPack } from 'components/CardPack';
import { Sorting } from 'components/common/Sorting';

interface TableProps {
  id?: string;
  cardPacks: CardPackType[];
  onDeleteClick: (id: string) => void;
  onEditClick: (id: string, name: string) => void;
}

export const Table: FC<TableProps> = memo(
  ({ cardPacks, id, onDeleteClick, onEditClick }) => (
    <div className={style.tableWrapper}>
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
          {cardPacks.map(cardPack => (
            <CardPack
              key={cardPack._id}
              cardPack={cardPack}
              deleteCardPack={onDeleteClick}
              editCardPack={onEditClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  ),
);
