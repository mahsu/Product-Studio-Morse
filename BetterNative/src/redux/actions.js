/*
 * action types
 */

export const LOGIN = 'LOGIN';
export const SET_UID = 'UID';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

/*
 * other constants
 */

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};

/*
 * action creators
 */

export const setLogin = (token) => {
    return { type: LOGIN, token }
};

export const setUid = (uid) => {
    return {type: SET_UID, uid}
};
