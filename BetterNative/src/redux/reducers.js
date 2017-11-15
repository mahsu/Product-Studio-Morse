import {combineReducers} from 'redux'
import {LOGIN} from "./actions";

function login(state = false, action) {
    switch (action.type) {
        case LOGIN:
            return action.loggedIn;
        default:
            return state
    }
}

const identityApp = combineReducers({
    login
});

export default identityApp;