import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  UPDATE_WEEKLY_REPORT_CONFIG,
  UPDATE_WEEKLY_REPORT_CONFIG_FAILURE,
  UPDATE_WEEKLY_REPORT_CONFIG_SUCCESS,
  GET_WEEKLY_REPORT_CONFIG,
  GET_WEEKLY_REPORT_CONFIG_FAILURE,
  GET_WEEKLY_REPORT_CONFIG_SUCCESS,
  GET_WEEKLY_REPORT_CONFIG_BY_ID,
  GET_WEEKLY_REPORT_CONFIG_BY_ID_FAILURE,
  GET_WEEKLY_REPORT_CONFIG_BY_ID_SUCCESS
} from './constants';

import ENDPOINTS from '../../api/endpoints';


function* updateWeeklyReportConfig(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.WEEKLY_REPORT_CONFIG + '/update',
      data
    });

    yield put({
      type: UPDATE_WEEKLY_REPORT_CONFIG_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_WEEKLY_REPORT_CONFIG_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getWeeklyReportConfigById(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.WEEKLY_REPORT_CONFIG + '/get/' + data

    });
    yield put({
      type: GET_WEEKLY_REPORT_CONFIG_BY_ID_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_WEEKLY_REPORT_CONFIG_BY_ID_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getWeeklyReportConfig() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.WEEKLY_REPORT_CONFIG + '/get'
    });
    yield put({
      type: GET_WEEKLY_REPORT_CONFIG_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_WEEKLY_REPORT_CONFIG_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* weeklyReportConfigSaga() {
  yield all([
    takeLatest(UPDATE_WEEKLY_REPORT_CONFIG, updateWeeklyReportConfig),
    takeLatest(GET_WEEKLY_REPORT_CONFIG_BY_ID, getWeeklyReportConfigById),
    takeLatest(GET_WEEKLY_REPORT_CONFIG, getWeeklyReportConfig)
  ]);
}
