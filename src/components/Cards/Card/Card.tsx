import { FC } from 'react';

import { styled } from '@mui/material';
import Rating from '@mui/material/Rating';

import { CardsType } from 'bll/types';
import { lastUpdateDate } from 'const';

interface CardsProps {
  card: CardsType;
}

export const Card: FC<CardsProps> = ({ card }) => {
  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#21268F',
    },
  });

  return (
    <tr>
      <td>{card.question}</td>
      <td>{card.answer}</td>
      <td>{lastUpdateDate(card.updated)}</td>
      <td>
        <StyledRating name="read-only" value={card.grade} readOnly size="small" />
      </td>
    </tr>
  );
};
