import {
    ADD_MACHINE,
    ADD_MACHINE_FAILURE,
    ADD_MACHINE_SUCCESS,
    DELETE_MACHINE,
    DELETE_MACHINE_FAILURE,
    DELETE_MACHINE_SUCCESS,
    GET_ALL_MACHINES,
    GET_ALL_MACHINES_FAILURE,
    GET_ALL_MACHINES_SUCCESS,
    UPDATE_MACHINE,
    UPDATE_MACHINE_FAILURE,
    UPDATE_MACHINE_SUCCESS
} from './constants';

const initialState = {
    isLoading: false,
    errors: {},
    machineResponse: '',
    allMachines: []
};

export default function machinesReducer(state = initialState, action) {
    switch (action.type) {
    // TRIGGERING ACTIONS
    case GET_ALL_MACHINES:
    case ADD_MACHINE:
    case UPDATE_MACHINE:
    case DELETE_MACHINE:
        return {
            ...state,
            isLoading: true
        };

        // SUCCESS ACTIONS
    case ADD_MACHINE_SUCCESS:
    case UPDATE_MACHINE_SUCCESS:
    case DELETE_MACHINE_SUCCESS:
        return {
            ...state,
            isLoading: false,
            machineResponse: action.payload,
            errors: {}
        };

    case GET_ALL_MACHINES_SUCCESS:
        return {
            ...state,
            isLoading: false,
            allMachines: action.payload,
        };

        // FAILURE ACTIONS
    case GET_ALL_MACHINES_FAILURE:
    case ADD_MACHINE_FAILURE:
    case UPDATE_MACHINE_FAILURE:
    case DELETE_MACHINE_FAILURE:
        return {
            ...state,
            isLoading: false,
            machineResponse: '',
            errors: action.errors
        };

    default:
        return state;
    }
}
