import React from 'react';
import PropTypes from 'prop-types';
import CurrencyListItem from '../../Components/Compound/CurrencyListItem';

/**
 * renders array of <CurrencyListItem components
 * use useFilteredCurrencies hook for currencies attribute
 */
function CurrencyList({currencies}) {
  return (
    <>
      {currencies.map((currency) => <CurrencyListItem currency={currency} key={currency.code} />)}
    </>
  );
}

CurrencyList.propTypes = {
  /// list of currencies from currenciesSelector
  currencies: PropTypes.array.isRequired,
};

export default CurrencyList;
