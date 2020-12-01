import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  GET_ALL_FUNCTIONALSTRUCTUREASSIGNATIONHISTORIES,
  GET_ALL_FUNCTIONALSTRUCTUREASSIGNATIONHISTORIES_SUCCESS,
  GET_ALL_FUNCTIONALSTRUCTUREASSIGNATIONHISTORIES_FAILURE,
  GET_ALL_FUNCTIONALSTRUCTUREASSIGNATIONHISTORIES_BY_LEVEL,
  GET_ALL_FUNCTIONALSTRUCTUREASSIGNATIONHISTORIES_BY_LEVEL_SUCCESS,
  GET_ALL_FUNCTIONALSTRUCTUREASSIGNATIONHISTORIES_BY_LEVEL_FAILURE
} from './constants';

import ENDPOINTS from '../../api/endpoints';

function* getAllFunctionalStructureAssignationHistory() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.FUNCTIONALSTRUCTUREASSIGNATIONHISTORY + '/all'
    });
    yield put({
      type: GET_ALL_FUNCTIONALSTRUCTUREASSIGNATIONHISTORIES_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_FUNCTIONALSTRUCTUREASSIGNATIONHISTORIES_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllFunctionalStructureAssignationHistoryByLevel(action) {
  const { levelId } = action;
  try {
    const request = yield axios({
      method: 'get',
      url:
        ENDPOINTS.FUNCTIONALSTRUCTUREASSIGNATIONHISTORY
        + '/history-by-level/'
        + levelId
    });
    yield put({
      type: GET_ALL_FUNCTIONALSTRUCTUREASSIGNATIONHISTORIES_BY_LEVEL_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_FUNCTIONALSTRUCTUREASSIGNATIONHISTORIES_BY_LEVEL_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* functionalStructureAssignationHistorySaga() {
  yield all([
    takeLatest(
      GET_ALL_FUNCTIONALSTRUCTUREASSIGNATIONHISTORIES,
      getAllFunctionalStructureAssignationHistory
    ),
    takeLatest(
      GET_ALL_FUNCTIONALSTRUCTUREASSIGNATIONHISTORIES_BY_LEVEL,
      getAllFunctionalStructureAssignationHistoryByLevel
    )
  ]);
}
