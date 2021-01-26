import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  GET_ALL_TRANSLATE_SENTENCES,
  GET_ALL_TRANSLATE_SENTENCES_BY_COUNTRY_LANGUAGE,
  GET_ALL_TRANSLATE_SENTENCES_BY_COUNTRY_LANGUAGE_FAILURE,
  GET_ALL_TRANSLATE_SENTENCES_BY_COUNTRY_LANGUAGE_SUCCESS,
  GET_ALL_TRANSLATE_SENTENCES_DISTINCT_COUNTRY_LANGUAGES,
  GET_ALL_TRANSLATE_SENTENCES_DISTINCT_COUNTRY_LANGUAGES_FAILURE,
  GET_ALL_TRANSLATE_SENTENCES_DISTINCT_COUNTRY_LANGUAGES_SUCCESS,
  GET_ALL_TRANSLATE_SENTENCES_FAILURE,
  GET_ALL_TRANSLATE_SENTENCES_SUCCESS,
  UPDATE_TRANSLATE_SENTENCE,
  UPDATE_TRANSLATE_SENTENCE_FAILURE,
  UPDATE_TRANSLATE_SENTENCE_SUCCESS
} from './constants';

import ENDPOINTS from '../../../app/api/endpoints';

function* updateTranslateSentence(action) {
  try {
    const {
      translateSentence
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.TRANSLATION.TRANSLATE_SENTENCE + '/update',
      data: translateSentence
    });

    yield put({
      type: UPDATE_TRANSLATE_SENTENCE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_TRANSLATE_SENTENCE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllTranslateSentences() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.TRANSLATION.TRANSLATE_SENTENCE + '/all'
    });

    yield put({
      type: GET_ALL_TRANSLATE_SENTENCES_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_TRANSLATE_SENTENCES_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* getAllTranslateSentencesDistinctCountryLanguage() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.TRANSLATION.TRANSLATE_SENTENCE + '/distinctTranslateSentenceCountryLanguages'
    });

    yield put({
      type: GET_ALL_TRANSLATE_SENTENCES_DISTINCT_COUNTRY_LANGUAGES_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_TRANSLATE_SENTENCES_DISTINCT_COUNTRY_LANGUAGES_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* getAllTranslateSentencesByCountryLanguage(action) {
  const {
    countryLanguage
  } = action;

  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.TRANSLATION.TRANSLATE_SENTENCE + '/translateSentenceByCountryLanguageCode/' + countryLanguage
    });

    yield put({
      type: GET_ALL_TRANSLATE_SENTENCES_BY_COUNTRY_LANGUAGE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_TRANSLATE_SENTENCES_BY_COUNTRY_LANGUAGE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* translateSentencesSaga() {
  yield all([
    takeLatest(UPDATE_TRANSLATE_SENTENCE, updateTranslateSentence),
    takeLatest(GET_ALL_TRANSLATE_SENTENCES, getAllTranslateSentences),
    takeLatest(GET_ALL_TRANSLATE_SENTENCES_DISTINCT_COUNTRY_LANGUAGES, getAllTranslateSentencesDistinctCountryLanguage),
    takeLatest(GET_ALL_TRANSLATE_SENTENCES_BY_COUNTRY_LANGUAGE, getAllTranslateSentencesByCountryLanguage),
  ]);
}
