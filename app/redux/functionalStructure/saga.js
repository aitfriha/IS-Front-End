import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  ADD_FUNCTIONALSTRUCTURELEVEL,
  ADD_FUNCTIONALSTRUCTURELEVEL_FAILURE,
  ADD_FUNCTIONALSTRUCTURELEVEL_SUCCESS,
  DELETE_FUNCTIONALSTRUCTURELEVEL,
  DELETE_FUNCTIONALSTRUCTURELEVEL_FAILURE,
  DELETE_FUNCTIONALSTRUCTURELEVEL_SUCCESS,
  GET_ALL_FUNCTIONALSTRUCTURELEVELS,
  GET_ALL_FUNCTIONALSTRUCTURELEVELS_FAILURE,
  GET_ALL_FUNCTIONALSTRUCTURELEVELS_SUCCESS,
  GET_ALL_FUNCTIONALSTRUCTURELEVELS_BY_TYPE,
  GET_ALL_FUNCTIONALSTRUCTURELEVELS_BY_TYPE_FAILURE,
  GET_ALL_FUNCTIONALSTRUCTURELEVELS_BY_TYPE_SUCCESS,
  UPDATE_FUNCTIONALSTRUCTURELEVEL,
  UPDATE_FUNCTIONALSTRUCTURELEVEL_FAILURE,
  UPDATE_FUNCTIONALSTRUCTURELEVEL_SUCCESS
} from './constants';

import ENDPOINTS from '../../api/endpoints';

function* saveFunctionalStructureLevel(action) {
  try {
    const { functionalStructureLevel } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.FUNCTIONALSTRUCTURE + '/add',
      data: functionalStructureLevel
    });

    yield put({
      type: ADD_FUNCTIONALSTRUCTURELEVEL_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_FUNCTIONALSTRUCTURELEVEL_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* updateFunctionalStructureLevel(action) {
  try {
    const { functionalStructureLevelWithId } = action;

    const request = yield axios({
      method: 'put',
      url: ENDPOINTS.FUNCTIONALSTRUCTURE + '/update',
      data: functionalStructureLevelWithId
    });

    yield put({
      type: UPDATE_FUNCTIONALSTRUCTURELEVEL_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_FUNCTIONALSTRUCTURELEVEL_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteFunctionalStructureLevel(action) {
  try {
    const { functionalStructureLevelId } = action;

    const request = yield axios({
      method: 'delete',
      url:
        ENDPOINTS.FUNCTIONALSTRUCTURE + '/delete/' + functionalStructureLevelId
    });

    yield put({
      type: DELETE_FUNCTIONALSTRUCTURELEVEL_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_FUNCTIONALSTRUCTURELEVEL_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllFunctionalStructureLevel() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.FUNCTIONALSTRUCTURE + '/all'
    });
    yield put({
      type: GET_ALL_FUNCTIONALSTRUCTURELEVELS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_FUNCTIONALSTRUCTURELEVELS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllFunctionalStructureLevelByType(action) {
  const { levelType } = action;
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.FUNCTIONALSTRUCTURE + '/all-by-type/' + levelType
    });
    yield put({
      type: GET_ALL_FUNCTIONALSTRUCTURELEVELS_BY_TYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_FUNCTIONALSTRUCTURELEVELS_BY_TYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* functionalStructureSaga() {
  yield all([
    takeLatest(ADD_FUNCTIONALSTRUCTURELEVEL, saveFunctionalStructureLevel),
    takeLatest(UPDATE_FUNCTIONALSTRUCTURELEVEL, updateFunctionalStructureLevel),
    takeLatest(DELETE_FUNCTIONALSTRUCTURELEVEL, deleteFunctionalStructureLevel),
    takeLatest(
      GET_ALL_FUNCTIONALSTRUCTURELEVELS,
      getAllFunctionalStructureLevel
    ),
    takeLatest(
      GET_ALL_FUNCTIONALSTRUCTURELEVELS_BY_TYPE,
      getAllFunctionalStructureLevelByType
    )
  ]);
}
