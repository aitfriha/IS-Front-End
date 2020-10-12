import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  ADD_STATECOUNTRY,
  ADD_STATECOUNTRY_FAILURE,
  ADD_STATECOUNTRY_SUCCESS,
  DELETE_STATECOUNTRY,
  DELETE_STATECOUNTRY_FAILURE,
  DELETE_STATECOUNTRY_SUCCESS,
  GET_ALL_STATECOUNTRYS,
  GET_ALL_STATECOUNTRYS_FAILURE,
  GET_ALL_STATECOUNTRYS_SUCCESS,
  UPDATE_STATECOUNTRY,
  UPDATE_STATECOUNTRY_FAILURE,
  UPDATE_STATECOUNTRY_SUCCESS,
  GET_ALL_STATECOUNTRYSBYCOUNTRY,
  GET_ALL_STATECOUNTRYSBYCOUNTRY_SUCCESS,
  GET_ALL_STATECOUNTRYSBYCOUNTRY_FAILURE

} from './constants';

import ENDPOINTS from '../../api/endpoints';


function* addStateCountry(action) {
  try {
    const { stateCountry } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.STATECOUNTRY + '/add',
      data: stateCountry,
    });

    yield put({
      type: ADD_STATECOUNTRY_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_STATECOUNTRY_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* updateStateCountry(action) {
  try {
    const {
      stateCountryWithId
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.STATECOUNTRY + '/update',
      data: stateCountryWithId
    });

    yield put({
      type: UPDATE_STATECOUNTRY_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_STATECOUNTRY_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteStateCountry(action) {
  try {
    const {
      stateCountryId
    } = action;

    const request = yield axios({
      method: 'delete',
      url: ENDPOINTS.STATECOUNTRY + '/delete/' + stateCountryId
    });

    yield put({
      type: DELETE_STATECOUNTRY_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_STATECOUNTRY_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* getAllStateCountry() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.STATECOUNTRY + '/all'
    });
    yield put({
      type: GET_ALL_STATECOUNTRYS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_STATECOUNTRYS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllStateByCountry(action) {
  try {
    const {
      countryWithId
    } = action;
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.STATECOUNTRY + '/statesByCountry/'+ countryWithId
    });
    yield put({
      type: GET_ALL_STATECOUNTRYSBYCOUNTRY_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_STATECOUNTRYSBYCOUNTRY_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* stateCountrySaga() {
  yield all([
    takeLatest(ADD_STATECOUNTRY, addStateCountry),
    takeLatest(UPDATE_STATECOUNTRY, updateStateCountry),
    takeLatest(DELETE_STATECOUNTRY, deleteStateCountry),
    takeLatest(GET_ALL_STATECOUNTRYS, getAllStateCountry),
    takeLatest(GET_ALL_STATECOUNTRYSBYCOUNTRY, getAllStateByCountry),
  ]);
}
