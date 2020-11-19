import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  ADD_CONTACTBYOPERATION,
  ADD_CONTACTBYOPERATION_FAILURE,
  ADD_CONTACTBYOPERATION_SUCCESS,
  DELETE_CONTACTBYOPERATION,
  DELETE_CONTACTBYOPERATION_FAILURE,
  DELETE_CONTACTBYOPERATION_SUCCESS,
  GET_ALL_CONTACTBYOPERATIONS,
  GET_ALL_CONTACTBYOPERATIONS_FAILURE,
  GET_ALL_CONTACTBYOPERATIONS_SUCCESS,
  UPDATE_CONTACTBYOPERATION,
  UPDATE_CONTACTBYOPERATION_FAILURE,
  UPDATE_CONTACTBYOPERATION_SUCCESS
} from './constants';

import ENDPOINTS from '../../api/endpoints';


function* addContactByOperation(action) {
  try {
    const { contactByOperation } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.CONTACTBYOPERATION + '/add',
      data: contactByOperation,
    });

    yield put({
      type: ADD_CONTACTBYOPERATION_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_CONTACTBYOPERATION_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* updateContactByOperation(action) {
  try {
    const {
      contactByOperationWithId
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.CONTACTBYOPERATION + '/update',
      data: contactByOperationWithId
    });

    yield put({
      type: UPDATE_CONTACTBYOPERATION_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_CONTACTBYOPERATION_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteContactByOperation(action) {
  try {
    const {
      contactByOperationId
    } = action;

    const request = yield axios({
      method: 'delete',
      url: ENDPOINTS.CONTACTBYOPERATION + '/delete/' + contactByOperationId
    });

    yield put({
      type: DELETE_CONTACTBYOPERATION_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_CONTACTBYOPERATION_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* getAllContactByOperation() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.CONTACTBYOPERATION + '/all'
    });
    yield put({
      type: GET_ALL_CONTACTBYOPERATIONS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_CONTACTBYOPERATIONS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* contactByOperationSaga() {
  yield all([
    takeLatest(ADD_CONTACTBYOPERATION, addContactByOperation),
    takeLatest(UPDATE_CONTACTBYOPERATION, updateContactByOperation),
    takeLatest(DELETE_CONTACTBYOPERATION, deleteContactByOperation),
    takeLatest(GET_ALL_CONTACTBYOPERATIONS, getAllContactByOperation),
  ]);
}
