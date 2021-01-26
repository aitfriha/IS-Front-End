import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  GET_ALL_ASSIGNMENT_TYPES,
  GET_ALL_ASSIGNMENT_TYPES_FAILURE,
  GET_ALL_ASSIGNMENT_TYPES_SUCCESS,
  ADD_ASSIGNMENT_TYPE,
  ADD_ASSIGNMENT_TYPE_FAILURE,
  ADD_ASSIGNMENT_TYPE_SUCCESS,
  UPDATE_ASSIGNMENT_TYPE,
  UPDATE_ASSIGNMENT_TYPE_FAILURE,
  UPDATE_ASSIGNMENT_TYPE_SUCCESS,
  DELETE_ASSIGNMENT_TYPE,
  DELETE_ASSIGNMENT_TYPE_FAILURE,
  DELETE_ASSIGNMENT_TYPE_SUCCESS
} from './constants';

import ENDPOINTS from '../../api/endpoints';


function* addAssignmentType(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.ASSIGNMENT_TYPE + '/add',
      data
    });

    yield put({
      type: ADD_ASSIGNMENT_TYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_ASSIGNMENT_TYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* updateAssignmentType(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.ASSIGNMENT_TYPE + '/update',
      data
    });

    yield put({
      type: UPDATE_ASSIGNMENT_TYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_ASSIGNMENT_TYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteAssignmentType(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'delete',
      url: ENDPOINTS.ASSIGNMENT_TYPE + '/delete/' + data
    });

    yield put({
      type: DELETE_ASSIGNMENT_TYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_ASSIGNMENT_TYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllAssignmentTypes() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.ASSIGNMENT_TYPE + '/all',

    });
    yield put({
      type: GET_ALL_ASSIGNMENT_TYPES_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_ASSIGNMENT_TYPES_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* assignmentTypeSaga() {
  yield all([
    takeLatest(ADD_ASSIGNMENT_TYPE, addAssignmentType),
    takeLatest(UPDATE_ASSIGNMENT_TYPE, updateAssignmentType),
    takeLatest(DELETE_ASSIGNMENT_TYPE, deleteAssignmentType),
    takeLatest(GET_ALL_ASSIGNMENT_TYPES, getAllAssignmentTypes)
  ]);
}
