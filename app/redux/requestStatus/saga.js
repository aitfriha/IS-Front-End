import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {

  ADD_REQUEST_STATUS,
  ADD_REQUEST_STATUS_FAILURE,
  ADD_REQUEST_STATUS_SUCCESS,

  UPDATE_REQUEST_STATUS,
  UPDATE_REQUEST_STATUS_FAILURE,
  UPDATE_REQUEST_STATUS_SUCCESS,

  DELETE_REQUEST_STATUS,
  DELETE_REQUEST_STATUS_FAILURE,
  DELETE_REQUEST_STATUS_SUCCESS,

  GET_ALL_REQUEST_STATUS,
  GET_ALL_REQUEST_STATUS_FAILURE,
  GET_ALL_REQUEST_STATUS_SUCCESS

} from './constants';

import ENDPOINTS from '../../api/endpoints';


function* addRequestStatus(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.REQUEST_STATUS + '/add',
      data
    });

    yield put({
      type: ADD_REQUEST_STATUS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_REQUEST_STATUS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* updateRequestStatus(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.REQUEST_STATUS + '/update',
      data
    });

    yield put({
      type: UPDATE_REQUEST_STATUS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_REQUEST_STATUS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteRequestStatus(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'delete',
      url: ENDPOINTS.REQUEST_STATUS + '/delete/' + data
    });

    yield put({
      type: DELETE_REQUEST_STATUS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_REQUEST_STATUS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* getAllRequestStatus() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.REQUEST_STATUS + '/all',

    });
    yield put({
      type: GET_ALL_REQUEST_STATUS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_REQUEST_STATUS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* requestStatusSaga() {
  yield all([
    takeLatest(ADD_REQUEST_STATUS, addRequestStatus),
    takeLatest(UPDATE_REQUEST_STATUS, updateRequestStatus),
    takeLatest(DELETE_REQUEST_STATUS, deleteRequestStatus),
    takeLatest(GET_ALL_REQUEST_STATUS, getAllRequestStatus)
  ]);
}
