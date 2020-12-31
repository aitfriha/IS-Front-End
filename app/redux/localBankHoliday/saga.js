import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  ADD_LOCALBANKHOLIDAY,
  ADD_LOCALBANKHOLIDAY_FAILURE,
  ADD_LOCALBANKHOLIDAY_SUCCESS,
  DELETE_LOCALBANKHOLIDAY,
  DELETE_LOCALBANKHOLIDAY_FAILURE,
  DELETE_LOCALBANKHOLIDAY_SUCCESS,
  GET_ALL_LOCALBANKHOLIDAYS,
  GET_ALL_LOCALBANKHOLIDAYS_FAILURE,
  GET_ALL_LOCALBANKHOLIDAYS_SUCCESS,
  GET_ALL_LOCALBANKHOLIDAYS_BY_COMPANY,
  GET_ALL_LOCALBANKHOLIDAYS_BY_COMPANY_FAILURE,
  GET_ALL_LOCALBANKHOLIDAYS_BY_COMPANY_SUCCESS,
  UPDATE_LOCALBANKHOLIDAY,
  UPDATE_LOCALBANKHOLIDAY_FAILURE,
  UPDATE_LOCALBANKHOLIDAY_SUCCESS
} from './constants';

import ENDPOINTS from '../../api/endpoints';

function* saveLocalBankHoliday(action) {
  try {
    const { localBankHoliday } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.LOCALBANKHOLIDAY + '/add',
      data: localBankHoliday
    });

    yield put({
      type: ADD_LOCALBANKHOLIDAY_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_LOCALBANKHOLIDAY_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* updateLocalBankHoliday(action) {
  try {
    const { localBankHolidayWithId } = action;

    const request = yield axios({
      method: 'put',
      url: ENDPOINTS.LOCALBANKHOLIDAY + '/update',
      data: localBankHolidayWithId
    });

    yield put({
      type: UPDATE_LOCALBANKHOLIDAY_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_LOCALBANKHOLIDAY_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteLocalBankHoliday(action) {
  try {
    const { localBankHolidayId } = action;

    console.log(new Date().toISOString().slice(0, 10));
    const request = yield axios({
      method: 'delete',
      url: ENDPOINTS.LOCALBANKHOLIDAY + '/delete/id=' + localBankHolidayId
    });

    yield put({
      type: DELETE_LOCALBANKHOLIDAY_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_LOCALBANKHOLIDAY_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllLocalBankHoliday() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.LOCALBANKHOLIDAY + '/all'
    });
    yield put({
      type: GET_ALL_LOCALBANKHOLIDAYS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_LOCALBANKHOLIDAYS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllLocalBankHolidayByCompany(action) {
  try {
    const { companyId } = action;

    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.LOCALBANKHOLIDAY + '/all-by-company/' + companyId
    });
    console.log(request.data.payload);
    yield put({
      type: GET_ALL_LOCALBANKHOLIDAYS_BY_COMPANY_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    console.log(errors.response.data.errors);
    yield put({
      type: GET_ALL_LOCALBANKHOLIDAYS_BY_COMPANY_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* localBankHolidaySaga() {
  yield all([
    takeLatest(ADD_LOCALBANKHOLIDAY, saveLocalBankHoliday),
    takeLatest(UPDATE_LOCALBANKHOLIDAY, updateLocalBankHoliday),
    takeLatest(DELETE_LOCALBANKHOLIDAY, deleteLocalBankHoliday),
    takeLatest(GET_ALL_LOCALBANKHOLIDAYS, getAllLocalBankHoliday),
    takeLatest(
      GET_ALL_LOCALBANKHOLIDAYS_BY_COMPANY,
      getAllLocalBankHolidayByCompany
    )
  ]);
}
