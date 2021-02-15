import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from '@redux-saga/core/effects';
import {
  UPDATE_OPERATION_ASSIGNMENT,
  UPDATE_OPERATION_ASSIGNMENT_FAILURE,
  UPDATE_OPERATION_ASSIGNMENT_SUCCESS,
  GET_TREE_DATA,
  GET_TREE_DATA_FAILURE,
  GET_TREE_DATA_SUCCESS,
  GET_ELIGIBLE_STAFF,
  GET_ELIGIBLE_STAFF_FAILURE,
  GET_ELIGIBLE_STAFF_SUCCESS,
  GET_STAFF_ASSIGNED_BY_OPERATION,
  GET_STAFF_ASSIGNED_BY_OPERATION_FAILURE,
  GET_STAFF_ASSIGNED_BY_OPERATION_SUCCESS,

  FILTER_STAFF_BY_EMAIL,
  FILTER_STAFF_BY_EMAIL_FAILURE,
  FILTER_STAFF_BY_EMAIL_SUCCESS,

  GET_CUSTOMER_CONTRACTS_BY_EMPLOYEE,
  GET_CUSTOMER_CONTRACTS_BY_EMPLOYEE_FAILURE,
  GET_CUSTOMER_CONTRACTS_BY_EMPLOYEE_SUCCESS,

  GET_CUSTOMER_CONTRACTS_BY_COMPANY_EMAIL,
  GET_CUSTOMER_CONTRACTS_BY_COMPANY_EMAIL_FAILURE,
  GET_CUSTOMER_CONTRACTS_BY_COMPANY_EMAIL_SUCCESS,

  GET_OPERATIONS_BY_EMPLOYEE_AND_CUSTOMER,
  GET_OPERATIONS_BY_EMPLOYEE_AND_CUSTOMER_FAILURE,
  GET_OPERATIONS_BY_EMPLOYEE_AND_CUSTOMER_SUCCESS,

  EXPORT_STAFF_ASSIGNMENT,
  EXPORT_STAFF_ASSIGNMENT_FAILURE,
  EXPORT_STAFF_ASSIGNMENT_SUCCESS
} from './constants';

import ENDPOINTS from '../../api/endpoints';

function* updateOperationAssignment(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.STAFF_ASSIGNMENT + '/updateStaffOperation',
      data
    });

    yield put({
      type: UPDATE_OPERATION_ASSIGNMENT_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: UPDATE_OPERATION_ASSIGNMENT_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getTreeData() {
  try {
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.STAFF_ASSIGNMENT + '/allTreeData',

    });

    yield put({
      type: GET_TREE_DATA_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_TREE_DATA_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getEligibleStaff(action) {
  try {
    const { data } = action;
    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.STAFF_ASSIGNMENT + '/eligibleStaff/' + data,

    });

    yield put({
      type: GET_ELIGIBLE_STAFF_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_ELIGIBLE_STAFF_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* filterStaffByEmail(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.STAFF_ASSIGNMENT + '/filterStaff/' + data
    });

    yield put({
      type: FILTER_STAFF_BY_EMAIL_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: FILTER_STAFF_BY_EMAIL_FAILURE,
      errors: errors.response.data.errors
    });
  }
}


function* getStaffAssignedByOperation(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.STAFF_ASSIGNMENT + '/staffAssignedByOperation',
      data
    });

    yield put({
      type: GET_STAFF_ASSIGNED_BY_OPERATION_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_STAFF_ASSIGNED_BY_OPERATION_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllCustomerContractsByCompanyEmail(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.STAFF_ASSIGNMENT + '/allCustomerContractsByCompanyEmail/' + data
    });

    yield put({
      type: GET_CUSTOMER_CONTRACTS_BY_COMPANY_EMAIL_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_CUSTOMER_CONTRACTS_BY_COMPANY_EMAIL_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllCustomerContractsByEmployee(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'get',
      url: ENDPOINTS.STAFF_ASSIGNMENT + '/allCustomerContractsByEmployee/' + data
    });

    yield put({
      type: GET_CUSTOMER_CONTRACTS_BY_EMPLOYEE_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_CUSTOMER_CONTRACTS_BY_EMPLOYEE_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* getAllOperationsByEmployeeAndCustomer(action) {
  try {
    const {
      data
    } = action;

    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.STAFF_ASSIGNMENT + '/allOperationsByEmployeeAndCustomer',
      data
    });

    yield put({
      type: GET_OPERATIONS_BY_EMPLOYEE_AND_CUSTOMER_SUCCESS,
      payload: request.data.payload
    });
  } catch (errors) {
    yield put({
      type: GET_OPERATIONS_BY_EMPLOYEE_AND_CUSTOMER_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

function* exportStaffAssignment(action) {
  try {
    const { data } = action;
    const request = yield axios({
      method: 'post',
      url: ENDPOINTS.STAFF_ASSIGNMENT + '/export',
      data,
      responseType: 'blob'
    });
    yield put({
      type: EXPORT_STAFF_ASSIGNMENT_SUCCESS,
      payload: request.data
    });
  } catch (errors) {
    yield put({
      type: EXPORT_STAFF_ASSIGNMENT_FAILURE,
      errors: errors.response.data.errors
    });
  }
}

export default function* staffAssignmentSaga() {
  yield all([
    takeLatest(UPDATE_OPERATION_ASSIGNMENT, updateOperationAssignment),
    takeLatest(GET_TREE_DATA, getTreeData),
    takeLatest(GET_ELIGIBLE_STAFF, getEligibleStaff),
    takeLatest(GET_STAFF_ASSIGNED_BY_OPERATION, getStaffAssignedByOperation),
    takeLatest(FILTER_STAFF_BY_EMAIL, filterStaffByEmail),
    takeLatest(GET_CUSTOMER_CONTRACTS_BY_EMPLOYEE, getAllCustomerContractsByEmployee),
    takeLatest(GET_CUSTOMER_CONTRACTS_BY_COMPANY_EMAIL, getAllCustomerContractsByCompanyEmail),
    takeLatest(GET_OPERATIONS_BY_EMPLOYEE_AND_CUSTOMER, getAllOperationsByEmployeeAndCustomer),
    takeLatest(EXPORT_STAFF_ASSIGNMENT, exportStaffAssignment)
  ]);
}
