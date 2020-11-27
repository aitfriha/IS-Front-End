import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  ADD_CIVILITYTITLE,
  ADD_CIVILITYTITLE_FAILURE,
  ADD_CIVILITYTITLE_SUCCESS,
  DELETE_CIVILITYTITLE,
  DELETE_CIVILITYTITLE_FAILURE,
  DELETE_CIVILITYTITLE_SUCCESS,
  GET_ALL_CIVILITYTITLES,
  GET_ALL_CIVILITYTITLES_FAILURE,
  GET_ALL_CIVILITYTITLES_SUCCESS,
  UPDATE_CIVILITYTITLE,
  UPDATE_CIVILITYTITLE_FAILURE,
  UPDATE_CIVILITYTITLE_SUCCESS
} from './constants';

import ENDPOINTS from '../../api/endpoints';


function* addCivilityTitle(action) {
  try {
    const { civilityTitle } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.CIVILITYTITLE + '/add',
      data: civilityTitle,
    });

    yield put({
      type: ADD_CIVILITYTITLE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_CIVILITYTITLE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* updateCivilityTitle(action) {
  try {
    const {
      civilityTitleWithId
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.CIVILITYTITLE + '/update',
      data: civilityTitleWithId
    });

    yield put({
      type: UPDATE_CIVILITYTITLE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_CIVILITYTITLE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteCivilityTitle(action) {
  try {
    const {
      civilityTitleId
    } = action;

    const request = yield axios({
      method: 'delete',
      url: ENDPOINTS.CIVILITYTITLE + '/delete/' + civilityTitleId
    });

    yield put({
      type: DELETE_CIVILITYTITLE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_CIVILITYTITLE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* getAllCivilityTitle() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.CIVILITYTITLE + '/all'
    });
    yield put({
      type: GET_ALL_CIVILITYTITLES_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_CIVILITYTITLES_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* civilityTitleSaga() {
  yield all([
    takeLatest(ADD_CIVILITYTITLE, addCivilityTitle),
    takeLatest(UPDATE_CIVILITYTITLE, updateCivilityTitle),
    takeLatest(DELETE_CIVILITYTITLE, deleteCivilityTitle),
    takeLatest(GET_ALL_CIVILITYTITLES, getAllCivilityTitle),
  ]);
}
