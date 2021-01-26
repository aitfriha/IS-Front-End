import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {

  GET_CURRENCY_TYPES,
  GET_CURRENCY_TYPES_FAILURE,
  GET_CURRENCY_TYPES_SUCCESS,

} from './constants';

import ENDPOINTS from '../../api/endpoints';


function* getCurrencyTypes() {
  try {
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.CURRENCY_TYPE + '/all'
    });

    yield put({
      type: GET_CURRENCY_TYPES_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_CURRENCY_TYPES_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* currencyTypeSaga() {
  yield all([
    takeLatest(GET_CURRENCY_TYPES, getCurrencyTypes)
  ]);
}
