import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {

  ADD_STAFF_EXPENSE_TYPE,
  ADD_STAFF_EXPENSE_TYPE_FAILURE,
  ADD_STAFF_EXPENSE_TYPE_SUCCESS,

  UPDATE_STAFF_EXPENSE_TYPE,
  UPDATE_STAFF_EXPENSE_TYPE_FAILURE,
  UPDATE_STAFF_EXPENSE_TYPE_SUCCESS,

  DELETE_STAFF_EXPENSE_TYPE,
  DELETE_STAFF_EXPENSE_TYPE_FAILURE,
  DELETE_STAFF_EXPENSE_TYPE_SUCCESS,

  GET_STAFF_EXPENSES_TYPES,
  GET_STAFF_EXPENSES_TYPES_FAILURE,
  GET_STAFF_EXPENSES_TYPES_SUCCESS,

  ADD_STAFF_EXPENSE_SUBTYPE,
  ADD_STAFF_EXPENSE_SUBTYPE_FAILURE,
  ADD_STAFF_EXPENSE_SUBTYPE_SUCCESS,

  UPDATE_STAFF_EXPENSE_SUBTYPE,
  UPDATE_STAFF_EXPENSE_SUBTYPE_FAILURE,
  UPDATE_STAFF_EXPENSE_SUBTYPE_SUCCESS,

  DELETE_STAFF_EXPENSE_SUBTYPE,
  DELETE_STAFF_EXPENSE_SUBTYPE_FAILURE,
  DELETE_STAFF_EXPENSE_SUBTYPE_SUCCESS

} from './constants';

import ENDPOINTS from '../../api/endpoints';


function* addStaffExpenseType(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.STAFF_EXPENSE_TYPES + '/addType',
      data
    });

    yield put({
      type: ADD_STAFF_EXPENSE_TYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_STAFF_EXPENSE_TYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* updateStaffExpenseType(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.STAFF_EXPENSE_TYPES + '/updateType',
      data
    });

    yield put({
      type: UPDATE_STAFF_EXPENSE_TYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_STAFF_EXPENSE_TYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteStaffExpenseType(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'delete',
      url: ENDPOINTS.STAFF_EXPENSE_TYPES + '/deleteType/' + data
    });

    yield put({
      type: DELETE_STAFF_EXPENSE_TYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_STAFF_EXPENSE_TYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* addStaffExpenseSubtype(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.STAFF_EXPENSE_TYPES + '/addSubtype',
      data
    });

    yield put({
      type: ADD_STAFF_EXPENSE_SUBTYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_STAFF_EXPENSE_SUBTYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* updateStaffExpenseSubtype(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.STAFF_EXPENSE_TYPES + '/updateSubtype',
      data
    });

    yield put({
      type: UPDATE_STAFF_EXPENSE_SUBTYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_STAFF_EXPENSE_SUBTYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteStaffExpenseSubtype(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.STAFF_EXPENSE_TYPES + '/deleteSubtype',
      data
    });

    yield put({
      type: DELETE_STAFF_EXPENSE_SUBTYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_STAFF_EXPENSE_SUBTYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getStaffExpensesTypes() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.STAFF_EXPENSE_TYPES + '/all'

    });
    yield put({
      type: GET_STAFF_EXPENSES_TYPES_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_STAFF_EXPENSES_TYPES_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


export default function* staffExpenseTypeSaga() {
  yield all([
    takeLatest(ADD_STAFF_EXPENSE_TYPE, addStaffExpenseType),
    takeLatest(UPDATE_STAFF_EXPENSE_TYPE, updateStaffExpenseType),
    takeLatest(DELETE_STAFF_EXPENSE_TYPE, deleteStaffExpenseType),
    takeLatest(GET_STAFF_EXPENSES_TYPES, getStaffExpensesTypes),
    takeLatest(ADD_STAFF_EXPENSE_SUBTYPE, addStaffExpenseSubtype),
    takeLatest(UPDATE_STAFF_EXPENSE_SUBTYPE, updateStaffExpenseSubtype),
    takeLatest(DELETE_STAFF_EXPENSE_SUBTYPE, deleteStaffExpenseSubtype)
  ]);
}
