import { FC, memo } from 'react';

import style from './style/table.module.scss';

import { CardPackType } from 'bll/types';
import { CardPack } from 'components/CardPack';
import { tableHeadPackTitle } from 'const';

interface TableProps {
  cardPacks: CardPackType[];
  onDeleteClick: (id: string) => void;
  onEditClick: (id: string, name: string) => void;
}

export const Table: FC<TableProps> = memo(({ cardPacks, onDeleteClick, onEditClick }) => (
  <div className={style.tableWrapper}>
    <table className={style.table}>
      <thead>
        <tr>
          {tableHeadPackTitle.map(({ id, name }) => (
            <td key={id}>{name}</td>
          ))}
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
));
