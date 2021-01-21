import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  ADD_ASSIGNMENT,
  ADD_ASSIGNMENT_FAILURE,
  ADD_ASSIGNMENT_SUCCESS,
  DELETE_ASSIGNMENT,
  DELETE_ASSIGNMENT_FAILURE,
  DELETE_ASSIGNMENT_SUCCESS,
  GET_ALL_ASSIGNMENTS,
  GET_ALL_ASSIGNMENTS_FAILURE,
  GET_ALL_ASSIGNMENTS_SUCCESS,
  UPDATE_ASSIGNMENT,
  UPDATE_ASSIGNMENT_FAILURE,
  UPDATE_ASSIGNMENT_SUCCESS,

  GET_ALL_ASSIGNMENTS_BY_STAFF,
  GET_ALL_ASSIGNMENTS_BY_STAFF_SUCCESS,
  GET_ALL_ASSIGNMENTS_BY_STAFF_FAILURE
} from './constants';

import ENDPOINTS from '../../api/endpoints';


function* addAssignment(action) {
  try {
    const { assignment } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.ASSIGNMENT + '/assine',
      data: assignment,
    });

    yield put({
      type: ADD_ASSIGNMENT_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_ASSIGNMENT_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* updateAssignment(action) {
  try {
    const {
      assignmentWithId
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.ASSIGNMENT + '/update',
      data: assignmentWithId
    });

    yield put({
      type: UPDATE_ASSIGNMENT_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_ASSIGNMENT_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteAssignment(action) {
  try {
    const {
      clientId
    } = action;

    const request = yield axios({
      method: 'delete',
      url: ENDPOINTS.ASSIGNMENT + '/delete/' + clientId
    });

    yield put({
      type: DELETE_ASSIGNMENT_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_ASSIGNMENT_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* getAllAssignment() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.ASSIGNMENT + '/all'
    });
    yield put({
      type: GET_ALL_ASSIGNMENTS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_ASSIGNMENTS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAssignmentByStaff(action) {
  try {
    const {
      staffId
    } = action;
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.ASSIGNMENT + '/assignmentByStaff/' + staffId
    });
    yield put({
      type: GET_ALL_ASSIGNMENTS_BY_STAFF_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_ASSIGNMENTS_BY_STAFF_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* assignmentSaga() {
  yield all([
    takeLatest(ADD_ASSIGNMENT, addAssignment),
    takeLatest(UPDATE_ASSIGNMENT, updateAssignment),
    takeLatest(DELETE_ASSIGNMENT, deleteAssignment),
    takeLatest(GET_ALL_ASSIGNMENTS, getAllAssignment),
    takeLatest(GET_ALL_ASSIGNMENTS_BY_STAFF, getAssignmentByStaff),
  ]);
}
