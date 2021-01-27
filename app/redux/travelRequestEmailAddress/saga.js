import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {

  ADD_TRAVEL_REQUEST_EMAIL_ADDRESS,
  ADD_TRAVEL_REQUEST_EMAIL_ADDRESS_FAILURE,
  ADD_TRAVEL_REQUEST_EMAIL_ADDRESS_SUCCESS,

  UPDATE_TRAVEL_REQUEST_EMAIL_ADDRESS,
  UPDATE_TRAVEL_REQUEST_EMAIL_ADDRESS_FAILURE,
  UPDATE_TRAVEL_REQUEST_EMAIL_ADDRESS_SUCCESS,

  DELETE_TRAVEL_REQUEST_EMAIL_ADDRESS,
  DELETE_TRAVEL_REQUEST_EMAIL_ADDRESS_FAILURE,
  DELETE_TRAVEL_REQUEST_EMAIL_ADDRESS_SUCCESS,

  GET_ALL_TRAVEL_REQUEST_EMAIL_ADDRESSES,
  GET_ALL_TRAVEL_REQUEST_EMAIL_ADDRESSES_FAILURE,
  GET_ALL_TRAVEL_REQUEST_EMAIL_ADDRESSES_SUCCESS


} from './constants';

import ENDPOINTS from '../../api/endpoints';

function* addTravelRequestEmailAddress(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.TRAVEL_REQUEST_EMAIL_ADDRESS + '/add',
      data
    });

    yield put({
      type: ADD_TRAVEL_REQUEST_EMAIL_ADDRESS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_TRAVEL_REQUEST_EMAIL_ADDRESS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* updateTravelRequestEmailAddress(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.TRAVEL_REQUEST_EMAIL_ADDRESS + '/update',
      data
    });

    yield put({
      type: UPDATE_TRAVEL_REQUEST_EMAIL_ADDRESS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_TRAVEL_REQUEST_EMAIL_ADDRESS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteTravelRequestEmailAddress(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'delete',
      url: ENDPOINTS.TRAVEL_REQUEST_EMAIL_ADDRESS + '/delete/' + data
    });

    yield put({
      type: DELETE_TRAVEL_REQUEST_EMAIL_ADDRESS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_TRAVEL_REQUEST_EMAIL_ADDRESS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* getAllTravelRequestEmailAddresses() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.TRAVEL_REQUEST_EMAIL_ADDRESS + '/all',

    });
    yield put({
      type: GET_ALL_TRAVEL_REQUEST_EMAIL_ADDRESSES_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_TRAVEL_REQUEST_EMAIL_ADDRESSES_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* travelRequestEmailAddressSaga() {
  yield all([
    takeLatest(ADD_TRAVEL_REQUEST_EMAIL_ADDRESS, addTravelRequestEmailAddress),
    takeLatest(UPDATE_TRAVEL_REQUEST_EMAIL_ADDRESS, updateTravelRequestEmailAddress),
    takeLatest(DELETE_TRAVEL_REQUEST_EMAIL_ADDRESS, deleteTravelRequestEmailAddress),
    takeLatest(GET_ALL_TRAVEL_REQUEST_EMAIL_ADDRESSES, getAllTravelRequestEmailAddresses)
  ]);
}
