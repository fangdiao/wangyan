import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './routes';

import reducers from './reducers';

// const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : () => {}

const store = createStore(reducers,compose(applyMiddleware(thunk, promiseMiddleware), window.devToolsExtension?window.devToolsExtension():f=>f));

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);