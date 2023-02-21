export const SET_USER_SESSION = "SET_USER_SESSION";
export const SET_RECENT_CASES = "SET_RECENT_CASES";
export const SET_COUNT_CASES = "SET_COUNT_CASES";
export const SET_CURRENT_CASE = "SET_CURRENT_CASE";
export const SET_ADDRESSES = "SET_ADDRESSES";

export const setUserSession = (user) => dispatch => {
    dispatch({
        type: SET_USER_SESSION,
        payload: user
    })
}

export const setRecentCases = (data) => dispatch => {
    dispatch({
        type: SET_RECENT_CASES,
        payload: data
    })
}

export const setCountCases = (data) => dispatch => {
    dispatch({
        type: SET_COUNT_CASES,
        payload: data
    })
}

export const setCurrentCase = (data) => dispatch => {
    dispatch({
        type: SET_CURRENT_CASE,
        payload: data
    })
}

export const setAddresses = (data) => dispatch => {
    dispatch({
        type: SET_ADDRESSES,
        payload: data
    })
}