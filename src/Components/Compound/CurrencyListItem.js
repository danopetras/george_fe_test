import React from 'react';
import PropTypes from 'prop-types';
import FlexColumn from '../LayoutComponents/FlexColumn';
import FlexRow from '../LayoutComponents/FlexRow';
import Flag from '../Simple/Flag';
import '../../Styles/CurrencyListItem.css';

/**
 * Renders single list item for the props.currency object
 * with:
 *  flag
 *  currency name and code
 *  exchange rate with currency symbol
 *  country name
 */
function CurrencyListItem({currency}) {
  return (
    <div className="CurrencyListItem">
      <FlexRow alignChildren="space-betwen">
        <FlexRow alignChildren="start">
          <Flag countryCode={currency.flagCode} />
          <h2>{currency.countryName}</h2>
        </FlexRow>
        <FlexColumn alignChildren="right">
          <p className="CurrencyExchangeRate">{currency.exchangeRate} <span>{currency.currencySymbol}</span></p>
          <p className="CurrencyName">{currency.currencyName}(<strong>{currency.code}</strong>)</p>
        </FlexColumn>
      </FlexRow>
    </div>
  );
}

CurrencyListItem.propTypes = {
  /// CurrencyObject
  currency: PropTypes.object.isRequired,
};

export default CurrencyListItem;
