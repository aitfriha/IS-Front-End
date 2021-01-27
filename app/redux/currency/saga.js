import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {

  GET_DATA_BY_CURRENCY_TYPE,
  GET_DATA_BY_CURRENCY_TYPE_FAILURE,
  GET_DATA_BY_CURRENCY_TYPE_SUCCESS,

  GET_DATA_ASSOCIATED_WITH_CURRENCY_TYPES,
  GET_DATA_ASSOCIATED_WITH_CURRENCY_TYPES_FAILURE,
  GET_DATA_ASSOCIATED_WITH_CURRENCY_TYPES_SUCCESS

} from './constants';

import ENDPOINTS from '../../api/endpoints';


function* getDataByCurrencyType(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.CURRENCY + '/lastDataByCurrencyType/' + data
    });

    yield put({
      type: GET_DATA_BY_CURRENCY_TYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_DATA_BY_CURRENCY_TYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getDataAssociatedWithCurrencyTypes() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.CURRENCY + '/lastDataAssociatedWithCurrencyTypes',
    });

    yield put({
      type: GET_DATA_ASSOCIATED_WITH_CURRENCY_TYPES_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_DATA_ASSOCIATED_WITH_CURRENCY_TYPES_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


export default function* currencySaga() {
  yield all([
    takeLatest(GET_DATA_BY_CURRENCY_TYPE, getDataByCurrencyType),
    takeLatest(GET_DATA_ASSOCIATED_WITH_CURRENCY_TYPES, getDataAssociatedWithCurrencyTypes)
  ]);
}
