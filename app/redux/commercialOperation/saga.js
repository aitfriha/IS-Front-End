import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  ADD_COMMERCIALOPERATION,
  ADD_COMMERCIALOPERATION_FAILURE,
  ADD_COMMERCIALOPERATION_SUCCESS,
  DELETE_COMMERCIALOPERATION,
  DELETE_COMMERCIALOPERATION_FAILURE,
  DELETE_COMMERCIALOPERATION_SUCCESS,
  GET_ALL_COMMERCIALOPERATIONS,
  GET_ALL_COMMERCIALOPERATIONS_FAILURE,
  GET_ALL_COMMERCIALOPERATIONS_SUCCESS,
  UPDATE_COMMERCIALOPERATION,
  UPDATE_COMMERCIALOPERATION_FAILURE,
  UPDATE_COMMERCIALOPERATION_SUCCESS
} from './constants';

import ENDPOINTS from '../../api/endpoints';


function* addCommercialOperation(action) {
  try {
    const { commercialOperation } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.COMMERCIALOPERATION + '/add',
      data: commercialOperation,
    });

    yield put({
      type: ADD_COMMERCIALOPERATION_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_COMMERCIALOPERATION_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* updateCommercialOperation(action) {
  try {
    const {
      commercialOperationWithId
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.COMMERCIALOPERATION + '/update',
      data: commercialOperationWithId
    });

    yield put({
      type: UPDATE_COMMERCIALOPERATION_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_COMMERCIALOPERATION_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteCommercialOperation(action) {
  try {
    const {
      commercialOperationId
    } = action;

    const request = yield axios({
      method: 'delete',
      url: ENDPOINTS.COMMERCIALOPERATION + '/delete/' + commercialOperationId
    });

    yield put({
      type: DELETE_COMMERCIALOPERATION_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_COMMERCIALOPERATION_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* getAllCommercialOperation() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.COMMERCIALOPERATION + '/all'
    });
    yield put({
      type: GET_ALL_COMMERCIALOPERATIONS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_COMMERCIALOPERATIONS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* commercialOperationSaga() {
  yield all([
    takeLatest(ADD_COMMERCIALOPERATION, addCommercialOperation),
    takeLatest(UPDATE_COMMERCIALOPERATION, updateCommercialOperation),
    takeLatest(DELETE_COMMERCIALOPERATION, deleteCommercialOperation),
    takeLatest(GET_ALL_COMMERCIALOPERATIONS, getAllCommercialOperation),
  ]);
}
