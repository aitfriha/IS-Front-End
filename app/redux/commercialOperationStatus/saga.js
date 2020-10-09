import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  ADD_COMMERCIALOPERATIONSTATUS,
  ADD_COMMERCIALOPERATIONSTATUS_FAILURE,
  ADD_COMMERCIALOPERATIONSTATUS_SUCCESS,
  DELETE_COMMERCIALOPERATIONSTATUS,
  DELETE_COMMERCIALOPERATIONSTATUS_FAILURE,
  DELETE_COMMERCIALOPERATIONSTATUS_SUCCESS,
  GET_ALL_COMMERCIALOPERATIONSTATUSS,
  GET_ALL_COMMERCIALOPERATIONSTATUSS_FAILURE,
  GET_ALL_COMMERCIALOPERATIONSTATUSS_SUCCESS,
  UPDATE_COMMERCIALOPERATIONSTATUS,
  UPDATE_COMMERCIALOPERATIONSTATUS_FAILURE,
  UPDATE_COMMERCIALOPERATIONSTATUS_SUCCESS
} from './constants';

import ENDPOINTS from '../../api/endpoints';


function* addCommercialOperationStatus(action) {
  try {
    const { commercialOperationStatus } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.COMMERCIALOPERATIONSTATUS + '/add',
      data: commercialOperationStatus,
    });

    yield put({
      type: ADD_COMMERCIALOPERATIONSTATUS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_COMMERCIALOPERATIONSTATUS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* updateCommercialOperationStatus(action) {
  try {
    const {
      commercialOperationStatusWithId
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.COMMERCIALOPERATIONSTATUS + '/update',
      data: commercialOperationStatusWithId
    });

    yield put({
      type: UPDATE_COMMERCIALOPERATIONSTATUS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_COMMERCIALOPERATIONSTATUS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteCommercialOperationStatus(action) {
  try {
    const {
      commercialOperationStatusId
    } = action;

    const request = yield axios({
      method: 'delete',
      url: ENDPOINTS.COMMERCIALOPERATIONSTATUS + '/delete/' + commercialOperationStatusId
    });

    yield put({
      type: DELETE_COMMERCIALOPERATIONSTATUS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_COMMERCIALOPERATIONSTATUS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* getAllCommercialOperationStatus() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.COMMERCIALOPERATIONSTATUS + '/all'
    });
    yield put({
      type: GET_ALL_COMMERCIALOPERATIONSTATUSS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_COMMERCIALOPERATIONSTATUSS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* commercialOperationStatusSaga() {
  yield all([
    takeLatest(ADD_COMMERCIALOPERATIONSTATUS, addCommercialOperationStatus),
    takeLatest(UPDATE_COMMERCIALOPERATIONSTATUS, updateCommercialOperationStatus),
    takeLatest(DELETE_COMMERCIALOPERATIONSTATUS, deleteCommercialOperationStatus),
    takeLatest(GET_ALL_COMMERCIALOPERATIONSTATUSS, getAllCommercialOperationStatus),
  ]);
}
