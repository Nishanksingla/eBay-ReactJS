import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route } from 'react-router-dom'
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import allReducers from './reducers';
import App from './components/App';
import loginCom from './containers/loginCom';
import aboutPage from './containers/aboutPage';
import market from './containers/marketPage';

const logger = createLogger();
const middleware = applyMiddleware(thunk, promise, logger);
const store = createStore(
    allReducers,
    compose(middleware, window.devToolsExtension ? window.devToolsExtension() : f => f)
);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>    
                <Route path="/" component={App}/>
                <Route path="/login" component={loginCom}/>
                <Route path="/about" component={aboutPage}/>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);
