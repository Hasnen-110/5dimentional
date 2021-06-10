import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { BrowserRouter } from 'react-router-dom';
import SessionStorage from './util/sessionstore';
import reportWebVitals from './reportWebVitals';
import "antd/dist/antd.css";

const session = new SessionStorage();

let profile = session.getProfile();
let initialState = profile ? {profile} : undefined;

const store = configureStore(initialState);

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App /> 
      </BrowserRouter>
    </Provider>
 ,
  document.getElementById('root')
);

reportWebVitals();
