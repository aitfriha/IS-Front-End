import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  GET_EXPENSES,
  GET_EXPENSES_FAILURE,
  GET_EXPENSES_SUCCESS,

  SAVE_EXPENSE,
  SAVE_EXPENSE_FAILURE,
  SAVE_EXPENSE_SUCCESS,

  SAVE_EXPENSE_WITH_FILE,
  SAVE_EXPENSE_WITH_FILE_FAILURE,
  SAVE_EXPENSE_WITH_FILE_SUCCESS,

  CHANGE_STATUS_EXPENSE,
  CHANGE_STATUS_EXPENSE_FAILURE,
  CHANGE_STATUS_EXPENSE_SUCCESS,

  EXPORT_EXPENSES,
  EXPORT_EXPENSES_FAILURE,
  EXPORT_EXPENSES_SUCCESS,

  DOWNLOAD_DOCUMENT_OF_EXPENSE,
  DOWNLOAD_DOCUMENT_OF_EXPENSE_FAILURE,
  DOWNLOAD_DOCUMENT_OF_EXPENSE_SUCCESS
} from './constants';

import ENDPOINTS from '../../api/endpoints';

function* getExpenses(action) {
  try {
    const { data } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.EXPENSE + '/all',
      data

    });

    yield put({
      type: GET_EXPENSES_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_EXPENSES_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* saveExpenseWithFile(action) {
  try {
    const { data } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.EXPENSE + '/saveWithFile',
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    yield put({
      type: SAVE_EXPENSE_WITH_FILE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: SAVE_EXPENSE_WITH_FILE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* saveExpense(action) {
  try {
    const { data } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.EXPENSE + '/save',
      data
    });

    yield put({
      type: SAVE_EXPENSE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: SAVE_EXPENSE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* changeStatusExpense(action) {
  try {
    const { data } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.EXPENSE + '/changeStatus',
      data
    });
    yield put({
      type: CHANGE_STATUS_EXPENSE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: CHANGE_STATUS_EXPENSE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* exportExpenses(action) {
  try {
    const { data } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.EXPENSE + '/export',
      data,
      responseType: 'blob'
    });
    yield put({
      type: EXPORT_EXPENSES_SUCCESS,
      payload: request.data
    });
  } catch (errors) {
    yield put({
      type: EXPORT_EXPENSES_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* downloadDocumentOfExpense(action) {
  try {
    const { data } = action;
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.EXPENSE + '/downloadDocument/' + data,
      responseType: 'blob'
    });
    yield put({
      type: DOWNLOAD_DOCUMENT_OF_EXPENSE_SUCCESS,
      payload: request.data
    });
  } catch (errors) {
    yield put({
      type: DOWNLOAD_DOCUMENT_OF_EXPENSE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


export default function* expenseSaga() {
  yield all([
    takeLatest(GET_EXPENSES, getExpenses),
    takeLatest(SAVE_EXPENSE, saveExpense),
    takeLatest(SAVE_EXPENSE_WITH_FILE, saveExpenseWithFile),
    takeLatest(CHANGE_STATUS_EXPENSE, changeStatusExpense),
    takeLatest(EXPORT_EXPENSES, exportExpenses),
    takeLatest(DOWNLOAD_DOCUMENT_OF_EXPENSE, downloadDocumentOfExpense)
  ]);
}
