import {
    ADD_DEPARTMENT,
    ADD_DEPARTMENT_FAILURE,
    ADD_DEPARTMENT_SUCCESS,
    DELETE_DEPARTMENT,
    DELETE_DEPARTMENT_FAILURE,
    DELETE_DEPARTMENT_SUCCESS,
    GET_ALL_DEPARTMENTS,
    GET_ALL_DEPARTMENTS_FAILURE,
    GET_ALL_DEPARTMENTS_SUCCESS,
    UPDATE_DEPARTMENT,
    UPDATE_DEPARTMENT_FAILURE,
    UPDATE_DEPARTMENT_SUCCESS
} from './constants';

const initialState = {
    isLoading: false,
    errors: {},
    departmentResponse: '',
    allDepartments: []
};

export default function departmentsReducer(state = initialState, action) {
    switch (action.type) {
    // TRIGGERING ACTIONS
    case GET_ALL_DEPARTMENTS:
    case ADD_DEPARTMENT:
    case UPDATE_DEPARTMENT:
    case DELETE_DEPARTMENT:
        return {
            ...state,
            isLoading: true
        };

        // SUCCESS ACTIONS
    case ADD_DEPARTMENT_SUCCESS:
    case UPDATE_DEPARTMENT_SUCCESS:
    case DELETE_DEPARTMENT_SUCCESS:
        return {
            ...state,
            isLoading: false,
            departmentResponse: action.payload,
            errors: {}
        };

    case GET_ALL_DEPARTMENTS_SUCCESS:
        return {
            ...state,
            isLoading: false,
            allDepartments: action.payload,
        };

        // FAILURE ACTIONS
    case GET_ALL_DEPARTMENTS_FAILURE:
    case ADD_DEPARTMENT_FAILURE:
    case UPDATE_DEPARTMENT_FAILURE:
    case DELETE_DEPARTMENT_FAILURE:
        return {
            ...state,
            isLoading: false,
            departmentResponse: '',
            errors: action.errors
        };

    default:
        return state;
    }
}
