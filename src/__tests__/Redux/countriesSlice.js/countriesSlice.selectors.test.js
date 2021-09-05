import { isLoadingSelector, hasErrorSelector, countriesSelector } from '../../../Redux/countriesSlice';

const initialState = {
  countries: {},
  isLoading: false,
  lastFetchError: null,
};

describe('countriesSlice selectors', () => {
  test('isLoadingSelector returns state variable "isLoading"', () => {
    const currentState = {...initialState, isLoading: true};
    const isLoading = isLoadingSelector.resultFunc(currentState);
    expect(isLoading).toBeTruthy();
  });

  it('hasErrorSelector returns state variable "lastFetchError"', () => {
    const currentState = {...initialState, lastFetchError: true};
    const hasError = hasErrorSelector.resultFunc(currentState);
    expect(hasError).toBeTruthy();
  });

  it('countriesSelector returns state variable countries', () => {
    const currentState = {...initialState, countries: {1: {}, 2: {}, 3: {}}};
    const currencies = countriesSelector.resultFunc(currentState);
    expect(Object.keys(currencies)).toHaveLength(3);
  });
});
