import reducer, { SLICE_NAME } from '../../../Redux/countriesSlice';

const initialState = {
  countries: {},
  isLoading: false,
  lastFetchError: null,
};

describe('currenciesSlice setup', () => {
  test('Slice needs to return SLICE_NAME constant, with value: countries', () => {
    expect(SLICE_NAME).toBe('countries');
  });

  test('Should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});
