import {
    ADD_ACTION,
    DELETE_ACTION,
    GET_ALL_ACTIONS,
    UPDATE_ACTION

} from './constants';

export const addAction = (action) => ({
    type: ADD_ACTION,
    action
});
export const updateAction = (actionWithId) => ({
    type: UPDATE_ACTION,
    actionWithId
});

export const deleteAction = (actionId) => ({
    type: DELETE_ACTION,
    actionId
});

export const getAllActions = () => ({
    type: GET_ALL_ACTIONS,
});
