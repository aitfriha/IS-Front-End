import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  ADD_LEGALCATEGORYTYPE,
  ADD_LEGALCATEGORYTYPE_FAILURE,
  ADD_LEGALCATEGORYTYPE_SUCCESS,
  DELETE_LEGALCATEGORYTYPE,
  DELETE_LEGALCATEGORYTYPE_FAILURE,
  DELETE_LEGALCATEGORYTYPE_SUCCESS,
  GET_ALL_LEGALCATEGORYTYPES,
  GET_ALL_LEGALCATEGORYTYPES_FAILURE,
  GET_ALL_LEGALCATEGORYTYPES_SUCCESS,
  GET_ALL_LEGALCATEGORYTYPES_BY_COMPANY,
  GET_ALL_LEGALCATEGORYTYPES_BY_COMPANY_FAILURE,
  GET_ALL_LEGALCATEGORYTYPES_BY_COMPANY_SUCCESS,
  UPDATE_LEGALCATEGORYTYPE,
  UPDATE_LEGALCATEGORYTYPE_FAILURE,
  UPDATE_LEGALCATEGORYTYPE_SUCCESS
} from './constants';

import ENDPOINTS from '../../api/endpoints';

function* saveLegalCategoryType(action) {
  try {
    const { legalCategoryType } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.LEGALCATEGORYTYPE + '/add',
      data: legalCategoryType
    });

    yield put({
      type: ADD_LEGALCATEGORYTYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_LEGALCATEGORYTYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* updateLegalCategoryType(action) {
  try {
    const { legalCategoryTypeWithId } = action;

    const request = yield axios({
      method: 'put',
      url: ENDPOINTS.LEGALCATEGORYTYPE + '/update',
      data: legalCategoryTypeWithId
    });

    yield put({
      type: UPDATE_LEGALCATEGORYTYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_LEGALCATEGORYTYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteLegalCategoryType(action) {
  try {
    const { oldLegalCategoryTypeId, newLegalCategoryTypeId } = action;

    console.log(new Date().toISOString().slice(0, 10));
    const request = yield axios({
      method: 'delete',
      url:
        ENDPOINTS.LEGALCATEGORYTYPE
        + '/delete/oldId='
        + oldLegalCategoryTypeId
        + '&newId='
        + newLegalCategoryTypeId
    });

    yield put({
      type: DELETE_LEGALCATEGORYTYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_LEGALCATEGORYTYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllLegalCategoryType() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.LEGALCATEGORYTYPE + '/all'
    });
    yield put({
      type: GET_ALL_LEGALCATEGORYTYPES_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_LEGALCATEGORYTYPES_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllLegalCategoryTypeByCompany(action) {
  try {
    const { companyId } = action;

    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.LEGALCATEGORYTYPE + '/all-by-company/' + companyId
    });
    yield put({
      type: GET_ALL_LEGALCATEGORYTYPES_BY_COMPANY_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_LEGALCATEGORYTYPES_BY_COMPANY_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* legalCategoryTypeSaga() {
  yield all([
    takeLatest(ADD_LEGALCATEGORYTYPE, saveLegalCategoryType),
    takeLatest(UPDATE_LEGALCATEGORYTYPE, updateLegalCategoryType),
    takeLatest(DELETE_LEGALCATEGORYTYPE, deleteLegalCategoryType),
    takeLatest(GET_ALL_LEGALCATEGORYTYPES, getAllLegalCategoryType),
    takeLatest(
      GET_ALL_LEGALCATEGORYTYPES_BY_COMPANY,
      getAllLegalCategoryTypeByCompany
    )
  ]);
}
