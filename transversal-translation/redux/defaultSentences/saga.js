import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  ADD_DEFAULT_SENTENCE,
  ADD_DEFAULT_SENTENCE_FAILURE,
  ADD_DEFAULT_SENTENCE_SUCCESS,
  DELETE_DEFAULT_SENTENCE,
  DELETE_DEFAULT_SENTENCE_FAILURE,
  DELETE_DEFAULT_SENTENCE_SUCCESS,
  GET_ALL_DEFAULT_SENTENCES,
  GET_ALL_DEFAULT_SENTENCES_FAILURE,
  GET_ALL_DEFAULT_SENTENCES_SUCCESS,
  UPDATE_DEFAULT_SENTENCE,
  UPDATE_DEFAULT_SENTENCE_FAILURE,
  UPDATE_DEFAULT_SENTENCE_SUCCESS
} from './constants';

import ENDPOINTS from '../../../app/api/endpoints';

function* addDefaultSentence(action) {
  try {
    const { defaultSentence } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.TRANSLATION.DEFAULT_SENTENCE + '/add',
      data: defaultSentence
    });

    yield put({
      type: ADD_DEFAULT_SENTENCE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_DEFAULT_SENTENCE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* updateDefaultSentence(action) {
  try {
    const {
      defaultSentenceWithId
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.TRANSLATION.DEFAULT_SENTENCE + '/update',
      data: defaultSentenceWithId
    });

    yield put({
      type: UPDATE_DEFAULT_SENTENCE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_DEFAULT_SENTENCE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteDefaultSentence(action) {
  try {
    const {
      defaultSentenceId
    } = action;

    const request = yield axios({
      method: 'delete',
      url: ENDPOINTS.TRANSLATION.DEFAULT_SENTENCE + '/delete/' + defaultSentenceId
    });

    yield put({
      type: DELETE_DEFAULT_SENTENCE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_DEFAULT_SENTENCE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* getAllDefaultSentences() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.TRANSLATION.DEFAULT_SENTENCE + '/all'
    });

    yield put({
      type: GET_ALL_DEFAULT_SENTENCES_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_DEFAULT_SENTENCES_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* defaultSentencesSaga() {
  yield all([
    takeLatest(ADD_DEFAULT_SENTENCE, addDefaultSentence),
    takeLatest(UPDATE_DEFAULT_SENTENCE, updateDefaultSentence),
    takeLatest(DELETE_DEFAULT_SENTENCE, deleteDefaultSentence),
    takeLatest(GET_ALL_DEFAULT_SENTENCES, getAllDefaultSentences),
  ]);
}
