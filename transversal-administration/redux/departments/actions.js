import {
    ADD_DEPARTMENT,
    DELETE_DEPARTMENT,
    GET_ALL_DEPARTMENTS,
    UPDATE_DEPARTMENT

} from './constants';

export const addDepartment = (department) => ({
    type: ADD_DEPARTMENT,
    department
});
export const updateDepartment = (departmentWithId) => ({
    type: UPDATE_DEPARTMENT,
    departmentWithId
});

export const deleteDepartment = (departmentId) => ({
    type: DELETE_DEPARTMENT,
    departmentId
});

export const getAllDepartments = () => ({
    type: GET_ALL_DEPARTMENTS,
});
