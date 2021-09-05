/**
 * Currencies slice
 * responsible for currencies from the config.currenciesConfig.API endpoint
 * currencies are validated/filtered with function @see validateCurrencyData
 * and mapped to the redux store with @see mapApiToSimpleCurrencyList
 *
 * slice contains ayncThunk:
 *    fetchCurrencies
 *
 * and selectors:
 *    isLoadingSelector
 *    hasErrorSelector
 *    currenciesSelector
 */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { currenciesConfig } from '../configuration';
import mapApiToSimpleCurrencyList from './mappers/mapApiToSimpleCurrencyList';
import { validateCurrencyData } from './mappers/validateCurrencyData';

export const SLICE_NAME = 'currencies';

export const fetchCurrencies = createAsyncThunk('currencies/fetchCurrencies', async (params, { rejectWithValue }) => {
  const url = currenciesConfig.API;

  try {
    const request = await fetch(url);
    if (request.status === 200) {
      return request.json();
    }
    rejectWithValue({ error: 'request failed with status ' + request.status });
  } catch (ex) {
    return rejectWithValue({ error: ex });
  }
});

export const currenciesSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    currencies: [],
    isLoading: false,
    lastFetchError: false,
  },
  reducers: {},
  extraReducers: {
    [fetchCurrencies.pending]: (state) => {
      state.isLoading = true;
      state.lastFetchError = false;
    },
    [fetchCurrencies.rejected]: (state) => {
      state.isLoading = false;
      state.lastFetchError = true;
    },
    [fetchCurrencies.fulfilled]: (state, {payload}) => {
      /// we dont need complete objects in a redux store,
      /// so we will map the array to match our implementation
      /// in case of any API changes in the future, we can fix/remap them here, without breaking up our application
      state.currencies = payload.fx
        .filter(validateCurrencyData)
        .map(mapApiToSimpleCurrencyList);

      state.isLoading = false;
      state.lastFetchError = false;
    }
  }
});

/// Simple helper function to get our slice's state tree object
const currenciesStateSelector = (state) => state[SLICE_NAME];

export const currenciesSelector = createSelector(currenciesStateSelector, (state) => state.currencies);
export const isLoadingSelector = createSelector(currenciesStateSelector, (state) => state.isLoading);
export const hasErrorSelector = createSelector(currenciesStateSelector, (state) => state.lastFetchError);

export default currenciesSlice.reducer;
