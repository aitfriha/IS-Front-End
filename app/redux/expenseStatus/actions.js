import {

  ADD_EXPENSE_STATUS,
  UPDATE_EXPENSE_STATUS,
  DELETE_EXPENSE_STATUS,
  GET_ALL_EXPENSES_STATUS

} from './constants';

export const addExpenseStatus = (data) => ({
  type: ADD_EXPENSE_STATUS,
  data
});

export const updateExpenseStatus = (data) => ({
  type: UPDATE_EXPENSE_STATUS,
  data
});

export const deleteExpenseStatus = (data) => ({
  type: DELETE_EXPENSE_STATUS,
  data
});

export const getAllExpenseStatus = () => ({
  type: GET_ALL_EXPENSES_STATUS
});
