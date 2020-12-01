import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  UPDATE_STAFFCONTRACT,
  UPDATE_STAFFCONTRACT_FAILURE,
  UPDATE_STAFFCONTRACT_SUCCESS,
  GET_ALL_STAFFCONTRACT_BY_CONTRACTTYPE,
  GET_ALL_STAFFCONTRACT_BY_CONTRACTTYPE_FAILURE,
  GET_ALL_STAFFCONTRACT_BY_CONTRACTTYPE_SUCCESS,
  GET_ALL_STAFFCONTRACT_BY_LEGALCATEGORYTYPE,
  GET_ALL_STAFFCONTRACT_BY_LEGALCATEGORYTYPE_FAILURE,
  GET_ALL_STAFFCONTRACT_BY_LEGALCATEGORYTYPE_SUCCESS,
  GET_ALL_STAFFCONTRACT_BY_CONTRACTMODEL,
  GET_ALL_STAFFCONTRACT_BY_CONTRACTMODEL_FAILURE,
  GET_ALL_STAFFCONTRACT_BY_CONTRACTMODEL_SUCCESS
} from './constants';

import ENDPOINTS from '../../api/endpoints';

function* updateStaffContract(action) {
  try {
    const { staffContractWithId } = action;

    const request = yield axios({
      method: 'put',
      url: ENDPOINTS.STAFFCONTRACT + '/update',
      data: staffContractWithId
    });
    yield put({
      type: UPDATE_STAFFCONTRACT_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_STAFFCONTRACT_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllStaffContractByContractType(action) {
  try {
    const { contractTypeId } = action;

    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.STAFFCONTRACT + '/all-by-contractType/' + contractTypeId
    });
    yield put({
      type: GET_ALL_STAFFCONTRACT_BY_CONTRACTTYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_STAFFCONTRACT_BY_CONTRACTTYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllStaffContractByLegalCategoryType(action) {
  try {
    const { legalCategoryTypeId } = action;

    const request = yield axios({
      method: 'get',
      url:
        ENDPOINTS.STAFFCONTRACT
        + '/all-by-legalCategoryType/'
        + legalCategoryTypeId
    });
    yield put({
      type: GET_ALL_STAFFCONTRACT_BY_LEGALCATEGORYTYPE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_STAFFCONTRACT_BY_LEGALCATEGORYTYPE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllStaffContractByContractModel(action) {
  try {
    const { contractModelId } = action;

    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.STAFFCONTRACT + '/all-by-contractModel/' + contractModelId
    });
    yield put({
      type: GET_ALL_STAFFCONTRACT_BY_CONTRACTMODEL_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_STAFFCONTRACT_BY_CONTRACTMODEL_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* staffContractSaga() {
  yield all([
    takeLatest(UPDATE_STAFFCONTRACT, updateStaffContract),
    takeLatest(
      GET_ALL_STAFFCONTRACT_BY_CONTRACTTYPE,
      getAllStaffContractByContractType
    ),
    takeLatest(
      GET_ALL_STAFFCONTRACT_BY_LEGALCATEGORYTYPE,
      getAllStaffContractByLegalCategoryType
    ),
    takeLatest(
      GET_ALL_STAFFCONTRACT_BY_CONTRACTMODEL,
      getAllStaffContractByContractModel
    )
  ]);
}
