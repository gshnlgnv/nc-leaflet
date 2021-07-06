import React from "react";
import ReactDOM from "react-dom";
import App from './src/App.js';
import {Provider} from "react-redux";
import store from './src/store/indexToolkit';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.querySelector("#root"));
