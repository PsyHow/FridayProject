/* eslint-disable react/no-array-index-key */
import { ChangeEvent, ReactElement, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import style from './style/learnPage.module.scss';

import { fetchCards, updateCardGrade } from 'bll/middlewares';
import { CardsType } from 'bll/types';
import { Button } from 'components/common/Button';
import { grades } from 'const';
import { PATH } from 'enums';
import { selectCardPacks } from 'selectors/cardPacksSelectors';
import { selectCardId, selectCards } from 'selectors/cardsReducer';

const getCard = (cards: CardsType[]): CardsType => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);

  const rand = Math.random() * sum;

  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
      return { sum: newSum, id: newSum < rand ? i : acc.id };
    },
    { sum: 0, id: -1 },
  );

  return cards[res.id + 1];
};

export const LearnPage = (): ReactElement => {
  const dispatch = useDispatch();
  const packId = useSelector(selectCardId);
  const cards = useSelector(selectCards);
  const cardPacks = useSelector(selectCardPacks);

  const { token } = useParams();

  const [first, setFirst] = useState(true);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [gradeValue, setGradeValue] = useState<number>(0);
  const [learningCard, setLearningCard] = useState<CardsType>({
    cardsPack_id: '',
    grade: 0,
    question: '',
    shots: 1,
    user_id: '',
    updated: '',
    __v: 1,
    _id: '',
    type: '',
    answer: '',
    created: '',
    rating: 1,
  });

  useEffect(() => {
    if (first) {
      dispatch(fetchCards({ cardsPack_id: token, pageCount: 99999 } || ''));
      setFirst(false);
    }
    if (cards.length > 0) {
      setLearningCard(getCard(cards));
    }
  }, [token, cards, first, dispatch, packId]);

  const cardPackName = cardPacks.filter(card => card._id === token)[0];

  const handleShowAnswerClick = (): void => setIsShowAnswer(true);
  const handleCloseAnswerClick = (): void => setIsShowAnswer(false);

  // const handleBackNavigateClick = (): void => navigate(PATH.CARD_PACKS);

  const handleGetNextCardClick = (): void => {
    dispatch(updateCardGrade(learningCard._id, gradeValue));
    setLearningCard(getCard(cards));
    setIsShowAnswer(false);
  };

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setGradeValue(+event.target.value);
  };

  return (
    <div className={style.learnPageContainer}>
      <div className={style.questionContainer}>
        <h1 className={style.packName}>Learn {`"${cardPackName.name}"`}</h1>

        <div className={style.questionItems}>
          <span>Question: </span>

          <span className={style.question}>{learningCard.question}</span>
        </div>

        {!isShowAnswer ? (
          <div className={style.answerContainer} />
        ) : (
          <>
            <div className={style.answerContainer}>
              <span>Answer:</span>

              <span className={style.answer}>{learningCard.answer}</span>
            </div>

            <span className={style.rateTitle}>Rate yourself:</span>

            <div className={style.rateOptions}>
              {grades.map((grade, i) => (
                <label key={`grade-${i}`}>
                  <input
                    type="radio"
                    value={i + 1}
                    onChange={handleRadioChange}
                    checked={gradeValue === i + 1}
                  />
                  {grade}
                </label>
              ))}
            </div>
          </>
        )}

        <div className={style.buttonsContainer}>
          {!isShowAnswer ? (
            <>
              <NavLink to={PATH.CARD_PACKS}>
                <Button id="cancel" type="button">
                  Back
                </Button>
              </NavLink>

              <Button type="button" onClick={handleShowAnswerClick}>
                Show answer
              </Button>
            </>
          ) : (
            <>
              <Button id="cancel" type="button" onClick={handleCloseAnswerClick}>
                Cancel
              </Button>
              <Button onClick={handleGetNextCardClick} type="button">
                Next
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
