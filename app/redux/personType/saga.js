import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {

  ADD_PERSON_TYPE,
  ADD_PERSON_TYPE_FAILURE,
  ADD_PERSON_TYPE_SUCCESS,

  UPDATE_PERSON_TYPE,
  UPDATE_PERSON_TYPE_FAILURE,
  UPDATE_PERSON_TYPE_SUCCESS,

  DELETE_PERSON_TYPE,
  DELETE_PERSON_TYPE_FAILURE,
  DELETE_PERSON_TYPE_SUCCESS,

  GET_ALL_PERSON_TYPES,
  GET_ALL_PERSON_TYPES_FAILURE,
  GET_ALL_PERSON_TYPES_SUCCESS


} from './constants';

import ENDPOINTS from '../../api/endpoints';


function* addPersonType(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.PERSON_TYPE + '/add',
      data
    });

    yield put({
      type: ADD_PERSON_TYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_PERSON_TYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* updatePersonType(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.PERSON_TYPE + '/update',
      data
    });

    yield put({
      type: UPDATE_PERSON_TYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_PERSON_TYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deletePersonType(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'delete',
      url: ENDPOINTS.PERSON_TYPE + '/delete/' + data
    });

    yield put({
      type: DELETE_PERSON_TYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_PERSON_TYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllPersonTypes() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.PERSON_TYPE + '/all',

    });
    yield put({
      type: GET_ALL_PERSON_TYPES_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_PERSON_TYPES_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* personTypeSaga() {
  yield all([
    takeLatest(UPDATE_PERSON_TYPE, updatePersonType),
    takeLatest(ADD_PERSON_TYPE, addPersonType),
    takeLatest(DELETE_PERSON_TYPE, deletePersonType),
    takeLatest(GET_ALL_PERSON_TYPES, getAllPersonTypes)
  ]);
}
