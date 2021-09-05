import { render, screen, fireEvent } from '@testing-library/react';
import useFilteredCurrencies from '../../Hooks/useFilteredCurrencies';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import currenciesSlice, {SLICE_NAME as currenciesSliceName} from '../../Redux/currenciesSlice';
import countriesSlice, {SLICE_NAME as countriesSliceName} from '../../Redux/countriesSlice';

function TestComponent() {
  const [filteredCurrencies, setSearchTerm] = useFilteredCurrencies();

  return (
    <>
      {JSON.stringify(filteredCurrencies)}
      <button onClick={() => setSearchTerm('f')}>Find F</button>
      <button onClick={() => setSearchTerm('m')}>Find M</button>
      <button onClick={() => setSearchTerm('w')}>Find W</button>
      <button onClick={() => setSearchTerm('')}>Clear search</button>
    </>
  );
}

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

describe('FilteredCurrencies hook', () => {
  test('filter results with correct items', () => {
    /// We have only 2 matches in here
    const store = createStore({
      currencies: { currencies: [
        {
          code: 'FJD',
          exchangeRate: 2.25
        },
        {
          code: 'MXN',
          exchangeRate: 22.98
        },
        {
          code: 'LVL',
          exchangeRate: 0.6996
        },
      ], isLoading: false, lastFetchError: false },
      countries: { countries: {
        AFN: {
          countryName: 'Afghanistan',
          flagCode: 'af',
          currencyName: 'Afghan afghani',
          currencySymbol: '؋'
        },
        EUR: {
          countryName: 'Zimbabwe',
          flagCode: 'zw',
          currencyName: 'Euro',
          currencySymbol: '€'
        },
        FJD: {
          countryName: 'Fiji',
          flagCode: 'fj',
          currencyName: 'Fijian dollar',
          currencySymbol: '$'
        },
        MXN: {
          countryName: 'Mexico',
          flagCode: 'mx',
          currencyName: 'Mexican peso',
          currencySymbol: '$'
        },
      }, isLoading: false, lastFetchError: null }
    });

    render(<Provider store={store}><TestComponent /></Provider>);

    fireEvent.click(screen.getByText(/Find F/));
    expect(screen.queryByText(/Fiji/)).toBeInTheDocument();
    expect(screen.queryByText(/Mexico/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Zimbabwe/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Afghanistan/)).not.toBeInTheDocument();

    fireEvent.click(screen.getByText(/Find M/));
    expect(screen.queryByText(/Fiji/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Mexico/)).toBeInTheDocument();
    expect(screen.queryByText(/Zimbabwe/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Afghanistan/)).not.toBeInTheDocument();

    fireEvent.click(screen.getByText(/Find W/));
    expect(screen.queryByText(/Fiji/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Mexico/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Zimbabwe/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Afghanistan/)).not.toBeInTheDocument();

    fireEvent.click(screen.getByText(/Clear search/));
    expect(screen.queryByText(/Fiji/)).toBeInTheDocument();
    expect(screen.queryByText(/Mexico/)).toBeInTheDocument();
    expect(screen.queryByText(/Zimbabwe/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Afghanistan/)).not.toBeInTheDocument();
  });
});
