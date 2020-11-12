import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  ADD_CONTACT,
  ADD_CONTACT_FAILURE,
  ADD_CONTACT_SUCCESS,
  DELETE_CONTACT,
  DELETE_CONTACT_FAILURE,
  DELETE_CONTACT_SUCCESS,
  GET_ALL_CONTACTS,
  GET_ALL_CONTACTS_FAILURE,
  GET_ALL_CONTACTS_SUCCESS,
  UPDATE_CONTACT,
  UPDATE_CONTACT_FAILURE,
  UPDATE_CONTACT_SUCCESS
} from './constants';

import ENDPOINTS from '../../api/endpoints';


function* addContact(action) {
  try {
    const { contact } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.CONTACT + '/add',
      data: contact,
    });

    yield put({
      type: ADD_CONTACT_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_CONTACT_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* updateContact(action) {
  try {
    const {
      contactWithId
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.CONTACT + '/update',
      data: contactWithId
    });

    yield put({
      type: UPDATE_CONTACT_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_CONTACT_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteContact(action) {
  try {
    const {
      contactId
    } = action;

    const request = yield axios({
      method: 'delete',
      url: ENDPOINTS.CONTACT + '/delete/' + contactId
    });

    yield put({
      type: DELETE_CONTACT_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_CONTACT_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* getAllContact() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.CONTACT + '/all'
    });
    yield put({
      type: GET_ALL_CONTACTS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_CONTACTS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* contactSaga() {
  yield all([
    takeLatest(ADD_CONTACT, addContact),
    takeLatest(UPDATE_CONTACT, updateContact),
    takeLatest(DELETE_CONTACT, deleteContact),
    takeLatest(GET_ALL_CONTACTS, getAllContact),
  ]);
}
