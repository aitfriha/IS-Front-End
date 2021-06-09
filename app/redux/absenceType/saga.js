import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  ADD_ABSENCETYPE,
  ADD_ABSENCETYPE_FAILURE,
  ADD_ABSENCETYPE_SUCCESS,
  DELETE_ABSENCETYPE,
  DELETE_ABSENCETYPE_FAILURE,
  DELETE_ABSENCETYPE_SUCCESS,
  GET_ALL_ABSENCETYPES,
  GET_ALL_ABSENCETYPES_FAILURE,
  GET_ALL_ABSENCETYPES_SUCCESS,
  GET_ALL_ABSENCETYPES_BY_STATE,
  GET_ALL_ABSENCETYPES_BY_STATE_FAILURE,
  GET_ALL_ABSENCETYPES_BY_STATE_SUCCESS,
  UPDATE_ABSENCETYPE,
  UPDATE_ABSENCETYPE_FAILURE,
  UPDATE_ABSENCETYPE_SUCCESS
} from './constants';

import ENDPOINTS from '../../api/endpoints';

function* saveAbsenceType(action) {
  try {
    const { absenceType } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.ABSENCETYPE + '/add',
      data: absenceType
    });

    yield put({
      type: ADD_ABSENCETYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_ABSENCETYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* updateAbsenceType(action) {
  try {
    const { absenceTypeWithId } = action;

    const request = yield axios({
      method: 'put',
      url: ENDPOINTS.ABSENCETYPE + '/update',
      data: absenceTypeWithId
    });

    yield put({
      type: UPDATE_ABSENCETYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_ABSENCETYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteAbsenceType(action) {
  try {
    const { absenceTypeId, newAbsenceTypeId } = action;

    const request = yield axios({
      method: 'delete',
      url: ENDPOINTS.ABSENCETYPE
          + '/delete/oldId='
          + absenceTypeId
          + '&newId='
          + newAbsenceTypeId
    });

    yield put({
      type: DELETE_ABSENCETYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_ABSENCETYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllAbsenceType() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.ABSENCETYPE + '/all'
    });
    yield put({
      type: GET_ALL_ABSENCETYPES_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_ABSENCETYPES_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllAbsenceTypeByState(action) {
  try {
    const { stateId } = action;

    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.ABSENCETYPE + '/all-by-state/' + stateId
    });
    yield put({
      type: GET_ALL_ABSENCETYPES_BY_STATE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_ABSENCETYPES_BY_STATE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* absenceTypeSaga() {
  yield all([
    takeLatest(ADD_ABSENCETYPE, saveAbsenceType),
    takeLatest(UPDATE_ABSENCETYPE, updateAbsenceType),
    takeLatest(DELETE_ABSENCETYPE, deleteAbsenceType),
    takeLatest(GET_ALL_ABSENCETYPES, getAllAbsenceType),
    takeLatest(GET_ALL_ABSENCETYPES_BY_STATE, getAllAbsenceTypeByState)
  ]);
}
