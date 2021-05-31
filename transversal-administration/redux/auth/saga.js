import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';

import ENDPOINTS from '../../../app/api/endpoints';
import {
  SIGN_IN, SIGN_IN_FAILURE, SIGN_IN_SUCCESS, SIGN_OUT, SIGN_OUT_SUCCESS
} from './constants';

import { setJWTInAxiosHeaderAndLocalStorage } from '../security/security';

function* signIn(action) {
  try {
    const { authBody } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.AUTH,
      data: authBody,
    });
    // Save the token into locale storage & put it in axios authorization header
    setJWTInAxiosHeaderAndLocalStorage(request.data.payload.token);

    yield put({
      type: SIGN_IN_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: SIGN_IN_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* signOut(action) {
  const { history } = action;
  // Remove the token from locale storage & axios authorization header
  setJWTInAxiosHeaderAndLocalStorage(false);

  // go to login page
  history.push('/login');

  yield put({
    type: SIGN_OUT_SUCCESS,
  });
}

export default function* authSaga() {
  yield all([
    takeLatest(SIGN_IN, signIn),
    takeLatest(SIGN_OUT, signOut),
  ]);
}
