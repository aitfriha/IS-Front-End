import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  GET_TRAVEL_REQUESTS,
  GET_TRAVEL_REQUESTS_FAILURE,
  GET_TRAVEL_REQUESTS_SUCCESS,

  ADD_TRAVEL_REQUEST,
  ADD_TRAVEL_REQUEST_FAILURE,
  ADD_TRAVEL_REQUEST_SUCCESS,

  UPDATE_TRAVEL_REQUEST,
  UPDATE_TRAVEL_REQUEST_FAILURE,
  UPDATE_TRAVEL_REQUEST_SUCCESS,

  CHANGE_STATUS_TRAVEL_REQUEST,
  CHANGE_STATUS_TRAVEL_REQUEST_FAILURE,
  CHANGE_STATUS_TRAVEL_REQUEST_SUCCESS,

  GET_COUNTRIES,
  GET_COUNTRIES_FAILURE,
  GET_COUNTRIES_SUCCESS,

  EXPORT_TRAVEL_REQUESTS,
  EXPORT_TRAVEL_REQUESTS_FAILURE,
  EXPORT_TRAVEL_REQUESTS_SUCCESS,

  APPROVE_TRAVEL_REQUEST,
  APPROVE_TRAVEL_REQUEST_FAILURE,
  APPROVE_TRAVEL_REQUEST_SUCCESS,

  DOWNLOAD_DOCUMENTS_OF_TRAVEL_REQUEST,
  DOWNLOAD_DOCUMENTS_OF_TRAVEL_REQUEST_FAILURE,
  DOWNLOAD_DOCUMENTS_OF_TRAVEL_REQUEST_SUCCESS
} from './constants';

import ENDPOINTS from '../../api/endpoints';

function* getTravelRequests(action) {
  try {
    const { data } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.TRAVEL_REQUEST + '/all',
      data

    });

    yield put({
      type: GET_TRAVEL_REQUESTS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_TRAVEL_REQUESTS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* addTravelRequest(action) {
  try {
    const { data } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.TRAVEL_REQUEST + '/add',
      data

    });

    yield put({
      type: ADD_TRAVEL_REQUEST_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_TRAVEL_REQUEST_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* updateTravelRequest(action) {
  try {
    const { data } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.TRAVEL_REQUEST + '/update',
      data

    });

    yield put({
      type: UPDATE_TRAVEL_REQUEST_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_TRAVEL_REQUEST_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* changeStatusTravelRequest(action) {
  try {
    const { data } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.TRAVEL_REQUEST + '/changeStatus',
      data
    });
    yield put({
      type: CHANGE_STATUS_TRAVEL_REQUEST_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: CHANGE_STATUS_TRAVEL_REQUEST_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* exportTravelRequests(action) {
  try {
    const { data } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.TRAVEL_REQUEST + '/export',
      data,
      responseType: 'blob'
    });
    yield put({
      type: EXPORT_TRAVEL_REQUESTS_SUCCESS,
      payload: request.data
    });
  } catch (errors) {
    yield put({
      type: EXPORT_TRAVEL_REQUESTS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* approveTravelRequest(action) {
  try {
    const { data } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.TRAVEL_REQUEST + '/approve',
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    yield put({
      type: APPROVE_TRAVEL_REQUEST_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: APPROVE_TRAVEL_REQUEST_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* downloadDocumentsOfTravelRequest(action) {
  try {
    const { data } = action;
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.TRAVEL_REQUEST + '/downloadDocuments/' + data,
      responseType: 'blob'
    });
    yield put({
      type: DOWNLOAD_DOCUMENTS_OF_TRAVEL_REQUEST_SUCCESS,
      payload: request.data
    });
  } catch (errors) {
    yield put({
      type: DOWNLOAD_DOCUMENTS_OF_TRAVEL_REQUEST_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


export default function* travelRequestSaga() {
  yield all([
    takeLatest(GET_TRAVEL_REQUESTS, getTravelRequests),
    takeLatest(ADD_TRAVEL_REQUEST, addTravelRequest),
    takeLatest(UPDATE_TRAVEL_REQUEST, updateTravelRequest),
    takeLatest(CHANGE_STATUS_TRAVEL_REQUEST, changeStatusTravelRequest),
    takeLatest(EXPORT_TRAVEL_REQUESTS, exportTravelRequests),
    takeLatest(APPROVE_TRAVEL_REQUEST, approveTravelRequest),
    takeLatest(DOWNLOAD_DOCUMENTS_OF_TRAVEL_REQUEST, downloadDocumentsOfTravelRequest)
  ]);
}
