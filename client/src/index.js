import React from 'react';
import ReactDOM from 'react-dom';

import './styles/global.css';

import { Provider } from './Context';
import App from './App';

ReactDOM.render(
  //Wraps App inside a Provider so that all components have the
  //Option to subscribe to context
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);