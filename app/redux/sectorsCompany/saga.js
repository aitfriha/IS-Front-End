import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  ADD_SECTORCOMPANY,
  ADD_SECTORCOMPANY_FAILURE,
  ADD_SECTORCOMPANY_SUCCESS,
  DELETE_SECTORCOMPANY,
  DELETE_SECTORCOMPANY_FAILURE,
  DELETE_SECTORCOMPANY_SUCCESS,
  GET_ALL_SECTORCOMPANYS,
  GET_ALL_SECTORCOMPANYS_FAILURE,
  GET_ALL_SECTORCOMPANYS_SUCCESS,
  UPDATE_SECTORCOMPANY,
  UPDATE_SECTORCOMPANY_FAILURE,
  UPDATE_SECTORCOMPANY_SUCCESS,
  GET_ALL_CHILDSECTORCOMPANYS,
  GET_ALL_CHILDSECTORCOMPANYS_SUCCESS,
  GET_ALL_CHILDSECTORCOMPANYS_FAILURE,
  GET_ALL_PRIMARYSECTORCOMPANYS,
  GET_ALL_PRIMARYSECTORCOMPANYS_SUCCESS,
  GET_ALL_PRIMARYSECTORCOMPANYS_FAILURE,

  GET_ALL_SUBCHILDSECTORCOMPANYS,
  GET_ALL_SUBCHILDSECTORCOMPANYS_SUCCESS,
  GET_ALL_SUBCHILDSECTORCOMPANYS_FAILURE,

  DELETECONFIRMATION_SECTORCOMPANY,
  DELETECONFIRMATION_SECTORCOMPANY_FAILURE,
  DELETECONFIRMATION_SECTORCOMPANY_SUCCESS,
} from './constants';

import ENDPOINTS from '../../api/endpoints';


function* addSectorCompany(action) {
  try {
    const { sectorCompany } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.SECTORCOMPANY + '/add',
      data: sectorCompany,
    });

    yield put({
      type: ADD_SECTORCOMPANY_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: ADD_SECTORCOMPANY_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* updateSectorCompany(action) {
  try {
    const {
      sectorCompanyWithId
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.SECTORCOMPANY + '/update',
      data: sectorCompanyWithId
    });

    yield put({
      type: UPDATE_SECTORCOMPANY_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_SECTORCOMPANY_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteSectorCompany(action) {
  try {
    const {
      firstSectorName, secondSectorName, thirdSectorName
    } = action;

    const request = yield axios({
      method: 'delete',
      url: ENDPOINTS.SECTORCOMPANY + '/deleteVerfication/' + firstSectorName + '/' + secondSectorName + '/' + thirdSectorName
    });

    yield put({
      type: DELETE_SECTORCOMPANY_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETE_SECTORCOMPANY_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* deleteConfirmationSectorCompany(action) {
  try {
    const {
      firstSectorName, secondSectorName, thirdSectorName
    } = action;

    const request = yield axios({
      method: 'delete',
      url: ENDPOINTS.SECTORCOMPANY + '/deleteConfirmation/' + firstSectorName + '/' + secondSectorName + '/' + thirdSectorName
    });

    yield put({
      type: DELETECONFIRMATION_SECTORCOMPANY_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: DELETECONFIRMATION_SECTORCOMPANY_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* getAllSectorCompany() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.SECTORCOMPANY + '/all'
    });
    yield put({
      type: GET_ALL_SECTORCOMPANYS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_SECTORCOMPANYS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllChildSectorCompany(action) {
  try {
    const {
      parentName
    } = action;
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.SECTORCOMPANY + '/sectorByParent/' + parentName
    });
    yield put({
      type: GET_ALL_CHILDSECTORCOMPANYS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_CHILDSECTORCOMPANYS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllSubChildSectorCompany(action) {
  try {
    const {
      parentName
    } = action;
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.SECTORCOMPANY + '/allSectorByParent/' + parentName
    });
    yield put({
      type: GET_ALL_SUBCHILDSECTORCOMPANYS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_SUBCHILDSECTORCOMPANYS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllPrimarySectorCompany() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.SECTORCOMPANY + '/primarySector'
    });
    yield put({
      type: GET_ALL_PRIMARYSECTORCOMPANYS_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ALL_PRIMARYSECTORCOMPANYS_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* sectorCompanySaga() {
  yield all([
    takeLatest(ADD_SECTORCOMPANY, addSectorCompany),
    takeLatest(UPDATE_SECTORCOMPANY, updateSectorCompany),
    takeLatest(DELETE_SECTORCOMPANY, deleteSectorCompany),
    takeLatest(DELETECONFIRMATION_SECTORCOMPANY, deleteConfirmationSectorCompany),
    takeLatest(GET_ALL_SECTORCOMPANYS, getAllSectorCompany),
    takeLatest(GET_ALL_CHILDSECTORCOMPANYS, getAllChildSectorCompany),
    takeLatest(GET_ALL_SUBCHILDSECTORCOMPANYS, getAllSubChildSectorCompany),
    takeLatest(GET_ALL_PRIMARYSECTORCOMPANYS, getAllPrimarySectorCompany),
  ]);
}
