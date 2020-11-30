import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  UPDATE_STAFFECONOMICCONTRACTINFORMATION,
  UPDATE_STAFFECONOMICCONTRACTINFORMATION_FAILURE,
  UPDATE_STAFFECONOMICCONTRACTINFORMATION_SUCCESS
} from './constants';

import ENDPOINTS from '../../api/endpoints';

function* updateStaffEconomicContractInformation(action) {
  try {
    const { staffEconomicContractInformationWithId } = action;

    const request = yield axios({
      method: 'put',
      url: ENDPOINTS.STAFFECONOMICCONTRACTINFORMATION + '/update',
      data: staffEconomicContractInformationWithId
    });
    yield put({
      type: UPDATE_STAFFECONOMICCONTRACTINFORMATION_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_STAFFECONOMICCONTRACTINFORMATION_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* staffEconomicContractInformationSaga() {
  yield all([
    takeLatest(
      UPDATE_STAFFECONOMICCONTRACTINFORMATION,
      updateStaffEconomicContractInformation
    )
  ]);
}
