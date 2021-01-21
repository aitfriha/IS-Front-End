import {
    ADD_ROLE,
    ADD_ROLE_ABILITIES,
    DELETE_ROLE,
    GET_ALL_ROLES,
    UPDATE_ROLE

} from './constants';

export const addRole = (role) => ({
    type: ADD_ROLE,
    role
});

export const addRoleAbilities = (roleAbilities) => ({
    type: ADD_ROLE_ABILITIES,
    roleAbilities
});
export const updateRole = (roleWithId) => ({
    type: UPDATE_ROLE,
    roleWithId
});

export const deleteRole = (roleId) => ({
    type: DELETE_ROLE,
    roleId
});

export const getAllRoles = () => ({
    type: GET_ALL_ROLES,
});
