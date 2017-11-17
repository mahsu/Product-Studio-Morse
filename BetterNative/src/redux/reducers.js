import {combineReducers} from 'redux'
import {LOGIN, SET_UID} from "./actions";

function login(state = null, action) {
    switch (action.type) {
        case LOGIN:
            return action.token;
        default:
            return state
    }
}

function uid(state = null, action) {
    switch (action.type) {
        case SET_UID:
            return action.uid;
        default:
            return state
    }
}

const identityApp = combineReducers({
    login,
    uid
});

export default identityApp;