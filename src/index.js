import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter } from 'react-router-dom'
//import rootReducer from './reducers'
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './configureStore'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import themeSettings from './theme'

const store = configureStore()


const theme = createMuiTheme(themeSettings)

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
)

// If
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
