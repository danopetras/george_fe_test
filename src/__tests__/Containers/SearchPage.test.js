import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import currenciesSlice, {SLICE_NAME as currenciesSliceName} from '../../Redux/currenciesSlice';
import countriesSlice, {SLICE_NAME as countriesSliceName} from '../../Redux/countriesSlice';
import SearchPage from '../../Containers/SearchPage';

function createStore(preloadedState) {
  const storeConfig = {
    reducer: {
      [currenciesSliceName]: currenciesSlice,
      [countriesSliceName]: countriesSlice,
    },
  }
  if (preloadedState) {
    storeConfig.preloadedState = preloadedState;
  }
  return configureStore(storeConfig);
}


describe('Search page have multiple sections', () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({}),
    })
  );

  beforeEach(() => {
    fetch.mockClear();
  });

  test('Page is rendering', () => {
    const store = createStore();
    render(<Provider store={store}><SearchPage /></Provider>);
    expect(screen.getByText(/George FE test/)).toBeInTheDocument();
  })
})