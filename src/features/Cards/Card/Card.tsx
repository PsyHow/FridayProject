import { FC } from 'react';

import { CardsType } from '../bll/cardsTypes';

import { lastUpdateDate } from 'const';

type CardsPropsType = {
  card: CardsType;
  deleteCard: (id: string) => void;
  getUpdateCard: (id: string, question: string, answer: string) => void;
};

export const Card: FC<CardsPropsType> = ({ card, deleteCard, getUpdateCard }) => (
  // const userId = useSelector<AppRootStoreType, string>(st => st.profileReducer.user._id);

  // const deleteCardId = (): void => {
  //   deleteCard(card._id);
  // };

  // const editCardPack = (): void => {
  //   getUpdateCard(card._id, 'Why so serious?', '****');
  // };

  <tr>
    <td>{card.question}</td>
    <td>{card.answer}</td>
    <td>{lastUpdateDate(card.updated)}</td>
    <td>{card.grade}</td>
    {/* <td>
        {card.user_id === userId && <Button onClick={deleteCardId}>Delete</Button>}
        {card.user_id === userId && <Button onClick={editCardPack}>Edit</Button>}
      </td> */}
  </tr>
);
