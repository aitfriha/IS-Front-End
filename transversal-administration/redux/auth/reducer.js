import { SIGN_IN, SIGN_IN_FAILURE, SIGN_IN_SUCCESS } from './constants';

const initialState = {
    isLoading: false,
    errors: {},
    signInResponse: {}
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
    case SIGN_IN:
        return {
            ...state,
            isLoading: true
        };
    case SIGN_IN_SUCCESS:
        return {
            ...state,
            isLoading: false,
            errors: {},
            signInResponse: action.payload,
        };
    case SIGN_IN_FAILURE:
        return {
            ...state,
            isLoading: false,
            signInResponse: {},
            errors: action.errors
        };
    default:
        return state;
    }
}
