import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  ADD_SELECTIONTYPEEVALUATION,
  ADD_SELECTIONTYPEEVALUATION_FAILURE,
  ADD_SELECTIONTYPEEVALUATION_SUCCESS,
  DELETE_SELECTIONTYPEEVALUATION,
  DELETE_SELECTIONTYPEEVALUATION_FAILURE,
  DELETE_SELECTIONTYPEEVALUATION_SUCCESS,
  GET_ALL_SELECTIONTYPEEVALUATIONS,
  GET_ALL_SELECTIONTYPEEVALUATIONS_FAILURE,
  GET_ALL_SELECTIONTYPEEVALUATIONS_SUCCESS,
  GET_ALL_SELECTIONTYPEEVALUATIONS_BY_TYPE,
  GET_ALL_SELECTIONTYPEEVALUATIONS_BY_TYPE_FAILURE,
  GET_ALL_SELECTIONTYPEEVALUATIONS_BY_TYPE_SUCCESS,
  UPDATE_SELECTIONTYPEEVALUATION,
  UPDATE_SELECTIONTYPEEVALUATION_FAILURE,
  UPDATE_SELECTIONTYPEEVALUATION_SUCCESS
} from './constants';

import ENDPOINTS from '../../api/endpoints';

function* saveSelectionTypeEvaluation(action) {
  try {
    const { selectionTypeEvaluation } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.SELECTIONTYPEEVALUATION + '/add',
      data: selectionTypeEvaluation
    });

    yield put({
      type: ADD_SELECTIONTYPEEVALUATION_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_SELECTIONTYPEEVALUATION_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* updateSelectionTypeEvaluation(action) {
  try {
    const { selectionTypeEvaluationWithId } = action;

    const request = yield axios({
      method: 'put',
      url: ENDPOINTS.SELECTIONTYPEEVALUATION + '/update',
      data: selectionTypeEvaluationWithId
    });

    yield put({
      type: UPDATE_SELECTIONTYPEEVALUATION_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_SELECTIONTYPEEVALUATION_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteSelectionTypeEvaluation(action) {
  try {
    const { selectionTypeEvaluationId } = action;

    const request = yield axios({
      method: 'delete',
      url:
        ENDPOINTS.SELECTIONTYPEEVALUATION
        + '/delete/'
        + selectionTypeEvaluationId
    });

    yield put({
      type: DELETE_SELECTIONTYPEEVALUATION_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_SELECTIONTYPEEVALUATION_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllSelectionTypeEvaluation() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.SELECTIONTYPEEVALUATION + '/all'
    });
    yield put({
      type: GET_ALL_SELECTIONTYPEEVALUATIONS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_SELECTIONTYPEEVALUATIONS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllSelectionTypeEvaluationByType(action) {
  const { selectionType } = action;
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.SELECTIONTYPEEVALUATION + '/all-by-type/' + selectionType
    });
    yield put({
      type: GET_ALL_SELECTIONTYPEEVALUATIONS_BY_TYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_SELECTIONTYPEEVALUATIONS_BY_TYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* functionalStructureSaga() {
  yield all([
    takeLatest(ADD_SELECTIONTYPEEVALUATION, saveSelectionTypeEvaluation),
    takeLatest(UPDATE_SELECTIONTYPEEVALUATION, updateSelectionTypeEvaluation),
    takeLatest(DELETE_SELECTIONTYPEEVALUATION, deleteSelectionTypeEvaluation),
    takeLatest(GET_ALL_SELECTIONTYPEEVALUATIONS, getAllSelectionTypeEvaluation),
    takeLatest(
      GET_ALL_SELECTIONTYPEEVALUATIONS_BY_TYPE,
      getAllSelectionTypeEvaluationByType
    )
  ]);
}
