import reducer, { fetchCountries } from '../../../Redux/countriesSlice';

const initialState = {
  countries: {},
  isLoading: false,
  lastFetchError: null,
};

describe('fetchCountries.fulfilled reducer', () => {
  test('data is formated in predefined structure {currencyCode: {flagCode, countryName,currencyName,currencySymbol}}', () => {
    const previousState = {...initialState, isLoading: true, lastFetchError: false};
    const action = {
      type: fetchCountries.fulfilled.type,
      payload: [
        {
          "name": "Slovakia",
          "topLevelDomain": [
            ".sk"
          ],
          "alpha2Code": "SK",
          "alpha3Code": "SVK",
          "callingCodes": [
            "421"
          ],
          "capital": "Bratislava",
          "altSpellings": [
            "SK",
            "Slovak Republic",
            "Slovenská republika"
          ],
          "region": "Europe",
          "subregion": "Eastern Europe",
          "population": 5426252,
          "latlng": [
            48.66666666,
            19.5
          ],
          "demonym": "Slovak",
          "area": 49037.0,
          "gini": 26.0,
          "timezones": [
            "UTC+01:00"
          ],
          "borders": [
            "AUT",
            "CZE",
            "HUN",
            "POL",
            "UKR"
          ],
          "nativeName": "Slovensko",
          "numericCode": "703",
          "currencies": [
            {
              "code": "EUR",
              "name": "Euro",
              "symbol": "€"
            }
          ],
          "languages": [
            {
              "iso639_1": "sk",
              "iso639_2": "slk",
              "name": "Slovak",
              "nativeName": "slovenčina"
            }
          ],
          "translations": {
            "de": "Slowakei",
            "es": "República Eslovaca",
            "fr": "Slovaquie",
            "ja": "スロバキア",
            "it": "Slovacchia",
            "br": "Eslováquia",
            "pt": "Eslováquia",
            "nl": "Slowakije",
            "hr": "Slovačka",
            "fa": "اسلواکی"
          },
          "flag": "https://restcountries.eu/data/svk.svg",
          "regionalBlocs": [
            {
              "acronym": "EU",
              "name": "European Union",
              "otherAcronyms": [],
              "otherNames": []
            }
          ],
          "cioc": "SVK"
        }
      ]
    };
    const newState = reducer(previousState, action);

    expect(newState.countries).toHaveProperty('EUR');
    expect(newState.countries.EUR).toHaveProperty('flagCode', 'sk');
    expect(newState.countries.EUR).toHaveProperty('countryName', 'Slovakia');
    expect(newState.countries.EUR).toHaveProperty('currencyName', 'Euro');
    expect(newState.countries.EUR).toHaveProperty('currencySymbol', '€');
    expect(Object.keys(newState.countries.EUR)).toHaveLength(4);
  });
});
