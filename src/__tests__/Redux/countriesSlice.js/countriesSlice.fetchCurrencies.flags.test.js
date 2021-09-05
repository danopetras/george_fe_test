import reducer, { fetchCountries } from '../../../Redux/countriesSlice';

const initialState = {
  countries: {},
  isLoading: false,
  lastFetchError: null,
};

describe('CountriesSlice isLoading and lastFetchError flags', () => {
  test('isLoading is set to true and lastFetchError to false on request pending', () => {
    const previousState = {...initialState};
    const action = {type: fetchCountries.pending.type};
    const newState = reducer(previousState, action);
    expect(newState).toHaveProperty('isLoading', true);
    expect(newState).toHaveProperty('lastFetchError', false);
  });

  test('isLoading is set to false and lastFetchError to false if request was fulfilled', () => {
    const previousState = {...initialState, isLoading: true, lastFetchError: true};
    const action = {
      type: fetchCountries.fulfilled.type,
      payload: []
    };
    const newState = reducer(previousState, action);
    expect(newState).toHaveProperty('isLoading', false);
    expect(newState).toHaveProperty('lastFetchError', false);
  });

  test('isLoading is set to false and lastFetchError to true if request was rejected', () => {
    const previousState = {...initialState, isLoading: true, lastFetchError: true};
    const action = {type: fetchCountries.rejected.type};
    const newState = reducer(previousState, action);
    expect(newState).toHaveProperty('isLoading', false);
    expect(newState).toHaveProperty('lastFetchError', true);
  });
});
