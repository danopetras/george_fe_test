function reduceCurrencyRecord(countryName, flagCode) {
  return function(acc, currency) {
    /// there are `null` currencies in a result
    if (currency.code === null) return acc;
    return {
      ...acc,
      [currency.code]: {
        countryName: countryName,
        flagCode: flagCode.toLowerCase(),
        currencyName: currency.name,
        currencySymbol: currency.symbol,
      }
    }
  }
}

/**
 * helper function for reducer
 * it goes through all the currencies of a country
 * and creates new record for each one.
 * so, in the end, there can be duplicated countries in final object, but unique currencies
 */
export function reduceCountry(acc, countryObject) {
  const countryName = countryObject.name;
  const flagCode = countryObject.alpha2Code;
  acc = countryObject.currencies.reduce(reduceCurrencyRecord(countryName, flagCode), acc);

  return acc;
}