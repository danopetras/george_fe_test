/**
 * validation of a currency record from the API
 * basically, we are stopping currencies without exchangeRate.middle property
 * to get to the redux store
 */
export function validateCurrencyData(currencyObject) {
  return currencyObject.hasOwnProperty('exchangeRate') && currencyObject.exchangeRate.hasOwnProperty('middle');
}
