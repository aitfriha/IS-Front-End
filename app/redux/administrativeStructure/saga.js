import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  ADD_ADMINISTRATIVESTRUCTURELEVEL,
  ADD_ADMINISTRATIVESTRUCTURELEVEL_FAILURE,
  ADD_ADMINISTRATIVESTRUCTURELEVEL_SUCCESS,
  DELETE_ADMINISTRATIVESTRUCTURELEVEL,
  DELETE_ADMINISTRATIVESTRUCTURELEVEL_FAILURE,
  DELETE_ADMINISTRATIVESTRUCTURELEVEL_SUCCESS,
  GET_ALL_ADMINISTRATIVESTRUCTURELEVELS,
  GET_ALL_ADMINISTRATIVESTRUCTURELEVELS_FAILURE,
  GET_ALL_ADMINISTRATIVESTRUCTURELEVELS_SUCCESS,
  GET_ALL_ADMINISTRATIVESTRUCTURELEVELS_BY_TYPE,
  GET_ALL_ADMINISTRATIVESTRUCTURELEVELS_BY_TYPE_FAILURE,
  GET_ALL_ADMINISTRATIVESTRUCTURELEVELS_BY_TYPE_SUCCESS,
  UPDATE_ADMINISTRATIVESTRUCTURELEVEL,
  UPDATE_ADMINISTRATIVESTRUCTURELEVEL_FAILURE,
  UPDATE_ADMINISTRATIVESTRUCTURELEVEL_SUCCESS
} from './constants';

import ENDPOINTS from '../../api/endpoints';

function* saveAdministrativeStructureLevel(action) {
  console.log('saga 1');
  try {
    const { administrativeStructureLevel } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.ADMINISTRATIVESTRUCTURE + '/add',
      data: administrativeStructureLevel
    });

    yield put({
      type: ADD_ADMINISTRATIVESTRUCTURELEVEL_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_ADMINISTRATIVESTRUCTURELEVEL_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* updateAdministrativeStructureLevel(action) {
  try {
    const { administrativeStructureLevelWithId } = action;

    const request = yield axios({
      method: 'put',
      url: ENDPOINTS.ADMINISTRATIVESTRUCTURE + '/update',
      data: administrativeStructureLevelWithId
    });

    yield put({
      type: UPDATE_ADMINISTRATIVESTRUCTURELEVEL_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_ADMINISTRATIVESTRUCTURELEVEL_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteAdministrativeStructureLevel(action) {
  try {
    const { administrativeStructureLevelId } = action;

    const request = yield axios({
      method: 'delete',
      url:
        ENDPOINTS.ADMINISTRATIVESTRUCTURE
        + '/delete/'
        + administrativeStructureLevelId
    });

    yield put({
      type: DELETE_ADMINISTRATIVESTRUCTURELEVEL_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_ADMINISTRATIVESTRUCTURELEVEL_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllAdministrativeStructureLevel() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.ADMINISTRATIVESTRUCTURE + '/all'
    });
    yield put({
      type: GET_ALL_ADMINISTRATIVESTRUCTURELEVELS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_ADMINISTRATIVESTRUCTURELEVELS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllAdministrativeStructureLevelByType(action) {
  const { levelType } = action;
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.ADMINISTRATIVESTRUCTURE + '/all-by-type/' + levelType
    });
    yield put({
      type: GET_ALL_ADMINISTRATIVESTRUCTURELEVELS_BY_TYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_ADMINISTRATIVESTRUCTURELEVELS_BY_TYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* administrativeStructureSaga() {
  yield all([
    takeLatest(
      ADD_ADMINISTRATIVESTRUCTURELEVEL,
      saveAdministrativeStructureLevel
    ),
    takeLatest(
      UPDATE_ADMINISTRATIVESTRUCTURELEVEL,
      updateAdministrativeStructureLevel
    ),
    takeLatest(
      DELETE_ADMINISTRATIVESTRUCTURELEVEL,
      deleteAdministrativeStructureLevel
    ),
    takeLatest(
      GET_ALL_ADMINISTRATIVESTRUCTURELEVELS,
      getAllAdministrativeStructureLevel
    ),
    takeLatest(
      GET_ALL_ADMINISTRATIVESTRUCTURELEVELS_BY_TYPE,
      getAllAdministrativeStructureLevelByType
    )
  ]);
}
