import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  ADD_CONTRACTMODEL,
  ADD_CONTRACTMODEL_FAILURE,
  ADD_CONTRACTMODEL_SUCCESS,
  DELETE_CONTRACTMODEL,
  DELETE_CONTRACTMODEL_FAILURE,
  DELETE_CONTRACTMODEL_SUCCESS,
  GET_ALL_CONTRACTMODELS,
  GET_ALL_CONTRACTMODELS_FAILURE,
  GET_ALL_CONTRACTMODELS_SUCCESS,
  UPDATE_CONTRACTMODEL,
  UPDATE_CONTRACTMODEL_FAILURE,
  UPDATE_CONTRACTMODEL_SUCCESS
} from './constants';

import ENDPOINTS from '../../api/endpoints';

function* saveContractModel(action) {
  console.log('saga');
  try {
    const { contractModel } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.CONTRACTMODEL + '/add',
      data: contractModel
    });

    console.log(request);

    yield put({
      type: ADD_CONTRACTMODEL_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_CONTRACTMODEL_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* updateContractModel(action) {
  try {
    const { contractModelWithId } = action;

    const request = yield axios({
      method: 'put',
      url: ENDPOINTS.CONTRACTMODEL + '/update',
      data: contractModelWithId
    });

    yield put({
      type: UPDATE_CONTRACTMODEL_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_CONTRACTMODEL_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteContractModel(action) {
  try {
    const { oldContractModelId, newContractModelId } = action;
    const request = yield axios({
      method: 'delete',
      url:
        ENDPOINTS.CONTRACTMODEL
        + '/delete/oldId='
        + oldContractModelId
        + '&newId='
        + newContractModelId
    });

    yield put({
      type: DELETE_CONTRACTMODEL_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_CONTRACTMODEL_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllContractModel() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.CONTRACTMODEL + '/all'
    });
    yield put({
      type: GET_ALL_CONTRACTMODELS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_CONTRACTMODELS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* contractModelSaga() {
  yield all([
    takeLatest(ADD_CONTRACTMODEL, saveContractModel),
    takeLatest(UPDATE_CONTRACTMODEL, updateContractModel),
    takeLatest(DELETE_CONTRACTMODEL, deleteContractModel),
    takeLatest(GET_ALL_CONTRACTMODELS, getAllContractModel)
  ]);
}
