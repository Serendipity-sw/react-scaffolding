import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Index from './page/index/index.jsx';
import configureStore from "./reducers/configureStore";
import {HashRouter} from "react-router-dom";

ReactDOM.render([
  <Provider key="store" store={configureStore}>
    <HashRouter>
      <Index/>
    </HashRouter>
  </Provider>
], document.getElementById('root'));
