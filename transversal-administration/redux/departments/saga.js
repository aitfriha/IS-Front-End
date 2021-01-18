import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
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

import ENDPOINTS from '../../../app/api/endpoints';

function* addDepartment(action) {
    try {
        const { department } = action;

        const request = yield axios({
            method: 'post',
            url: ENDPOINTS.ADMINISTRATION.DEPARTMENT + '/add',
            data: department
        });

        yield put({
            type: ADD_DEPARTMENT_SUCCESS,
            payload: request.data.payload
        });
    } catch (errors) {
        yield put({
            type: ADD_DEPARTMENT_FAILURE,
            errors: errors.response.data.errors
        });
    }
}


function* updateDepartment(action) {
    try {
        const {
            departmentWithId
        } = action;

        const request = yield axios({
            method: 'post',
            url: ENDPOINTS.ADMINISTRATION.DEPARTMENT + '/update',
            data: departmentWithId
        });

        yield put({
            type: UPDATE_DEPARTMENT_SUCCESS,
            payload: request.data.payload
        });
    } catch (errors) {
        yield put({
            type: UPDATE_DEPARTMENT_FAILURE,
            errors: errors.response.data.errors
        });
    }
}

function* deleteDepartment(action) {
    try {
        const {
            departmentId
        } = action;

        const request = yield axios({
            method: 'delete',
            url: ENDPOINTS.ADMINISTRATION.DEPARTMENT + '/delete/' + departmentId
        });

        yield put({
            type: DELETE_DEPARTMENT_SUCCESS,
            payload: request.data.payload
        });
    } catch (errors) {
        yield put({
            type: DELETE_DEPARTMENT_FAILURE,
            errors: errors.response.data.errors
        });
    }
}


function* getAllDepartments() {
    try {
        const request = yield axios({
            method: 'get',
            url: ENDPOINTS.ADMINISTRATION.DEPARTMENT + '/all'
        });

        yield put({
            type: GET_ALL_DEPARTMENTS_SUCCESS,
            payload: request.data.payload
        });
    } catch (errors) {
        yield put({
            type: GET_ALL_DEPARTMENTS_FAILURE,
            errors: errors.response.data.errors
        });
    }
}

export default function* departmentsSaga() {
    yield all([
        takeLatest(ADD_DEPARTMENT, addDepartment),
        takeLatest(UPDATE_DEPARTMENT, updateDepartment),
        takeLatest(DELETE_DEPARTMENT, deleteDepartment),
        takeLatest(GET_ALL_DEPARTMENTS, getAllDepartments),
    ]);
}
