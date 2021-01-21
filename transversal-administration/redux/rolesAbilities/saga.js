import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
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

import ENDPOINTS from '../../../app/api/endpoints';

function* addRole(action) {
    try {
        const { role } = action;

        const request = yield axios({
            method: 'post',
            url: ENDPOINTS.ADMINISTRATION.ROLE + '/add',
            data: role
        });

        yield put({
            type: ADD_ROLE_SUCCESS,
            payload: request.data.payload
        });
    } catch (errors) {
        yield put({
            type: ADD_ROLE_FAILURE,
            errors: errors.response.data.errors
        });
    }
}

function* addRoleAbilities(action) {
    try {
        const { roleAbilities } = action;

        const request = yield axios({
            method: 'post',
            url: ENDPOINTS.ADMINISTRATION.ROLE + '/addAbilities',
            data: roleAbilities
        });

        yield put({
            type: ADD_ROLE_ABILITIES_SUCCESS,
            payload: request.data.payload
        });
    } catch (errors) {
        yield put({
            type: ADD_ROLE_ABILITIES_FAILURE,
            errors: errors.response.data.errors
        });
    }
}


function* updateRole(action) {
    try {
        const {
            roleWithId
        } = action;

        console.log(roleWithId);

        const request = yield axios({
            method: 'post',
            url: ENDPOINTS.ADMINISTRATION.ROLE + '/update',
            data: roleWithId
        });

        yield put({
            type: UPDATE_ROLE_SUCCESS,
            payload: request.data.payload
        });
    } catch (errors) {
        yield put({
            type: UPDATE_ROLE_FAILURE,
            errors: errors.response.data.errors
        });
    }
}

function* deleteRole(action) {
    try {
        const {
            roleId
        } = action;

        const request = yield axios({
            method: 'delete',
            url: ENDPOINTS.ADMINISTRATION.ROLE + '/delete/' + roleId
        });

        yield put({
            type: DELETE_ROLE_SUCCESS,
            payload: request.data.payload
        });
    } catch (errors) {
        yield put({
            type: DELETE_ROLE_FAILURE,
            errors: errors.response.data.errors
        });
    }
}


function* getAllRoles() {
    try {
        const request = yield axios({
            method: 'get',
            url: ENDPOINTS.ADMINISTRATION.ROLE + '/all'
        });

        yield put({
            type: GET_ALL_ROLES_SUCCESS,
            payload: request.data.payload
        });
    } catch (errors) {
        yield put({
            type: GET_ALL_ROLES_FAILURE,
            errors: errors.response.data.errors
        });
    }
}

export default function* rolesSaga() {
    yield all([
        takeLatest(ADD_ROLE, addRole),
        takeLatest(ADD_ROLE_ABILITIES, addRoleAbilities),
        takeLatest(UPDATE_ROLE, updateRole),
        takeLatest(DELETE_ROLE, deleteRole),
        takeLatest(GET_ALL_ROLES, getAllRoles),
    ]);
}
