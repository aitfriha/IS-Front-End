import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  GET_ALL_ADMINISTRATIVESTRUCTUREASSIGNATIONHISTORIES,
  GET_ALL_ADMINISTRATIVESTRUCTUREASSIGNATIONHISTORIES_SUCCESS,
  GET_ALL_ADMINISTRATIVESTRUCTUREASSIGNATIONHISTORIES_FAILURE,
  GET_ALL_ADMINISTRATIVESTRUCTUREASSIGNATIONHISTORIES_BY_LEVEL,
  GET_ALL_ADMINISTRATIVESTRUCTUREASSIGNATIONHISTORIES_BY_LEVEL_SUCCESS,
  GET_ALL_ADMINISTRATIVESTRUCTUREASSIGNATIONHISTORIES_BY_LEVEL_FAILURE
} from './constants';

import ENDPOINTS from '../../api/endpoints';

function* getAllAdministrativeStructureAssignationHistory() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.ADMINISTRATIVESTRUCTUREASSIGNATIONHISTORY + '/all'
    });
    yield put({
      type: GET_ALL_ADMINISTRATIVESTRUCTUREASSIGNATIONHISTORIES_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_ADMINISTRATIVESTRUCTUREASSIGNATIONHISTORIES_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllAdministrativeStructureAssignationHistoryByLevel(action) {
  const { levelId } = action;
  try {
    const request = yield axios({
      method: 'get',
      url:
        ENDPOINTS.ADMINISTRATIVESTRUCTUREASSIGNATIONHISTORY
        + '/history-by-level/'
        + levelId
    });
    yield put({
      type: GET_ALL_ADMINISTRATIVESTRUCTUREASSIGNATIONHISTORIES_BY_LEVEL_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_ADMINISTRATIVESTRUCTUREASSIGNATIONHISTORIES_BY_LEVEL_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* administrativeStructureAssignationHistorySaga() {
  yield all([
    takeLatest(
      GET_ALL_ADMINISTRATIVESTRUCTUREASSIGNATIONHISTORIES,
      getAllAdministrativeStructureAssignationHistory
    ),
    takeLatest(
      GET_ALL_ADMINISTRATIVESTRUCTUREASSIGNATIONHISTORIES_BY_LEVEL,
      getAllAdministrativeStructureAssignationHistoryByLevel
    )
  ]);
}
