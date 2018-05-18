import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './routes';

import reducers from './reducers';

const store = createStore(reducers,compose(applyMiddleware(thunk, promiseMiddleware), window.devToolsExtension?window.devToolsExtension():f=>f));
ReactDom.render(
  <Provider store={store}>
    <HashRouter>
      <App></App>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);