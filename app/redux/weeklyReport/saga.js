import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  GET_SUMMARIZED_WEEKLY_REPORT,
  GET_SUMMARIZED_WEEKLY_REPORT_FAILURE,
  GET_SUMMARIZED_WEEKLY_REPORT_SUCCESS,
  GET_EXTENDED_WEEKLY_REPORT,
  GET_EXTENDED_WEEKLY_REPORT_FAILURE,
  GET_EXTENDED_WEEKLY_REPORT_SUCCESS,

  SAVE_WEEKLY_REPORT,
  SAVE_WEEKLY_REPORT_FAILURE,
  SAVE_WEEKLY_REPORT_SUCCESS
} from './constants';

import ENDPOINTS from '../../api/endpoints';

function* getSummarizedWeeklyReport(action) {
  try {
    const { data } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.WEEKLY_REPORT + '/allSummarized',
      data
    });

    yield put({
      type: GET_SUMMARIZED_WEEKLY_REPORT_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_SUMMARIZED_WEEKLY_REPORT_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getExtendedWeeklyReport(action) {
  try {
    const { data } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.WEEKLY_REPORT + '/getExtended',
      data
    });

    yield put({
      type: GET_EXTENDED_WEEKLY_REPORT_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_EXTENDED_WEEKLY_REPORT_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* saveWeeklyReport(action) {
  try {
    const { data } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.WEEKLY_REPORT + '/save',
      data
    });

    yield put({
      type: SAVE_WEEKLY_REPORT_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: SAVE_WEEKLY_REPORT_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* weeklyReportSaga() {
  yield all([
    takeLatest(GET_SUMMARIZED_WEEKLY_REPORT, getSummarizedWeeklyReport),
    takeLatest(GET_EXTENDED_WEEKLY_REPORT, getExtendedWeeklyReport),
    takeLatest(SAVE_WEEKLY_REPORT, saveWeeklyReport)
  ]);
}
