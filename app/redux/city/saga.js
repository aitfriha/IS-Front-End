import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  ADD_CITY,
  ADD_CITY_FAILURE,
  ADD_CITY_SUCCESS,
  IMPORT_CITY,
  IMPORT_CITY_FAILURE,
  IMPORT_CITY_SUCCESS,
  DELETE_CITY,
  DELETE_CITY_FAILURE,
  DELETE_CITY_SUCCESS,
  GET_ALL_CITYS,
  GET_ALL_CITYS_FAILURE,
  GET_ALL_CITYS_SUCCESS,
  UPDATE_CITY,
  UPDATE_CITY_FAILURE,
  UPDATE_CITY_SUCCESS,

  GET_ALL_CITYBYSTATE,
  GET_ALL_CITYBYSTATE_SUCCESS,
  GET_ALL_CITYBYSTATE_FAILURE,
} from './constants';

import ENDPOINTS from '../../api/endpoints';



function* addCity(action) {
  try {
    const { city } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.CITY + '/add',
      data: city,
    });

    yield put({
      type: ADD_CITY_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_CITY_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* importCity(action) {
  try {
    const { city } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.CITY + '/import',
      data: city,
    });

    yield put({
      type: IMPORT_CITY_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: IMPORT_CITY_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* updateCity(action) {
  try {
    const {
      isicWithId
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.CITY + '/update',
      data: isicWithId
    });

    yield put({
      type: UPDATE_CITY_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_CITY_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteCity(action) {
  try {
    const {
      isicId
    } = action;

    const request = yield axios({
      method: 'delete',
      url: ENDPOINTS.CITY + '/delete/' + isicId
    });

    yield put({
      type: DELETE_CITY_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_CITY_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* getAllCitys() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.CITY + '/all'
    });
    yield put({
      type: GET_ALL_CITYS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_CITYS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllCityByState(action) {
  try {
    const {
      stateWithId
    } = action;
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.CITY + '/citiesByState/' + stateWithId
    });
    yield put({
      type: GET_ALL_CITYBYSTATE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_CITYBYSTATE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


export default function* citysSaga() {
  yield all([
    takeLatest(ADD_CITY, addCity),
    takeLatest(IMPORT_CITY, importCity),
    takeLatest(UPDATE_CITY, updateCity),
    takeLatest(DELETE_CITY, deleteCity),
    takeLatest(GET_ALL_CITYS, getAllCitys),
    takeLatest(GET_ALL_CITYBYSTATE, getAllCityByState),
  ]);
}
