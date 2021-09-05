import reducer, { SLICE_NAME } from '../../../Redux/currenciesSlice';

const initialState = {
  currencies: [],
  isLoading: false,
  lastFetchError: false,
};

describe('currenciesSlice setup', () => {
  test('Slice needs to return SLICE_NAME constant, with value: currencies', () => {
    expect(SLICE_NAME).toBe('currencies');
  });

  test('Should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});
