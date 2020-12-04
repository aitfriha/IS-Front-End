import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  ADD_CLIENT_COMMERCIAL,
  ADD_CLIENT_FAILURE,
  ADD_CLIENT_SUCCESS,
  DELETE_CLIENT,
  DELETE_CLIENT_FAILURE,
  DELETE_CLIENT_SUCCESS,
  GET_ALL_CLIENTS,
  GET_ALL_CLIENTS_FAILURE,
  GET_ALL_CLIENTS_SUCCESS,
  UPDATE_CLIENT,
  UPDATE_CLIENT_FAILURE,
  UPDATE_CLIENT_SUCCESS,

  GET_ALL_CLIENTS_BYCOUNTRY,
  GET_ALL_CLIENTS_BYCOUNTRY_FAILURE,
  GET_ALL_CLIENTS_BYCOUNTRY_SUCCESS,

  IMPORT_CLIENT_COMMERCIAL,
  IMPORT_CLIENT_FAILURE,
  IMPORT_CLIENT_SUCCESS,
} from './constants';

import ENDPOINTS from '../../api/endpoints';


function* addClientCommercial(action) {
  try {
    const { client } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.CLIENT + '/add',
      data: client,
    });

    yield put({
      type: ADD_CLIENT_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_CLIENT_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* importClientCommercial(action) {
  try {
    const { client } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.CLIENT + '/import',
      data: client,
    });

    yield put({
      type: IMPORT_CLIENT_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: IMPORT_CLIENT_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* updateClient(action) {
  try {
    const {
      clientWithId
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.CLIENT + '/update',
      data: clientWithId
    });

    yield put({
      type: UPDATE_CLIENT_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_CLIENT_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteClient(action) {
  try {
    const {
      clientId
    } = action;

    const request = yield axios({
      method: 'delete',
      url: ENDPOINTS.CLIENT + '/delete/' + clientId
    });

    yield put({
      type: DELETE_CLIENT_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_CLIENT_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* getAllClient() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.CLIENT + '/all'
    });
    yield put({
      type: GET_ALL_CLIENTS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_CLIENTS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllClientByCountry(action) {
  try {
    const {
      country
    } = action;
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.CLIENT + '/all/' + country
    });
    yield put({
      type: GET_ALL_CLIENTS_BYCOUNTRY_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_CLIENTS_BYCOUNTRY_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* clientSaga() {
  yield all([
    takeLatest(ADD_CLIENT_COMMERCIAL, addClientCommercial),
    takeLatest(IMPORT_CLIENT_COMMERCIAL, importClientCommercial),
    takeLatest(UPDATE_CLIENT, updateClient),
    takeLatest(DELETE_CLIENT, deleteClient),
    takeLatest(GET_ALL_CLIENTS, getAllClient),
    takeLatest(GET_ALL_CLIENTS_BYCOUNTRY, getAllClientByCountry),
  ]);
}
