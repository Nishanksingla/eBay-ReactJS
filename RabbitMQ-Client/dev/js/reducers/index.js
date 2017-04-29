import {combineReducers} from 'redux';
import LoginReducer from "./reducer-login.js";
import ErrorReducer from "./reducer-error.js";
import RegisterReducer from "./reducer-register.js";

const allReducers = combineReducers({
    loginUser:LoginReducer,
    loginError:ErrorReducer,
    registerStatus:RegisterReducer
});

export default allReducers
