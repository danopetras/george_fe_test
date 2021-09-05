import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../Components/LayoutComponents/Container';
import FlexColumn from '../Components/LayoutComponents/FlexColumn';
import FlexRow from '../Components/LayoutComponents/FlexRow';
import StickyContainer from '../Components/LayoutComponents/StickyContainer';
import PageTitle from '../Components/Simple/PageTitle';
import SearchBox from '../Components/Compound/SearchBox';
import SearchPageSectionSwitcher from './Sections/SearchPageSectionSwitcher';
import useFilteredCurrencies from '../Hooks/useFilteredCurrencies';
import useUrlHash from '../Hooks/useUrlHash';
import {
  isLoadingSelector as areCountriesLoadingSelector,
  hasErrorSelector as countriesFailedSelector,
  fetchCountries,
} from '../Redux/countriesSlice';
import {
  isLoadingSelector as areCurrenciesLoadingSelector,
  hasErrorSelector as currenciesFailedSelector,
  fetchCurrencies,
} from '../Redux/currenciesSlice';
import '../Styles/layout.css';

/**
 * Main layout of the search page and wiring of the data flow
 *
 * when searchTerm changes, it is updated to the URL's hash fragment
 * when URL's hash changes, searchTerm is sent to the filteredCurrencies hook
 */
function SearchPage() {
  const dispatch = useDispatch();

  const [filteredCurrencies, setSearchTermForFilter] = useFilteredCurrencies();
  const [searchValueFromHash, setSearchValueToHash] = useUrlHash();

  const areCurrenciesLoading = useSelector(areCurrenciesLoadingSelector);
  const areCountriesLoading = useSelector(areCountriesLoadingSelector);
  const currenciesFailed = useSelector(currenciesFailedSelector);
  const countriesFailed = useSelector(countriesFailedSelector);

  /// Callback to reload data from the API
  const dispatchRequests = useCallback(() => {
    dispatch(fetchCurrencies());
    dispatch(fetchCountries());
  }, [dispatch]);

  /// callback to clear the search box and URL hash
  const onClearSearchTerm = () => {
    onSearchValueChange('');
  };

  useEffect(() => {
    dispatchRequests();
  }, [dispatchRequests]);

  /// Search term hash callback and effect  ----------------------------------------

  /**
   * Callback from <input field
   * we are placing lowercase string to the URL hash
   *
   * @param {string} value
   */
  const onSearchValueChange = (value) => {
    setSearchValueToHash(value.toLowerCase());
  };

  /**
   * we are updating searchTerm variable in `useFilteredCurrencies` hook,
   * on each URL hash change
   *
   * this way the page content is synchronized with URL
   * and we are guaranteed to have `single source of throught` for searchTerm
   */
   useEffect(() => {
    setSearchTermForFilter(searchValueFromHash.toLowerCase());
  }, [searchValueFromHash, setSearchTermForFilter]);

  return (
    <>
      <FlexRow>
        <Container>
          <PageTitle title={'George FE test'} />
        </Container>
      </FlexRow>

      <FlexRow>
        <Container>
          <FlexColumn fullWidth={true}>
            <StickyContainer>
              <SearchBox
                label={'Search'}
                value={searchValueFromHash}
                onValueChange={onSearchValueChange}
                disabled={currenciesFailed || countriesFailed || areCountriesLoading || areCurrenciesLoading} />

            </StickyContainer>

            <SearchPageSectionSwitcher
              isLoading={areCountriesLoading || areCurrenciesLoading}
              hasError={countriesFailed || currenciesFailed}
              currencies={filteredCurrencies}
              onDispatchRequests={dispatchRequests}
              searchValue={searchValueFromHash}
              onClearSearchTerm={onClearSearchTerm}
              />
          </FlexColumn>
        </Container>
      </FlexRow>
    </>
  )
}

export default SearchPage;
