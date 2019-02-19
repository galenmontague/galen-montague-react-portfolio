// 'bootstrap' is a common convention for naming this file (not the framework from twitter)

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

import './style/main.scss';
// imports the style sheet so all styles will be coming from the same place


function main() {
  ReactDOM.render(
    // means we will be building an app that will render in the DOM (browser, not mobile)
    <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    , document.querySelector('.app-wrapper'));
        // this line is pure JS
        // allows us to slide in the above code into .app-wrapper (in static folder)
}

document.addEventListener('DOMContentLoaded', main);
