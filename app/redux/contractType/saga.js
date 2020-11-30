import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  ADD_CONTRACTTYPE,
  ADD_CONTRACTTYPE_FAILURE,
  ADD_CONTRACTTYPE_SUCCESS,
  DELETE_CONTRACTTYPE,
  DELETE_CONTRACTTYPE_FAILURE,
  DELETE_CONTRACTTYPE_SUCCESS,
  GET_ALL_CONTRACTTYPES,
  GET_ALL_CONTRACTTYPES_FAILURE,
  GET_ALL_CONTRACTTYPES_SUCCESS,
  GET_ALL_CONTRACTTYPES_BY_STATE,
  GET_ALL_CONTRACTTYPES_BY_STATE_FAILURE,
  GET_ALL_CONTRACTTYPES_BY_STATE_SUCCESS,
  UPDATE_CONTRACTTYPE,
  UPDATE_CONTRACTTYPE_FAILURE,
  UPDATE_CONTRACTTYPE_SUCCESS
} from './constants';

import ENDPOINTS from '../../api/endpoints';

function* saveContractType(action) {
  try {
    const { contractType } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.CONTRACTTYPE + '/add',
      data: contractType
    });

    yield put({
      type: ADD_CONTRACTTYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_CONTRACTTYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* updateContractType(action) {
  try {
    const { contractTypeWithId } = action;

    const request = yield axios({
      method: 'put',
      url: ENDPOINTS.CONTRACTTYPE + '/update',
      data: contractTypeWithId
    });

    yield put({
      type: UPDATE_CONTRACTTYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_CONTRACTTYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteContractType(action) {
  try {
    const { oldContractTypeId, newContractTypeId } = action;
    const request = yield axios({
      method: 'delete',
      url:
        ENDPOINTS.CONTRACTTYPE
        + '/delete/oldId='
        + oldContractTypeId
        + '&newId='
        + newContractTypeId
    });

    yield put({
      type: DELETE_CONTRACTTYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_CONTRACTTYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllContractType() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.CONTRACTTYPE + '/all'
    });
    yield put({
      type: GET_ALL_CONTRACTTYPES_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_CONTRACTTYPES_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllContractTypeByState(action) {
  try {
    const { stateId } = action;

    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.CONTRACTTYPE + '/all-by-state/' + stateId
    });
    yield put({
      type: GET_ALL_CONTRACTTYPES_BY_STATE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_CONTRACTTYPES_BY_STATE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* contractTypeSaga() {
  yield all([
    takeLatest(ADD_CONTRACTTYPE, saveContractType),
    takeLatest(UPDATE_CONTRACTTYPE, updateContractType),
    takeLatest(DELETE_CONTRACTTYPE, deleteContractType),
    takeLatest(GET_ALL_CONTRACTTYPES, getAllContractType),
    takeLatest(GET_ALL_CONTRACTTYPES_BY_STATE, getAllContractTypeByState)
  ]);
}
