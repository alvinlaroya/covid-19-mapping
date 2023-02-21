import {
    SET_USER_SESSION,
    SET_RECENT_CASES,
    SET_COUNT_CASES,
    SET_CURRENT_CASE,
    SET_ADDRESSES,
    SET_CURRENT_CASE_HISTORY
} from "./actions";

const initialState = {
    user: {},
    cases: [],
    newCases: 0,
    recoveryCases: 0,
    deathCases: 0,
    currentCase: {},
    currentCaseHistory: {},
    addresses: []
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_SESSION:
            return { ...state, user: action.payload }
        case SET_RECENT_CASES:
            return { ...state, cases: action.payload }
        case SET_COUNT_CASES:
            return {
                ...state,
                newCases: action.payload.newCases,
                recoveryCases: action.payload.recoveryCases,
                deathCases: action.payload.deathCases
            }
        case SET_CURRENT_CASE:
            return { ...state, currentCase: action.payload }
        case SET_ADDRESSES:
            return { ...state, addresses: action.payload }
        case SET_CURRENT_CASE_HISTORY:
            return { ...state, currentCaseHistory: action.payload }
        default:
            return state;
    }
}

export default userReducer;