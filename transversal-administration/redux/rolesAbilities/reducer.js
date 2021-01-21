import {
    ADD_ROLE,
    ADD_ROLE_FAILURE,
    ADD_ROLE_SUCCESS,
    ADD_ROLE_ABILITIES,
    ADD_ROLE_ABILITIES_FAILURE,
    ADD_ROLE_ABILITIES_SUCCESS,
    DELETE_ROLE,
    DELETE_ROLE_FAILURE,
    DELETE_ROLE_SUCCESS,
    GET_ALL_ROLES,
    GET_ALL_ROLES_FAILURE,
    GET_ALL_ROLES_SUCCESS,
    UPDATE_ROLE,
    UPDATE_ROLE_FAILURE,
    UPDATE_ROLE_SUCCESS
} from './constants';

const initialState = {
    isLoading: false,
    errors: {},
    roleResponse: '',
    allRoles: []
};

export default function rolesReducer(state = initialState, action) {
    switch (action.type) {
    // TRIGGERING ACTIONS
    case GET_ALL_ROLES:
    case ADD_ROLE:
    case ADD_ROLE_ABILITIES:
    case UPDATE_ROLE:
    case DELETE_ROLE:
        return {
            ...state,
            isLoading: true
        };

        // SUCCESS ACTIONS
    case ADD_ROLE_SUCCESS:
    case ADD_ROLE_ABILITIES_SUCCESS:
    case UPDATE_ROLE_SUCCESS:
    case DELETE_ROLE_SUCCESS:
        return {
            ...state,
            isLoading: false,
            roleResponse: action.payload,
            errors: {}
        };

    case GET_ALL_ROLES_SUCCESS:
        return {
            ...state,
            isLoading: false,
            allRoles: action.payload,
        };

        // FAILURE ACTIONS
    case GET_ALL_ROLES_FAILURE:
    case ADD_ROLE_FAILURE:
    case ADD_ROLE_ABILITIES_FAILURE:
    case UPDATE_ROLE_FAILURE:
    case DELETE_ROLE_FAILURE:
        return {
            ...state,
            isLoading: false,
            roleResponse: '',
            errors: action.errors
        };

    default:
        return state;
    }
}
