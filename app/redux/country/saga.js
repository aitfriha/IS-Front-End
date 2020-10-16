import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  ADD_COUNTRY,
  ADD_COUNTRY_FAILURE,
  ADD_COUNTRY_SUCCESS,
  DELETE_COUNTRY,
  DELETE_COUNTRY_FAILURE,
  DELETE_COUNTRY_SUCCESS,
  GET_ALL_COUNTRYS,
  GET_ALL_COUNTRYS_FAILURE,
  GET_ALL_COUNTRYS_SUCCESS,
  UPDATE_COUNTRY,
  UPDATE_COUNTRY_FAILURE,
  UPDATE_COUNTRY_SUCCESS
} from './constants';

import ENDPOINTS from '../../api/endpoints';


function* addCountry(action) {
  try {
    const { country } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.COUNTRY + '/add',
      data: country,
    });

    yield put({
      type: ADD_COUNTRY_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_COUNTRY_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* updateCountry(action) {
  try {
    const {
      countryWithId
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.COUNTRY + '/update',
      data: countryWithId
    });

    yield put({
      type: UPDATE_COUNTRY_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_COUNTRY_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteCountry(action) {
  try {
    const {
      countryId
    } = action;

    const request = yield axios({
      method: 'delete',
      url: ENDPOINTS.COUNTRY + '/delete/' + countryId
    });

    yield put({
      type: DELETE_COUNTRY_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_COUNTRY_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* getAllCountry() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.COUNTRY + '/all'
    });
    yield put({
      type: GET_ALL_COUNTRYS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_COUNTRYS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* countrySaga() {
  yield all([
    takeLatest(ADD_COUNTRY, addCountry),
    takeLatest(UPDATE_COUNTRY, updateCountry),
    takeLatest(DELETE_COUNTRY, deleteCountry),
    takeLatest(GET_ALL_COUNTRYS, getAllCountry),
  ]);
}
