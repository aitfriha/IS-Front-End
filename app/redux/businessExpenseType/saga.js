import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {

  ADD_BUSINESS_EXPENSE_TYPE,
  ADD_BUSINESS_EXPENSE_TYPE_FAILURE,
  ADD_BUSINESS_EXPENSE_TYPE_SUCCESS,

  UPDATE_BUSINESS_EXPENSE_TYPE,
  UPDATE_BUSINESS_EXPENSE_TYPE_FAILURE,
  UPDATE_BUSINESS_EXPENSE_TYPE_SUCCESS,

  DELETE_BUSINESS_EXPENSE_TYPE,
  DELETE_BUSINESS_EXPENSE_TYPE_FAILURE,
  DELETE_BUSINESS_EXPENSE_TYPE_SUCCESS,

  GET_BUSINESS_EXPENSES_TYPES,
  GET_BUSINESS_EXPENSES_TYPES_FAILURE,
  GET_BUSINESS_EXPENSES_TYPES_SUCCESS,

  ADD_BUSINESS_EXPENSE_SUBTYPE,
  ADD_BUSINESS_EXPENSE_SUBTYPE_FAILURE,
  ADD_BUSINESS_EXPENSE_SUBTYPE_SUCCESS,

  UPDATE_BUSINESS_EXPENSE_SUBTYPE,
  UPDATE_BUSINESS_EXPENSE_SUBTYPE_FAILURE,
  UPDATE_BUSINESS_EXPENSE_SUBTYPE_SUCCESS,

  DELETE_BUSINESS_EXPENSE_SUBTYPE,
  DELETE_BUSINESS_EXPENSE_SUBTYPE_FAILURE,
  DELETE_BUSINESS_EXPENSE_SUBTYPE_SUCCESS,

} from './constants';

import ENDPOINTS from '../../api/endpoints';


function* addBusinessExpenseType(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.BUSINESS_EXPENSE_TYPES + '/addType',
      data
    });

    yield put({
      type: ADD_BUSINESS_EXPENSE_TYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_BUSINESS_EXPENSE_TYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* updateBusinessExpenseType(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.BUSINESS_EXPENSE_TYPES + '/updateType',
      data
    });

    yield put({
      type: UPDATE_BUSINESS_EXPENSE_TYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_BUSINESS_EXPENSE_TYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteBusinessExpenseType(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'delete',
      url: ENDPOINTS.BUSINESS_EXPENSE_TYPES + '/deleteType/' + data
    });

    yield put({
      type: DELETE_BUSINESS_EXPENSE_TYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_BUSINESS_EXPENSE_TYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* addBusinessExpenseSubtype(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.BUSINESS_EXPENSE_TYPES + '/addSubtype',
      data
    });

    yield put({
      type: ADD_BUSINESS_EXPENSE_SUBTYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_BUSINESS_EXPENSE_SUBTYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* updateBusinessExpenseSubtype(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.BUSINESS_EXPENSE_TYPES + '/updateSubtype',
      data
    });

    yield put({
      type: UPDATE_BUSINESS_EXPENSE_SUBTYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_BUSINESS_EXPENSE_SUBTYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteBusinessExpenseSubtype(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.BUSINESS_EXPENSE_TYPES + '/deleteSubtype',
      data
    });

    yield put({
      type: DELETE_BUSINESS_EXPENSE_SUBTYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_BUSINESS_EXPENSE_SUBTYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getBusinessExpensesTypes() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.BUSINESS_EXPENSE_TYPES + '/all'

    });
    yield put({
      type: GET_BUSINESS_EXPENSES_TYPES_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_BUSINESS_EXPENSES_TYPES_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


export default function* businessExpenseTypesSaga() {
  yield all([
    takeLatest(ADD_BUSINESS_EXPENSE_TYPE, addBusinessExpenseType),
    takeLatest(UPDATE_BUSINESS_EXPENSE_TYPE, updateBusinessExpenseType),
    takeLatest(DELETE_BUSINESS_EXPENSE_TYPE, deleteBusinessExpenseType),
    takeLatest(GET_BUSINESS_EXPENSES_TYPES, getBusinessExpensesTypes),
    takeLatest(ADD_BUSINESS_EXPENSE_SUBTYPE, addBusinessExpenseSubtype),
    takeLatest(UPDATE_BUSINESS_EXPENSE_SUBTYPE, updateBusinessExpenseSubtype),
    takeLatest(DELETE_BUSINESS_EXPENSE_SUBTYPE, deleteBusinessExpenseSubtype)
  ]);
}
