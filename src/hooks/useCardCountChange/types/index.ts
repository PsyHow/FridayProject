export type useCardCountChangeReturnType = {
  debounceMinCount: number;
  debounceMaxCount: number;
  onChangeHandler: (values: number | number[]) => void;
  minCount: number;
  maxCount: number;
};
