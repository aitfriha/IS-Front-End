import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  UPDATE_STAFFCONTRACT,
  UPDATE_STAFFCONTRACT_FAILURE,
  UPDATE_STAFFCONTRACT_SUCCESS
} from './constants';

import ENDPOINTS from '../../api/endpoints';

function* updateStaffContract(action) {
  try {
    const { staffContractWithId } = action;

    const request = yield axios({
      method: 'put',
      url: ENDPOINTS.STAFFCONTRACT + '/update',
      data: staffContractWithId
    });

    yield put({
      type: UPDATE_STAFFCONTRACT_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_STAFFCONTRACT_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* staffContractSaga() {
  yield all([takeLatest(UPDATE_STAFFCONTRACT, updateStaffContract)]);
}
