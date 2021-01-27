import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {

  ADD_VOUCHER_TYPE,
  ADD_VOUCHER_TYPE_FAILURE,
  ADD_VOUCHER_TYPE_SUCCESS,

  UPDATE_VOUCHER_TYPE,
  UPDATE_VOUCHER_TYPE_FAILURE,
  UPDATE_VOUCHER_TYPE_SUCCESS,

  DELETE_VOUCHER_TYPE,
  DELETE_VOUCHER_TYPE_FAILURE,
  DELETE_VOUCHER_TYPE_SUCCESS,

  GET_ALL_VOUCHER_TYPES,
  GET_ALL_VOUCHER_TYPES_FAILURE,
  GET_ALL_VOUCHER_TYPES_SUCCESS


} from './constants';

import ENDPOINTS from '../../api/endpoints';


function* addVoucherType(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.VOUCHER_TYPE + '/add',
      data
    });

    yield put({
      type: ADD_VOUCHER_TYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_VOUCHER_TYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* updateVoucherType(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.VOUCHER_TYPE + '/update',
      data
    });

    yield put({
      type: UPDATE_VOUCHER_TYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_VOUCHER_TYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteVoucherType(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'delete',
      url: ENDPOINTS.VOUCHER_TYPE + '/delete/' + data
    });

    yield put({
      type: DELETE_VOUCHER_TYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_VOUCHER_TYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllVoucherTypes() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.VOUCHER_TYPE + '/all',

    });
    yield put({
      type: GET_ALL_VOUCHER_TYPES_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_VOUCHER_TYPES_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* voucherTypeSaga() {
  yield all([
    takeLatest(UPDATE_VOUCHER_TYPE, updateVoucherType),
    takeLatest(ADD_VOUCHER_TYPE, addVoucherType),
    takeLatest(DELETE_VOUCHER_TYPE, deleteVoucherType),
    takeLatest(GET_ALL_VOUCHER_TYPES, getAllVoucherTypes)
  ]);
}
