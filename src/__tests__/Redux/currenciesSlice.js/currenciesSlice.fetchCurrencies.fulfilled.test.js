import reducer, { fetchCurrencies } from '../../../Redux/currenciesSlice';

const initialState = {
  currencies: [],
  isLoading: false,
  lastFetchError: false,
};

describe('fetchCurrencies.fulfilled reducer', () => {
  test('API result is mapped to predefined structure [{code, exchangeRate}]', () => {
    const previousState = {...initialState, isLoading: true, lastFetchError: false};
    const action = {
      type: fetchCurrencies.fulfilled.type,
      payload: {
        "institute": 198,
        "lastUpdated": "2018-11-09T15:07:00Z",
        "comparisonDate": "2018-11-09T12:45:00Z",
        "baseCurrency": "EUR",
        "fx": [
          {
            "currency": "FJD",
            "precision": 2,
            "nameI18N": "Fiji Dollar",
            "exchangeRate": {
              "buy": 2.0000000,
              "middle": 2.2500000,
              "sell": 2.5000000,
              "indicator": 0,
              "lastModified": "2012-02-14T23:00:00Z"
            },
            "banknoteRate": {
              "buy": 2.2000000,
              "middle": 2.4000000,
              "sell": 2.6000000,
              "indicator": 0,
              "lastModified": "2018-11-06T23:00:00Z"
            },
            "flags": [
              "provided"
            ]
          }
        ]
      }
    };
    const newState = reducer(previousState, action);

    expect(newState.currencies).toHaveLength(1);
    expect(Object.keys(newState.currencies[0])).toHaveLength(2);
    expect(newState.currencies[0]).toHaveProperty('code', 'FJD');
    expect(newState.currencies[0]).toHaveProperty('exchangeRate', 2.2500000);
  });

  it('should ignore data without exchangerate.middle', () => {
    const previousState = {...initialState, isLoading: true, lastFetchError: false};
    const action = {
      type: fetchCurrencies.fulfilled.type,
      payload: {
        "institute": 198,
        "lastUpdated": "2018-11-09T15:07:00Z",
        "comparisonDate": "2018-11-09T12:45:00Z",
        "baseCurrency": "EUR",
        "fx": [
          {
            "currency": "FJD",
            "precision": 2,
            "nameI18N": "Fiji Dollar",
            "exchangeRate": {
              "buy": 2.0000000,
              "middle": 2.2500000,
              "sell": 2.5000000,
              "indicator": 0,
              "lastModified": "2012-02-14T23:00:00Z"
            },
            "banknoteRate": {
              "buy": 2.2000000,
              "middle": 2.4000000,
              "sell": 2.6000000,
              "indicator": 0,
              "lastModified": "2018-11-06T23:00:00Z"
            },
            "flags": [
              "provided"
            ]
          },
          {
            "currency": "STD",
            "precision": 2,
            "exchangeRate": {
              "buy": 22.3800000,
              "no-middle": 22.9800000,
              "sell": 23.5800000,
              "indicator": 0,
              "lastModified": "2018-11-08T23:00:00Z"
            },
          },
          {
            "currency": "MXN",
            "precision": 2,
            "nameI18N": "Mexican Peso",
            "exchangeRate": {
              "buy": 22.3800000,
              "middle": 22.9800000,
              "sell": 23.5800000,
              "indicator": 0,
              "lastModified": "2018-11-08T23:00:00Z"
            },
            "banknoteRate": {
              "buy": 21.1000000,
              "middle": 22.6000000,
              "sell": 24.1000000,
              "indicator": 0,
              "lastModified": "2018-11-06T23:00:00Z"
            },
            "flags": [
              "provided"
            ]
          },
        ]
      }
    };
    const newState = reducer(previousState, action);

    expect(newState.currencies).toHaveLength(2);
    expect(newState.currencies[0]).toHaveProperty('code', 'FJD');
    expect(newState.currencies[1]).toHaveProperty('code', 'MXN');
  });
});
