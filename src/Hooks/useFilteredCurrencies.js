import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { countriesSelector } from "../Redux/countriesSlice";
import { currenciesSelector } from "../Redux/currenciesSlice";

/**
 * Hook that takes search term and filters countries and currencies with it
 * data is fetch from the redux store with countriesSelector and currenciesSelector
 * search field in resulting array.object is used for filtering matching. it is set to lowerCased countryName
 */
function useFilteredCurrencies(defaultSearchTerm) {
  const currencies = useSelector(currenciesSelector);
  const countries = useSelector(countriesSelector);

  const [mergedList, setMergedState] = useState([]);
  const [searchTerm, setSearchTerm] = useState(defaultSearchTerm);
  const [filteredCurrencies, setFilteredCurrencies] = useState([]);

  useEffect(() => {
    setMergedState(currencies.filter((currency) => countries.hasOwnProperty(currency.code)).map((currency) => ({
      ...currency,
      ...countries[currency.code],
      search: countries[currency.code].countryName.toLowerCase(),
    })));
  }, [countries, currencies])

  useEffect(() => {
    setFilteredCurrencies(mergedList.filter((country) => country.search.indexOf(searchTerm) > -1));
  }, [searchTerm, mergedList])

  return [filteredCurrencies, setSearchTerm];
}

export default useFilteredCurrencies;
