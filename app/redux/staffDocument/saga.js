import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  ADD_STAFFDOCUMENT,
  ADD_STAFFDOCUMENT_FAILURE,
  ADD_STAFFDOCUMENT_SUCCESS,
  DELETE_STAFFDOCUMENT,
  DELETE_STAFFDOCUMENT_FAILURE,
  DELETE_STAFFDOCUMENT_SUCCESS
} from './constants';

import ENDPOINTS from '../../api/endpoints';

function* addStaffDocument(action) {
  try {
    const { staffDocument } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.STAFFDOCUMENT + '/save',
      data: staffDocument
    });
    console.log(request.data.payload);
    yield put({
      type: ADD_STAFFDOCUMENT_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    console.log(errors.response.data.errors);
    yield put({
      type: ADD_STAFFDOCUMENT_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteStaffDocument(action) {
  try {
    const { staffDocumentId } = action;

    const request = yield axios({
      method: 'delete',
      url: ENDPOINTS.STAFFDOCUMENT + '/delete/' + staffDocumentId
    });
    console.log(request.data.payload);

    yield put({
      type: DELETE_STAFFDOCUMENT_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    console.log(errors.response.data.errors);
    yield put({
      type: DELETE_STAFFDOCUMENT_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* staffDocumentSaga() {
  yield all([
    takeLatest(ADD_STAFFDOCUMENT, addStaffDocument),
    takeLatest(DELETE_STAFFDOCUMENT, deleteStaffDocument)
  ]);
}
