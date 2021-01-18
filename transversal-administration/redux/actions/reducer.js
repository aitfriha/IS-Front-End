import {
    ADD_ACTION,
    ADD_ACTION_FAILURE,
    ADD_ACTION_SUCCESS,
    DELETE_ACTION,
    DELETE_ACTION_FAILURE,
    DELETE_ACTION_SUCCESS,
    GET_ALL_ACTIONS,
    GET_ALL_ACTIONS_FAILURE,
    GET_ALL_ACTIONS_SUCCESS,
    UPDATE_ACTION,
    UPDATE_ACTION_FAILURE,
    UPDATE_ACTION_SUCCESS
} from './constants';

const initialState = {
    isLoading: false,
    errors: {},
    actionResponse: '',
    allActions: []
};

export default function actionsReducer(state = initialState, action) {
    switch (action.type) {
    // TRIGGERING ACTIONS
    case GET_ALL_ACTIONS:
    case ADD_ACTION:
    case UPDATE_ACTION:
    case DELETE_ACTION:
        return {
            ...state,
            isLoading: true
        };

        // SUCCESS ACTIONS
    case ADD_ACTION_SUCCESS:
    case UPDATE_ACTION_SUCCESS:
    case DELETE_ACTION_SUCCESS:
        return {
            ...state,
            isLoading: false,
            actionResponse: action.payload,
            errors: {}
        };

    case GET_ALL_ACTIONS_SUCCESS:
        return {
            ...state,
            isLoading: false,
            allActions: action.payload,
        };

        // FAILURE ACTIONS
    case GET_ALL_ACTIONS_FAILURE:
    case ADD_ACTION_FAILURE:
    case UPDATE_ACTION_FAILURE:
    case DELETE_ACTION_FAILURE:
        return {
            ...state,
            isLoading: false,
            actionResponse: '',
            errors: action.errors
        };

    default:
        return state;
    }
}
