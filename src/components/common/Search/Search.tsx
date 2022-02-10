import { FC, useState } from 'react';

import { useDispatch } from 'react-redux';

import Button from '../Button/Button';
import { DoubleRange } from '../DoubleRange/DoubleRange';

import style from './Search.module.css';

import SuperInputText from 'components/common/Input/Input';
import {
  getCardsSearch,
  setCardsCurrentPageAC,
  setMinMaxCardsCountAC,
} from 'features/Cards/bll/cardsActions';
import { getCardsTC } from 'features/Cards/bll/cardsThunks';
import {
  getPackSearch,
  setMinMaxCardsPackCount,
  setPacksCurrentPageAC,
} from 'features/Packs/bll/CardPacksActions';
import { getCardPacksTC } from 'features/Packs/bll/CardPacksThunk';

export const Search: FC<PropsType> = ({ min, max, defaultMin, defaultMax, token }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>('');
  const onChangeSearch = (value: string): void => {
    setSearch(value);
  };

  // double range
  const [value1, setValue1] = useState(min);
  const [value2, setValue2] = useState(max);
  const onChangeHandler = (values: number | number[]): void => {
    if (Array.isArray(values)) {
      setValue1(values[0]);
      setValue2(values[1]);
    } else {
      setValue1(values);
    }
  };

  const onSubmit = () => {
    if (token) {
      dispatch(setMinMaxCardsCountAC(value1, value2));
      dispatch(getCardsSearch(search));
      dispatch(setCardsCurrentPageAC(1));
      dispatch(getCardsTC(token));
    } else {
      dispatch(setMinMaxCardsPackCount(value1, value2));
      dispatch(getPackSearch(search));
      dispatch(setPacksCurrentPageAC(1));
      dispatch(getCardPacksTC());
    }
  };

  return (
    <div className={style.searchBox}>
      <div className={style.range} style={{ display: 'flex' }}>
        <span style={{ width: '50px' }}>{value1}</span>
        <DoubleRange
          min={defaultMin}
          max={defaultMax}
          value={[value1, value2]}
          onChangeRange={onChangeHandler}
        />
        <span style={{ marginLeft: '5%' }}>{value2}</span>
      </div>
      <SuperInputText value={search} onChangeText={onChangeSearch} />
      <Button onClick={onSubmit}>Search</Button>
    </div>
  );
};

// types
type PropsType = {
  min: number;
  max: number;
  defaultMin: number;
  defaultMax: number;
  // eslint-disable-next-line react/require-default-props
  token?: string;
};
