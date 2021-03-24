import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  GET_ALL_LOGS,
  GET_ALL_LOGS_FAILURE,
  GET_ALL_LOGS_SUCCESS,
} from './constants';

import ENDPOINTS from '../../../app/api/endpoints';

function* getAllLogs() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.ADMINISTRATION.LOG + '/all'
    });

    yield put({
      type: GET_ALL_LOGS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_LOGS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* logsSaga() {
  yield all([
    takeLatest(GET_ALL_LOGS, getAllLogs),
  ]);
}
