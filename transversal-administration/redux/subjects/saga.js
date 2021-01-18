import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
    ADD_SUBJECT,
    ADD_SUBJECT_FAILURE,
    ADD_SUBJECT_SUCCESS,
    DELETE_SUBJECT,
    DELETE_SUBJECT_FAILURE,
    DELETE_SUBJECT_SUCCESS,
    GET_ALL_SUBJECTS,
    GET_ALL_SUBJECTS_FAILURE,
    GET_ALL_SUBJECTS_SUCCESS,
    UPDATE_SUBJECT,
    UPDATE_SUBJECT_FAILURE,
    UPDATE_SUBJECT_SUCCESS
} from './constants';

import ENDPOINTS from '../../../app/api/endpoints';

function* addSubject(action) {
    try {
        const { subject } = action;

        const request = yield axios({
            method: 'post',
            url: ENDPOINTS.ADMINISTRATION.SUBJECT + '/add',
            data: subject
        });

        yield put({
            type: ADD_SUBJECT_SUCCESS,
            payload: request.data.payload
        });
    } catch (errors) {
        yield put({
            type: ADD_SUBJECT_FAILURE,
            errors: errors.response.data.errors
        });
    }
}


function* updateSubject(action) {
    try {
        const {
            subjectWithId
        } = action;

        const request = yield axios({
            method: 'post',
            url: ENDPOINTS.ADMINISTRATION.SUBJECT + '/update',
            data: subjectWithId
        });

        yield put({
            type: UPDATE_SUBJECT_SUCCESS,
            payload: request.data.payload
        });
    } catch (errors) {
        yield put({
            type: UPDATE_SUBJECT_FAILURE,
            errors: errors.response.data.errors
        });
    }
}

function* deleteSubject(action) {
    try {
        const {
            subjectId
        } = action;

        const request = yield axios({
            method: 'delete',
            url: ENDPOINTS.ADMINISTRATION.SUBJECT + '/delete/' + subjectId
        });

        yield put({
            type: DELETE_SUBJECT_SUCCESS,
            payload: request.data.payload
        });
    } catch (errors) {
        yield put({
            type: DELETE_SUBJECT_FAILURE,
            errors: errors.response.data.errors
        });
    }
}


function* getAllSubjects() {
    try {
        const request = yield axios({
            method: 'get',
            url: ENDPOINTS.ADMINISTRATION.SUBJECT + '/all'
        });

        yield put({
            type: GET_ALL_SUBJECTS_SUCCESS,
            payload: request.data.payload
        });
    } catch (errors) {
        yield put({
            type: GET_ALL_SUBJECTS_FAILURE,
            errors: errors.response.data.errors
        });
    }
}

export default function* subjectsSaga() {
    yield all([
        takeLatest(ADD_SUBJECT, addSubject),
        takeLatest(UPDATE_SUBJECT, updateSubject),
        takeLatest(DELETE_SUBJECT, deleteSubject),
        takeLatest(GET_ALL_SUBJECTS, getAllSubjects),
    ]);
}
