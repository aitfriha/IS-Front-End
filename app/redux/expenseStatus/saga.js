import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {

  ADD_EXPENSE_STATUS,
  ADD_EXPENSE_STATUS_FAILURE,
  ADD_EXPENSE_STATUS_SUCCESS,

  UPDATE_EXPENSE_STATUS,
  UPDATE_EXPENSE_STATUS_FAILURE,
  UPDATE_EXPENSE_STATUS_SUCCESS,

  DELETE_EXPENSE_STATUS,
  DELETE_EXPENSE_STATUS_FAILURE,
  DELETE_EXPENSE_STATUS_SUCCESS,

  GET_ALL_EXPENSES_STATUS,
  GET_ALL_EXPENSES_STATUS_FAILURE,
  GET_ALL_EXPENSES_STATUS_SUCCESS


} from './constants';

import ENDPOINTS from '../../api/endpoints';


function* addExpenseStatus(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.EXPENSE_STATUS + '/add',
      data
    });

    yield put({
      type: ADD_EXPENSE_STATUS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_EXPENSE_STATUS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* updateExpenseStatus(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.EXPENSE_STATUS + '/update',
      data
    });

    yield put({
      type: UPDATE_EXPENSE_STATUS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_EXPENSE_STATUS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteExpenseStatus(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'delete',
      url: ENDPOINTS.EXPENSE_STATUS + '/delete/' + data
    });

    yield put({
      type: DELETE_EXPENSE_STATUS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_EXPENSE_STATUS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* getAllExpenseStatus() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.EXPENSE_STATUS + '/all',

    });
    yield put({
      type: GET_ALL_EXPENSES_STATUS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_EXPENSES_STATUS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


export default function* expenseStatusSaga() {
  yield all([
    takeLatest(ADD_EXPENSE_STATUS, addExpenseStatus),
    takeLatest(UPDATE_EXPENSE_STATUS, updateExpenseStatus),
    takeLatest(DELETE_EXPENSE_STATUS, deleteExpenseStatus),
    takeLatest(GET_ALL_EXPENSES_STATUS, getAllExpenseStatus)
  ]);
}
