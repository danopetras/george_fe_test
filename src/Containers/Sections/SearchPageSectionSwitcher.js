import React from 'react';
import PropTypes from 'prop-types';
import FlexColumn from '../../Components/LayoutComponents/FlexColumn';
import CurrencyList from './CurrencyList';
import EmptyCurrencyList from './EmptyCurrencyList';
import Loading from './Loading';
import RequestFailed from './RequestFailed';

/**
 * Wrapper around the sections of the page
 * it decides what section component should render based on input attributes
 */
function SearchPageSectionSwitcher({isLoading, hasError, currencies, onDispatchRequests, searchValue, onClearSearchTerm}) {
  return (
    <FlexColumn fullWidth={true} alignChildren={'center'}>
      {
        isLoading ?
        /// Loading ---------------------------------------------------
        <Loading />

        : /// check for errors ----------------------------------------
        hasError ?
        <RequestFailed onTryAgain={onDispatchRequests} />

        : /// it is not loading, and there are no errors. we are ready to go.
        currencies.length > 0 ?
          <CurrencyList currencies={currencies} />

          : /// list is empty... ------------------------------------------
          <EmptyCurrencyList currentSearchTerm={searchValue} onClearSearchTerm={onClearSearchTerm} />
      }
    </FlexColumn>
  );
}

SearchPageSectionSwitcher.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  currencies: PropTypes.array.isRequired,
  onDispatchRequests: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  onClearSearchTerm: PropTypes.func.isRequired,
};

export default SearchPageSectionSwitcher;
