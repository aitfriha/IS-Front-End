import {
  ADD_STAFF_EXPENSE_TYPE,
  UPDATE_STAFF_EXPENSE_TYPE,
  DELETE_STAFF_EXPENSE_TYPE,
  GET_STAFF_EXPENSES_TYPES,

  ADD_STAFF_EXPENSE_SUBTYPE,
  UPDATE_STAFF_EXPENSE_SUBTYPE,
  DELETE_STAFF_EXPENSE_SUBTYPE
} from './constants';

export const addStaffExpenseType = (data) => ({
  type: ADD_STAFF_EXPENSE_TYPE,
  data
});

export const updateStaffExpenseType = (data) => ({
  type: UPDATE_STAFF_EXPENSE_TYPE,
  data
});

export const deleteStaffExpenseType = (data) => ({
  type: DELETE_STAFF_EXPENSE_TYPE,
  data
});

export const getStaffExpensesTypes = () => ({
  type: GET_STAFF_EXPENSES_TYPES
});

export const addStaffExpenseSubtype = (data) => ({
  type: ADD_STAFF_EXPENSE_SUBTYPE,
  data
});

export const updateStaffExpenseSubtype = (data) => ({
  type: UPDATE_STAFF_EXPENSE_SUBTYPE,
  data
});

export const deleteStaffExpenseSubtype = (data) => ({
  type: DELETE_STAFF_EXPENSE_SUBTYPE,
  data
});
