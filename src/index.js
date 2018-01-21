import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Route } from 'react-router';
import { HashRouter } from 'react-router-dom';

import './index.css';
import Catalog from './components/catalog/Catalog';
import Pc from './components/pc/Pc';
import reducer from './reducers';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <div>
        <Route path="/" component={Catalog} />
        <Route path="/:albumId/:id" component={Pc} />
      </div>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
