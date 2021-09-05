/**
 * mapApiToSimpleCurrencyList
 * maps data from the API to the store object
 *
 * @param {object} apiCurrencyObject - usualy object comming from .map function
 * @returns {object} - {code, exchangeRate}
 */
export default function mapApiToSimpleCurrencyList(apiCurrencyObject) {
  return {
    code: apiCurrencyObject.currency,
    exchangeRate: apiCurrencyObject.exchangeRate.middle,
  }
};
