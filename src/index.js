import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { axiosInterceptors } from './actions/progress';
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';
import App from './component/app';
import reducers from './reducers';
import '../style/style.css';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#62727b',
            main: '#37474f',
            dark: '#102027',
            contrastText: '#fff',
        }
    },
    typography: {
        useNextVariants: true,
    }
});

const createStoreWithMiddleWare = applyMiddleware(thunk)(createStore);
axiosInterceptors();

ReactDOM.render(
    <Provider store={createStoreWithMiddleWare(reducers, devToolsEnhancer())}>
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </MuiThemeProvider>
    </Provider>
    , document.querySelector('.container'));