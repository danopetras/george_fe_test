import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './Redux/store';
import SearchPage from './Containers/SearchPage';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SearchPage />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
