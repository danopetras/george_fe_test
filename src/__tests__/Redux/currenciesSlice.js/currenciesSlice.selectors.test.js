import { isLoadingSelector, hasErrorSelector, currenciesSelector } from '../../../Redux/currenciesSlice';

const initialState = {
  currencies: [],
  isLoading: false,
  lastFetchError: false,
};

describe('currenciesSlice selectors', () => {
  test('isLoadingSelector returns state variable "isLoading"', () => {
    const currentState = {...initialState, isLoading: true};
    const isLoading = isLoadingSelector.resultFunc(currentState);
    expect(isLoading).toBeTruthy();
  });

  test('hasErrorSelector returns state variable "lastFetchError"', () => {
    const currentState = {...initialState, lastFetchError: true};
    const hasError = hasErrorSelector.resultFunc(currentState);
    expect(hasError).toBeTruthy();
  });

  test('currenciesSelector returns state variable "currencies"', () => {
    const currentState = {...initialState, currencies: [1,2,3]};
    const currencies = currenciesSelector.resultFunc(currentState);
    expect(currencies).toHaveLength(3);
  });
});
