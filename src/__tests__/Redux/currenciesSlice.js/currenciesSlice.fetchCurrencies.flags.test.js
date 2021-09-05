import reducer, { fetchCurrencies } from '../../../Redux/currenciesSlice';

const initialState = {
  currencies: [],
  isLoading: false,
  lastFetchError: false,
};

describe('currenciesSlice isLoading and lastFetchError flags', () => {
  test('isLoading is set to true and lastFetchError to false on request pending', () => {
    const previousState = {...initialState};
    const action = {type: fetchCurrencies.pending.type};
    const newState = reducer(previousState, action);
    expect(newState).toHaveProperty('isLoading', true);
    expect(newState).toHaveProperty('lastFetchError', false);
  });

  test('isLoading is set to false and lastFetchError to false if request was fulfilled', () => {
    const previousState = {...initialState, isLoading: true, lastFetchError: true};
    const action = {
      type: fetchCurrencies.fulfilled.type,
      payload: {fx: []}
    };
    const newState = reducer(previousState, action);
    expect(newState).toHaveProperty('isLoading', false);
    expect(newState).toHaveProperty('lastFetchError', false);
  });

  test('isLoading is set to false and lastFetchError to true if request was rejected', () => {
    const previousState = {...initialState, isLoading: true, lastFetchError: true};
    const action = {type: fetchCurrencies.rejected.type};
    const newState = reducer(previousState, action);
    expect(newState).toHaveProperty('isLoading', false);
    expect(newState).toHaveProperty('lastFetchError', true);
  });
});
