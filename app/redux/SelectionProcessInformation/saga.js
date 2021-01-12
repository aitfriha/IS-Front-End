import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  ADD_SELECTIONPROCESSINFORMATION,
  ADD_SELECTIONPROCESSINFORMATION_FAILURE,
  ADD_SELECTIONPROCESSINFORMATION_SUCCESS,
  DELETE_SELECTIONPROCESSINFORMATION,
  DELETE_SELECTIONPROCESSINFORMATION_FAILURE,
  DELETE_SELECTIONPROCESSINFORMATION_SUCCESS,
  GET_ALL_SELECTIONPROCESSINFORMATIONS,
  GET_ALL_SELECTIONPROCESSINFORMATIONS_FAILURE,
  GET_ALL_SELECTIONPROCESSINFORMATIONS_SUCCESS,
  UPDATE_SELECTIONPROCESSINFORMATION,
  UPDATE_SELECTIONPROCESSINFORMATION_FAILURE,
  UPDATE_SELECTIONPROCESSINFORMATION_SUCCESS
} from './constants';

import ENDPOINTS from '../../api/endpoints';

function* saveSelectionProcessInformation(action) {
  try {
    const { selectionProcessInformation } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.SELECTIONPROCESSINFORMATION + '/add',
      data: selectionProcessInformation
    });

    yield put({
      type: ADD_SELECTIONPROCESSINFORMATION_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_SELECTIONPROCESSINFORMATION_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* updateSelectionProcessInformation(action) {
  try {
    const { selectionProcessInformationWithId } = action;

    const request = yield axios({
      method: 'put',
      url: ENDPOINTS.SELECTIONPROCESSINFORMATION + '/update',
      data: selectionProcessInformationWithId
    });

    yield put({
      type: UPDATE_SELECTIONPROCESSINFORMATION_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_SELECTIONPROCESSINFORMATION_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteSelectionProcessInformation(action) {
  try {
    const { selectionProcessId } = action;

    const request = yield axios({
      method: 'delete',
      url:
        ENDPOINTS.SELECTIONPROCESSINFORMATION
        + '/delete/'
        + selectionProcessId
    });

    yield put({
      type: DELETE_SELECTIONPROCESSINFORMATION_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_SELECTIONPROCESSINFORMATION_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllSelectionProcessInformation() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.SELECTIONPROCESSINFORMATION + '/all'
    });
    yield put({
      type: GET_ALL_SELECTIONPROCESSINFORMATIONS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_SELECTIONPROCESSINFORMATIONS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* selectionProcessInformationSaga() {
  yield all([
    takeLatest(
      ADD_SELECTIONPROCESSINFORMATION,
      saveSelectionProcessInformation
    ),
    takeLatest(
      UPDATE_SELECTIONPROCESSINFORMATION,
      updateSelectionProcessInformation
    ),
    takeLatest(
      DELETE_SELECTIONPROCESSINFORMATION,
      deleteSelectionProcessInformation
    ),
    takeLatest(
      GET_ALL_SELECTIONPROCESSINFORMATIONS,
      getAllSelectionProcessInformation
    )
  ]);
}
