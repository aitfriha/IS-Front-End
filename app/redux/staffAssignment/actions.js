import {
  GET_TREE_DATA,
  GET_ELIGIBLE_STAFF,
  GET_STAFF_ASSIGNED_BY_OPERATION,
  UPDATE_OPERATION_ASSIGNMENT,
  FILTER_STAFF_BY_EMAIL,
  GET_CUSTOMER_CONTRACTS_BY_EMPLOYEE,
  GET_CUSTOMER_CONTRACTS_BY_COMPANY_EMAIL,
  GET_OPERATIONS_BY_EMPLOYEE_AND_CUSTOMER,
  EXPORT_STAFF_ASSIGNMENT
} from './constants';

export const getTreeData = () => ({
  type: GET_TREE_DATA
});

export const updateOperationAssignment = (data) => ({
  type: UPDATE_OPERATION_ASSIGNMENT,
  data
});

export const getEligibleStaff = (data) => ({
  type: GET_ELIGIBLE_STAFF,
  data
});

export const filterStaffByEmail = (data) => ({
  type: FILTER_STAFF_BY_EMAIL,
  data
});

export const getStaffAssignedByOperation = (data) => ({
  type: GET_STAFF_ASSIGNED_BY_OPERATION,
  data
});

export const getAllCustomerContractsByEmployee = (data) => ({
  type: GET_CUSTOMER_CONTRACTS_BY_EMPLOYEE,
  data
});

export const getAllCustomerContractsByCompanyEmail = (data) => ({
  type: GET_CUSTOMER_CONTRACTS_BY_COMPANY_EMAIL,
  data
});

export const getAllOperationsByEmployeeAndCustomer = (data) => ({
  type: GET_OPERATIONS_BY_EMPLOYEE_AND_CUSTOMER,
  data
});

export const exportStaffAssignment = (data) => ({
  type: EXPORT_STAFF_ASSIGNMENT,
  data
});
