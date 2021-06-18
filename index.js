import React from "react";
import ReactDOM from "react-dom";
import App from './src/App.js';
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import {dataReducer} from './src/store/dataReducer';

const rootReducer = combineReducers({dataReducer: dataReducer})

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.querySelector("#root"));
