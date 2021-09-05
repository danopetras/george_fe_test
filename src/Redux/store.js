import { configureStore } from '@reduxjs/toolkit';
import currenciesSlice, {SLICE_NAME as currenciesSliceName} from './currenciesSlice';
import countriesSlice, {SLICE_NAME as countriesSliceName} from './countriesSlice';

const storeConfig = {
  reducer: {
    [currenciesSliceName]: currenciesSlice,
    [countriesSliceName]: countriesSlice,
  },
};

export default configureStore(storeConfig);
