import {
    ADD_MACHINE,
    DELETE_MACHINE,
    GET_ALL_MACHINES,
    UPDATE_MACHINE

} from './constants';

export const addMachine = (machine) => ({
    type: ADD_MACHINE,
    machine
});
export const updateMachine = (machineWithId) => ({
    type: UPDATE_MACHINE,
    machineWithId
});

export const deleteMachine = (machineId) => ({
    type: DELETE_MACHINE,
    machineId
});

export const getAllMachines = () => ({
    type: GET_ALL_MACHINES,
});
