import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  GET_ALL_STAFFCONTRACTHISTORIES,
  GET_ALL_STAFFCONTRACTHISTORIES_SUCCESS,
  GET_ALL_STAFFCONTRACTHISTORIES_FAILURE,
  GET_ALL_STAFFCONTRACTHISTORIES_BY_CONTRACT,
  GET_ALL_STAFFCONTRACTHISTORIES_BY_CONTRACT_SUCCESS,
  GET_ALL_STAFFCONTRACTHISTORIES_BY_CONTRACT_FAILURE
} from './constants';

import ENDPOINTS from '../../api/endpoints';

function* getAllStaffContractHistory() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.STAFFCONTRACTHISTORY + '/all'
    });
    yield put({
      type: GET_ALL_STAFFCONTRACTHISTORIES_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_STAFFCONTRACTHISTORIES_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllStaffContractHistoryByContract(action) {
  const { staffContractId } = action;
  try {
    const request = yield axios({
      method: 'get',
      url:
        ENDPOINTS.STAFFCONTRACTHISTORY + '/history-by-staff/' + staffContractId
    });
    yield put({
      type: GET_ALL_STAFFCONTRACTHISTORIES_BY_CONTRACT_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_STAFFCONTRACTHISTORIES_BY_CONTRACT_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* staffContractHistorySaga() {
  yield all([
    takeLatest(GET_ALL_STAFFCONTRACTHISTORIES, getAllStaffContractHistory),
    takeLatest(
      GET_ALL_STAFFCONTRACTHISTORIES_BY_CONTRACT,
      getAllStaffContractHistoryByContract
    )
  ]);
}
