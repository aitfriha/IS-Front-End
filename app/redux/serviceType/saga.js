import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  ADD_COMMERCIALSERVICETYPE,
  ADD_COMMERCIALSERVICETYPE_FAILURE,
  ADD_COMMERCIALSERVICETYPE_SUCCESS,
  DELETE_COMMERCIALSERVICETYPE,
  DELETE_COMMERCIALSERVICETYPE_FAILURE,
  DELETE_COMMERCIALSERVICETYPE_SUCCESS,
  GET_ALL_COMMERCIALSERVICETYPES,
  GET_ALL_COMMERCIALSERVICETYPES_FAILURE,
  GET_ALL_COMMERCIALSERVICETYPES_SUCCESS,
  UPDATE_COMMERCIALSERVICETYPE,
  UPDATE_COMMERCIALSERVICETYPE_FAILURE,
  UPDATE_COMMERCIALSERVICETYPE_SUCCESS,

  UPDATE_DELETE_COMMERCIALSERVICETYPE,
  UPDATE_DELETE_COMMERCIALSERVICETYPE_FAILURE,
  UPDATE_DELETE_COMMERCIALSERVICETYPE_SUCCESS

} from './constants';

import ENDPOINTS from '../../api/endpoints';


function* addCommercialServiceType(action) {
  try {
    const { commercialServiceType } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.COMMERCIALSERVICETYPE + '/add',
      data: commercialServiceType,
    });

    yield put({
      type: ADD_COMMERCIALSERVICETYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_COMMERCIALSERVICETYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* updateCommercialServiceType(action) {
  try {
    const {
      commercialServiceTypeWithId
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.COMMERCIALSERVICETYPE + '/update',
      data: commercialServiceTypeWithId
    });

    yield put({
      type: UPDATE_COMMERCIALSERVICETYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_COMMERCIALSERVICETYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* updateDeleteCommercialServiceType(action) {
  try {
    const {
      serviceType,
      listOperation
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.COMMERCIALSERVICETYPE + '/deleteUpdate/' + serviceType + '/' + listOperation
    });

    yield put({
      type: UPDATE_DELETE_COMMERCIALSERVICETYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_DELETE_COMMERCIALSERVICETYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteCommercialServiceType(action) {
  try {
    const {
      commercialServiceTypeId
    } = action;

    const request = yield axios({
      method: 'delete',
      url: ENDPOINTS.COMMERCIALSERVICETYPE + '/delete/' + commercialServiceTypeId
    });

    yield put({
      type: DELETE_COMMERCIALSERVICETYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_COMMERCIALSERVICETYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* getAllCommercialServiceType() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.COMMERCIALSERVICETYPE + '/all'
    });
    yield put({
      type: GET_ALL_COMMERCIALSERVICETYPES_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_COMMERCIALSERVICETYPES_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* commercialServiceTypeSaga() {
  yield all([
    takeLatest(ADD_COMMERCIALSERVICETYPE, addCommercialServiceType),
    takeLatest(UPDATE_COMMERCIALSERVICETYPE, updateCommercialServiceType),
    takeLatest(UPDATE_DELETE_COMMERCIALSERVICETYPE, updateDeleteCommercialServiceType),
    takeLatest(DELETE_COMMERCIALSERVICETYPE, deleteCommercialServiceType),
    takeLatest(GET_ALL_COMMERCIALSERVICETYPES, getAllCommercialServiceType),
  ]);
}
