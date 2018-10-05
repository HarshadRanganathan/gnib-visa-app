import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { axiosInterceptors } from './actions/progress';
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';
import App from './component/app';
import reducers from './reducers';
import 'bootstrap';
import '../style/style.css';

const createStoreWithMiddleWare = applyMiddleware(thunk)(createStore);
axiosInterceptors();

ReactDOM.render(
    <Provider store={createStoreWithMiddleWare(reducers, devToolsEnhancer())}>
        <App />
    </Provider>
    , document.querySelector('.container'));