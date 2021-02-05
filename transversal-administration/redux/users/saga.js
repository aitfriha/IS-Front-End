import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  ADD_USER,
  ADD_USER_FAILURE,
  ADD_USER_SUCCESS,
  DELETE_USER,
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  GET_ALL_USERS,
  GET_ALL_USERS_FAILURE,
  GET_ALL_USERS_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_FAILURE,
  UPDATE_USER_SUCCESS,
  FORGETPASSWORD_USER,
  FORGETPASSWORD_USER_SUCCESS,
  FORGETPASSWORD_USER_FAILURE,
  GETBYEMAIL_USER,
  GETBYEMAIL_USER_SUCCESS,
  GETBYEMAIL_USER_FAILURE,
  CHANGEPASSWORD_USER,
  CHANGEPASSWORD_USER_SUCCESS,
  CHANGEPASSWORD_USER_FAILURE,
} from './constants';

import ENDPOINTS from '../../../app/api/endpoints';

function* addUser(action) {
  try {
    const { user } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.STAFF + '/user/add',
      data: user
    });

    yield put({
      type: ADD_USER_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_USER_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* updateUser(action) {
  try {
    const {
      userWithId
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.ADMINISTRATION.USER + '/update',
      data: userWithId
    });

    yield put({
      type: UPDATE_USER_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_USER_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getUserByEmail(action) {
  try {
    const {
      userEmail
    } = action;

    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.ADMINISTRATION.USER + '/byemail/' + userEmail,
    });

    yield put({
      type: GETBYEMAIL_USER_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GETBYEMAIL_USER_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* forgetPasswordUser(action) {
  try {
    const {
      userEmail
    } = action;
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.STAFF + '/user/forgetPassword/' + userEmail,
      data: userEmail
    });

    yield put({
      type: FORGETPASSWORD_USER_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: FORGETPASSWORD_USER_FAILURE,
      errors: errors.response.data.errors
    });
  }
}
function* changePasswordUser(action) {
  try {
    const {
      data
    } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.ADMINISTRATION.USER + '/changePassword',
      data,

    });

    yield put({
      type: CHANGEPASSWORD_USER_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: CHANGEPASSWORD_USER_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteUser(action) {
  try {
    const {
      userId
    } = action;

    const request = yield axios({
      method: 'delete',
      url: ENDPOINTS.ADMINISTRATION.USER + '/delete/' + userId
    });

    yield put({
      type: DELETE_USER_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_USER_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* getAllUsers() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.ADMINISTRATION.USER + '/all'
    });

    yield put({
      type: GET_ALL_USERS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_USERS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* usersSaga() {
  yield all([
    takeLatest(CHANGEPASSWORD_USER, changePasswordUser),
    takeLatest(GETBYEMAIL_USER, getUserByEmail),
    takeLatest(FORGETPASSWORD_USER, forgetPasswordUser),
    takeLatest(ADD_USER, addUser),
    takeLatest(UPDATE_USER, updateUser),
    takeLatest(DELETE_USER, deleteUser),
    takeLatest(GET_ALL_USERS, getAllUsers),
  ]);
}
