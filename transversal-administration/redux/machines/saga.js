import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
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

import ENDPOINTS from '../../../app/api/endpoints';

function* addMachine(action) {
    try {
        const { machine } = action;

        const request = yield axios({
            method: 'post',
            url: ENDPOINTS.ADMINISTRATION.MACHINE + '/add',
            data: machine
        });

        yield put({
            type: ADD_MACHINE_SUCCESS,
            payload: request.data.payload
        });
    } catch (errors) {
        yield put({
            type: ADD_MACHINE_FAILURE,
            errors: errors.response.data.errors
        });
    }
}


function* updateMachine(action) {
    try {
        const {
            machineWithId
        } = action;

        const request = yield axios({
            method: 'post',
            url: ENDPOINTS.ADMINISTRATION.MACHINE + '/update',
            data: machineWithId
        });

        yield put({
            type: UPDATE_MACHINE_SUCCESS,
            payload: request.data.payload
        });
    } catch (errors) {
        yield put({
            type: UPDATE_MACHINE_FAILURE,
            errors: errors.response.data.errors
        });
    }
}

function* deleteMachine(action) {
    try {
        const {
            machineId
        } = action;

        const request = yield axios({
            method: 'delete',
            url: ENDPOINTS.ADMINISTRATION.MACHINE + '/delete/' + machineId
        });

        yield put({
            type: DELETE_MACHINE_SUCCESS,
            payload: request.data.payload
        });
    } catch (errors) {
        yield put({
            type: DELETE_MACHINE_FAILURE,
            errors: errors.response.data.errors
        });
    }
}


function* getAllMachines() {
    try {
        const request = yield axios({
            method: 'get',
            url: ENDPOINTS.ADMINISTRATION.MACHINE + '/all'
        });

        yield put({
            type: GET_ALL_MACHINES_SUCCESS,
            payload: request.data.payload
        });
    } catch (errors) {
        yield put({
            type: GET_ALL_MACHINES_FAILURE,
            errors: errors.response.data.errors
        });
    }
}

export default function* machinesSaga() {
    yield all([
        takeLatest(ADD_MACHINE, addMachine),
        takeLatest(UPDATE_MACHINE, updateMachine),
        takeLatest(DELETE_MACHINE, deleteMachine),
        takeLatest(GET_ALL_MACHINES, getAllMachines),
    ]);
}
