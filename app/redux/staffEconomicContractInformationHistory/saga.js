import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  GET_ALL_STAFFECONOMICCONTRACTINFORMATIONHISTORIES,
  GET_ALL_STAFFECONOMICCONTRACTINFORMATIONHISTORIES_SUCCESS,
  GET_ALL_STAFFECONOMICCONTRACTINFORMATIONHISTORIES_FAILURE,
  GET_ALL_STAFFECONOMICCONTRACTINFORMATIONHISTORIES_BY_CONTRACT,
  GET_ALL_STAFFECONOMICCONTRACTINFORMATIONHISTORIES_BY_CONTRACT_SUCCESS,
  GET_ALL_STAFFECONOMICCONTRACTINFORMATIONHISTORIES_BY_CONTRACT_FAILURE
} from './constants';

import ENDPOINTS from '../../api/endpoints';

function* getAllStaffEconomicContractInformationHistory() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.STAFFECONOMICCONTRACTINFORMATIONHISTORY + '/all'
    });
    yield put({
      type: GET_ALL_STAFFECONOMICCONTRACTINFORMATIONHISTORIES_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_STAFFECONOMICCONTRACTINFORMATIONHISTORIES_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllStaffEconomicContractInformationHistoryByContract(action) {
  const { staffEconomicContractInformationId } = action;
  try {
    const request = yield axios({
      method: 'get',
      url:
        ENDPOINTS.STAFFECONOMICCONTRACTINFORMATIONHISTORY
        + '/history-by-staff/'
        + staffEconomicContractInformationId
    });
    yield put({
      type: GET_ALL_STAFFECONOMICCONTRACTINFORMATIONHISTORIES_BY_CONTRACT_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_STAFFECONOMICCONTRACTINFORMATIONHISTORIES_BY_CONTRACT_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* staffEconomicContractInformationHistorySaga() {
  yield all([
    takeLatest(
      GET_ALL_STAFFECONOMICCONTRACTINFORMATIONHISTORIES,
      getAllStaffEconomicContractInformationHistory
    ),
    takeLatest(
      GET_ALL_STAFFECONOMICCONTRACTINFORMATIONHISTORIES_BY_CONTRACT,
      getAllStaffEconomicContractInformationHistoryByContract
    )
  ]);
}
