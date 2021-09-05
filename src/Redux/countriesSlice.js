/**
 * Countries slice
 * responsible for countries from the config.countriesConfig.API endpoint
 * countries are mapped from the API to the redux store with @see reduceCountry
 *
 * slice contains ayncThunk:
 *    fetchCountries
 *
 * and selectors:
 *    isLoadingSelector
 *    hasErrorSelector
 *    countriesSelector
 */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { countriesConfig } from '../configuration';
import { reduceCountry } from './mappers/reduceCountry';

export const SLICE_NAME = 'countries';

export const fetchCountries = createAsyncThunk('countries/fetchCountries', async (param, { rejectWithValue }) => {
  const url = countriesConfig.API;

  try {
    const request = await fetch(url);
    if (request.status === 200) {
      return request.json();
    }
    console.log('new errror')
    rejectWithValue({ error: 'request failed with status ' + request.status });
  } catch (ex) {
    console.log('thrown errror')
    return rejectWithValue({ error: ex });
  }
});

export const countriesSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    /// `Countries` object is indexed by alpha3Code currency code
    /// containing object with name and alpha2Code properties
    countries: {},
    isLoading: false,
    lastFetchError: null,
  },
  reducers: {},
  extraReducers: {
    [fetchCountries.pending]: (state) => {
      state.isLoading = true;
      state.lastFetchError = false;
    },
    [fetchCountries.rejected]: (state) => {
      state.isLoading = false;
      state.lastFetchError = true;
    },
    [fetchCountries.fulfilled]: (state, {payload}) => {
      state.countries = payload.reduce(reduceCountry, {});

      state.isLoading = false;
      state.lastFetchError = false;
    }
  }
});

/// Simple helper function to get our slice's state tree object
const countriesStateSelector = (state) => state[SLICE_NAME];

export const isLoadingSelector = createSelector(countriesStateSelector, (state) => state.isLoading);
export const hasErrorSelector = createSelector(countriesStateSelector, (state) => state.lastFetchError);
export const countriesSelector = createSelector(countriesStateSelector, (state) => state.countries);

export default countriesSlice.reducer;
