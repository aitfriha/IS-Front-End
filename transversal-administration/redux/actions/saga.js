import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
    ADD_ACTION,
    ADD_ACTION_FAILURE,
    ADD_ACTION_SUCCESS,
    DELETE_ACTION,
    DELETE_ACTION_FAILURE,
    DELETE_ACTION_SUCCESS,
    GET_ALL_ACTIONS,
    GET_ALL_ACTIONS_FAILURE,
    GET_ALL_ACTIONS_SUCCESS,
    UPDATE_ACTION,
    UPDATE_ACTION_FAILURE,
    UPDATE_ACTION_SUCCESS
} from './constants';

import ENDPOINTS from '../../../app/api/endpoints';

function* addAction(action1) {
    try {
        const { action } = action1;

        const request = yield axios({
            method: 'post',
            url: ENDPOINTS.ADMINISTRATION.ACTION + '/add',
            data: action
        });

        yield put({
            type: ADD_ACTION_SUCCESS,
            payload: request.data.payload
        });
    } catch (errors) {
        yield put({
            type: ADD_ACTION_FAILURE,
            errors: errors.response.data.errors
        });
    }
}


function* updateAction(action) {
    try {
        const {
            actionWithId
        } = action;

        const request = yield axios({
            method: 'post',
            url: ENDPOINTS.ADMINISTRATION.ACTION + '/update',
            data: actionWithId
        });

        yield put({
            type: UPDATE_ACTION_SUCCESS,
            payload: request.data.payload
        });
    } catch (errors) {
        yield put({
            type: UPDATE_ACTION_FAILURE,
            errors: errors.response.data.errors
        });
    }
}

function* deleteAction(action) {
    try {
        const {
            actionId
        } = action;

        const request = yield axios({
            method: 'delete',
            url: ENDPOINTS.ADMINISTRATION.ACTION + '/delete/' + actionId
        });

        yield put({
            type: DELETE_ACTION_SUCCESS,
            payload: request.data.payload
        });
    } catch (errors) {
        yield put({
            type: DELETE_ACTION_FAILURE,
            errors: errors.response.data.errors
        });
    }
}


function* getAllActions() {
    try {
        const request = yield axios({
            method: 'get',
            url: ENDPOINTS.ADMINISTRATION.ACTION + '/all'
        });

        yield put({
            type: GET_ALL_ACTIONS_SUCCESS,
            payload: request.data.payload
        });
    } catch (errors) {
        yield put({
            type: GET_ALL_ACTIONS_FAILURE,
            errors: errors.response.data.errors
        });
    }
}

export default function* actionsSaga() {
    yield all([
        takeLatest(ADD_ACTION, addAction),
        takeLatest(UPDATE_ACTION, updateAction),
        takeLatest(DELETE_ACTION, deleteAction),
        takeLatest(GET_ALL_ACTIONS, getAllActions),
    ]);
}
