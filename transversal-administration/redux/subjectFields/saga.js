import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
    ADD_SUBJECT_FIELD,
    ADD_SUBJECT_FIELD_FAILURE,
    ADD_SUBJECT_FIELD_SUCCESS,
    DELETE_SUBJECT_FIELD,
    DELETE_SUBJECT_FIELD_FAILURE,
    DELETE_SUBJECT_FIELD_SUCCESS,
    GET_ALL_SUBJECT_FIELDS,
    GET_ALL_SUBJECT_FIELDS_FAILURE,
    GET_ALL_SUBJECT_FIELDS_SUCCESS,
    UPDATE_SUBJECT_FIELD,
    UPDATE_SUBJECT_FIELD_FAILURE,
    UPDATE_SUBJECT_FIELD_SUCCESS
} from './constants';

import ENDPOINTS from '../../../app/api/endpoints';

function* addSubjectField(action) {
    try {
        const { subject } = action;

        const request = yield axios({
            method: 'post',
            url: ENDPOINTS.ADMINISTRATION.SUBJECT_FIELD + '/add',
            data: subject
        });

        yield put({
            type: ADD_SUBJECT_FIELD_SUCCESS,
            payload: request.data.payload
        });
    } catch (errors) {
        yield put({
            type: ADD_SUBJECT_FIELD_FAILURE,
            errors: errors.response.data.errors
        });
    }
}


function* updateSubjectField(action) {
    try {
        const {
            subjectWithId
        } = action;

        const request = yield axios({
            method: 'post',
            url: ENDPOINTS.ADMINISTRATION.SUBJECT_FIELD + '/update',
            data: subjectWithId
        });

        yield put({
            type: UPDATE_SUBJECT_FIELD_SUCCESS,
            payload: request.data.payload
        });
    } catch (errors) {
        yield put({
            type: UPDATE_SUBJECT_FIELD_FAILURE,
            errors: errors.response.data.errors
        });
    }
}

function* deleteSubjectField(action) {
    try {
        const {
            subjectId
        } = action;

        const request = yield axios({
            method: 'delete',
            url: ENDPOINTS.ADMINISTRATION.SUBJECT_FIELD + '/delete/' + subjectId
        });

        yield put({
            type: DELETE_SUBJECT_FIELD_SUCCESS,
            payload: request.data.payload
        });
    } catch (errors) {
        yield put({
            type: DELETE_SUBJECT_FIELD_FAILURE,
            errors: errors.response.data.errors
        });
    }
}


function* getAllSubjectFields() {
    try {
        const request = yield axios({
            method: 'get',
            url: ENDPOINTS.ADMINISTRATION.SUBJECT_FIELD + '/all'
        });

        yield put({
            type: GET_ALL_SUBJECT_FIELDS_SUCCESS,
            payload: request.data.payload
        });
    } catch (errors) {
        yield put({
            type: GET_ALL_SUBJECT_FIELDS_FAILURE,
            errors: errors.response.data.errors
        });
    }
}

export default function* subjectFieldsSaga() {
    yield all([
        takeLatest(ADD_SUBJECT_FIELD, addSubjectField),
        takeLatest(UPDATE_SUBJECT_FIELD, updateSubjectField),
        takeLatest(DELETE_SUBJECT_FIELD, deleteSubjectField),
        takeLatest(GET_ALL_SUBJECT_FIELDS, getAllSubjectFields),
    ]);
}
