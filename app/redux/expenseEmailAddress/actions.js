import {
  ADD_EXPENSE_EMAIL_ADDRESS,
  UPDATE_EXPENSE_EMAIL_ADDRESS,
  DELETE_EXPENSE_EMAIL_ADDRESS,
  GET_ALL_EXPENSE_EMAIL_ADDRESSES,

} from './constants';
export const addExpenseEmailAddress = (data) => ({
  type: ADD_EXPENSE_EMAIL_ADDRESS,
  data
});

export const updateExpenseEmailAddress = (data) => ({
  type: UPDATE_EXPENSE_EMAIL_ADDRESS,
  data
});

export const deleteExpenseEmailAddress = (data) => ({
  type: DELETE_EXPENSE_EMAIL_ADDRESS,
  data
});

export const getAllExpenseEmailAddresses = () => ({
  type: GET_ALL_EXPENSE_EMAIL_ADDRESSES
});
