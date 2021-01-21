import {
    ADD_USER,
    ADD_USER_FAILURE,
    ADD_USER_SUCCESS,
    DELETE_USER,
    DELETE_USER_FAILURE,
    DELETE_USER_SUCCESS,
    GET_ALL_USERS,
    GET_ALL_USERS_FAILURE,
    GET_ALL_USERS_SUCCESS,
    UPDATE_USER,
    UPDATE_USER_FAILURE,
    UPDATE_USER_SUCCESS
} from './constants';

const initialState = {
    isLoading: false,
    errors: {},
    userResponse: '',
    allUsers: []
};

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
    // TRIGGERING ACTIONS
    case GET_ALL_USERS:
    case ADD_USER:
    case UPDATE_USER:
    case DELETE_USER:
        return {
            ...state,
            isLoading: true
        };

        // SUCCESS ACTIONS
    case ADD_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
    case DELETE_USER_SUCCESS:
        return {
            ...state,
            isLoading: false,
            userResponse: action.payload,
            errors: {}
        };

    case GET_ALL_USERS_SUCCESS:
        return {
            ...state,
            isLoading: false,
            allUsers: action.payload,
        };

        // FAILURE ACTIONS
    case GET_ALL_USERS_FAILURE:
    case ADD_USER_FAILURE:
    case UPDATE_USER_FAILURE:
    case DELETE_USER_FAILURE:
        return {
            ...state,
            isLoading: false,
            userResponse: '',
            errors: action.errors
        };

    default:
        return state;
    }
}
