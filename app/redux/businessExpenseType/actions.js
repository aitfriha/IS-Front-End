import {
  ADD_BUSINESS_EXPENSE_TYPE,
  UPDATE_BUSINESS_EXPENSE_TYPE,
  DELETE_BUSINESS_EXPENSE_TYPE,
  GET_BUSINESS_EXPENSES_TYPES,

  ADD_BUSINESS_EXPENSE_SUBTYPE,
  UPDATE_BUSINESS_EXPENSE_SUBTYPE,
  DELETE_BUSINESS_EXPENSE_SUBTYPE
} from './constants';

export const addBusinessExpenseType = (data) => ({
  type: ADD_BUSINESS_EXPENSE_TYPE,
  data
});

export const updateBusinessExpenseType = (data) => ({
  type: UPDATE_BUSINESS_EXPENSE_TYPE,
  data
});

export const deleteBusinessExpenseType = (data) => ({
  type: DELETE_BUSINESS_EXPENSE_TYPE,
  data
});

export const getBusinessExpensesTypes = () => ({
  type: GET_BUSINESS_EXPENSES_TYPES
});

export const addBusinessExpenseSubtype = (data) => ({
  type: ADD_BUSINESS_EXPENSE_SUBTYPE,
  data
});

export const updateBusinessExpenseSubtype = (data) => ({
  type: UPDATE_BUSINESS_EXPENSE_SUBTYPE,
  data
});

export const deleteBusinessExpenseSubtype = (data) => ({
  type: DELETE_BUSINESS_EXPENSE_SUBTYPE,
  data
});
