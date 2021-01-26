import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {

  ADD_EXPENSE_EMAIL_ADDRESS,
  ADD_EXPENSE_EMAIL_ADDRESS_FAILURE,
  ADD_EXPENSE_EMAIL_ADDRESS_SUCCESS,

  UPDATE_EXPENSE_EMAIL_ADDRESS,
  UPDATE_EXPENSE_EMAIL_ADDRESS_FAILURE,
  UPDATE_EXPENSE_EMAIL_ADDRESS_SUCCESS,

  DELETE_EXPENSE_EMAIL_ADDRESS,
  DELETE_EXPENSE_EMAIL_ADDRESS_FAILURE,
  DELETE_EXPENSE_EMAIL_ADDRESS_SUCCESS,

  GET_ALL_EXPENSE_EMAIL_ADDRESSES,
  GET_ALL_EXPENSE_EMAIL_ADDRESSES_FAILURE,
  GET_ALL_EXPENSE_EMAIL_ADDRESSES_SUCCESS


} from './constants';

import ENDPOINTS from '../../api/endpoints';

function* addExpenseEmailAddress(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.EXPENSE_EMAIL_ADDRESS + '/add',
      data
    });

    yield put({
      type: ADD_EXPENSE_EMAIL_ADDRESS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_EXPENSE_EMAIL_ADDRESS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* updateExpenseEmailAddress(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.EXPENSE_EMAIL_ADDRESS + '/update',
      data
    });

    yield put({
      type: UPDATE_EXPENSE_EMAIL_ADDRESS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_EXPENSE_EMAIL_ADDRESS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteExpenseEmailAddress(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'delete',
      url: ENDPOINTS.EXPENSE_EMAIL_ADDRESS + '/delete/' + data
    });

    yield put({
      type: DELETE_EXPENSE_EMAIL_ADDRESS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_EXPENSE_EMAIL_ADDRESS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* getAllExpenseEmailAddresses() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.EXPENSE_EMAIL_ADDRESS + '/all',

    });
    yield put({
      type: GET_ALL_EXPENSE_EMAIL_ADDRESSES_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_EXPENSE_EMAIL_ADDRESSES_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


export default function* staffExpensesConfigSaga() {
  yield all([
    takeLatest(ADD_EXPENSE_EMAIL_ADDRESS, addExpenseEmailAddress),
    takeLatest(UPDATE_EXPENSE_EMAIL_ADDRESS, updateExpenseEmailAddress),
    takeLatest(DELETE_EXPENSE_EMAIL_ADDRESS, deleteExpenseEmailAddress),
    takeLatest(GET_ALL_EXPENSE_EMAIL_ADDRESSES, getAllExpenseEmailAddresses)
  ]);
}
