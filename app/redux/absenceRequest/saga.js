import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  ADD_ABSENCEREQUEST,
  ADD_ABSENCEREQUEST_FAILURE,
  ADD_ABSENCEREQUEST_SUCCESS,
  DELETE_ABSENCEREQUEST,
  DELETE_ABSENCEREQUEST_FAILURE,
  DELETE_ABSENCEREQUEST_SUCCESS,
  GET_ALL_ABSENCEREQUESTS,
  GET_ALL_ABSENCEREQUESTS_FAILURE,
  GET_ALL_ABSENCEREQUESTS_SUCCESS,
  UPDATE_ABSENCEREQUEST,
  UPDATE_ABSENCEREQUEST_FAILURE,
  UPDATE_ABSENCEREQUEST_SUCCESS
} from './constants';

import ENDPOINTS from '../../api/endpoints';

function* saveAbsenceRequest(action) {
  try {
    const { absenceRequest } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.ABSENCEREQUEST + '/add',
      data: absenceRequest
    });

    yield put({
      type: ADD_ABSENCEREQUEST_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_ABSENCEREQUEST_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* updateAbsenceRequest(action) {
  try {
    const { absenceRequestWithId } = action;

    const request = yield axios({
      method: 'put',
      url: ENDPOINTS.ABSENCEREQUEST + '/update',
      data: absenceRequestWithId
    });

    yield put({
      type: UPDATE_ABSENCEREQUEST_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_ABSENCEREQUEST_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteAbsenceRequest(action) {
  try {
    const { absenceRequestId } = action;

    const request = yield axios({
      method: 'delete',
      url: ENDPOINTS.ABSENCEREQUEST + '/delete/' + absenceRequestId
    });

    yield put({
      type: DELETE_ABSENCEREQUEST_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_ABSENCEREQUEST_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllAbsenceRequest() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.ABSENCEREQUEST + '/all'
    });
    yield put({
      type: GET_ALL_ABSENCEREQUESTS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_ABSENCEREQUESTS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* absenceRequestSaga() {
  yield all([
    takeLatest(ADD_ABSENCEREQUEST, saveAbsenceRequest),
    takeLatest(UPDATE_ABSENCEREQUEST, updateAbsenceRequest),
    takeLatest(DELETE_ABSENCEREQUEST, deleteAbsenceRequest),
    takeLatest(GET_ALL_ABSENCEREQUESTS, getAllAbsenceRequest)
  ]);
}
