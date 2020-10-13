import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  ADD_CLIENT,
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
  UPDATE_CLIENT_SUCCESS
} from './constants';

import ENDPOINTS from '../../api/endpoints';


function* addClient(action) {
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

export default function* clientSaga() {
  yield all([
    takeLatest(ADD_CLIENT, addClient),
    takeLatest(UPDATE_CLIENT, updateClient),
    takeLatest(DELETE_CLIENT, deleteClient),
    takeLatest(GET_ALL_CLIENTS, getAllClient),
  ]);
}
