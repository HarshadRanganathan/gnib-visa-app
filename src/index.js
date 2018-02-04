import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './component/app';
import reducers from './reducers';

const createStoreWithMiddleWare = applyMiddleware(thunk)(createStore);

ReactDOM.render(
    <Provider store={
        createStoreWithMiddleWare(reducers, 
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
        }>
        <App />
    </Provider>
    , document.querySelector('.container'));