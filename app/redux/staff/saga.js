import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  ADD_STAFF,
  ADD_STAFF_FAILURE,
  ADD_STAFF_SUCCESS,
  DELETE_STAFF,
  DELETE_STAFF_FAILURE,
  DELETE_STAFF_SUCCESS,
  GET_ALL_STAFFS,
  GET_ALL_STAFFS_FAILURE,
  GET_ALL_STAFFS_SUCCESS,
  UPDATE_STAFF,
  UPDATE_STAFF_FAILURE,
  UPDATE_STAFF_SUCCESS
} from './constants';

import ENDPOINTS from '../../api/endpoints';

function* saveStaff(action) {
  try {
    const { staff } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.STAFF + '/add',
      data: staff
      /* headers: { 'Content-Type': 'multipart/form-data;boundary=----WebKitFormBoundaryQ0pBuvRC1EzDAQWT----' } */
    });

    yield put({
      type: ADD_STAFF_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_STAFF_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* updateStaff(action) {
  try {
    const { staffWithId } = action;

    const request = yield axios({
      method: 'put',
      url: ENDPOINTS.STAFF + '/update',
      data: staffWithId
    });

    yield put({
      type: UPDATE_STAFF_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_STAFF_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteStaff(action) {
  try {
    const { staffId } = action;

    const request = yield axios({
      method: 'delete',
      url: ENDPOINTS.STAFF + '/delete/' + staffId
    });

    yield put({
      type: DELETE_STAFF_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_STAFF_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllStaff() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.STAFF + '/all'
    });
    console.log(request);
    yield put({
      type: GET_ALL_STAFFS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_STAFFS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* staffSaga() {
  yield all([
    takeLatest(ADD_STAFF, saveStaff),
    takeLatest(UPDATE_STAFF, updateStaff),
    takeLatest(DELETE_STAFF, deleteStaff),
    takeLatest(GET_ALL_STAFFS, getAllStaff)
  ]);
}
