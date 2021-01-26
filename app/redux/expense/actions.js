import {
  GET_EXPENSES,
  SAVE_EXPENSE,
  SAVE_EXPENSE_WITH_FILE,
  CHANGE_STATUS_EXPENSE,
  EXPORT_EXPENSES,
  DOWNLOAD_DOCUMENT_OF_EXPENSE
} from './constants';

export const getExpenses = (data) => ({
  type: GET_EXPENSES,
  data
});

export const saveExpense = (data) => ({
  type: SAVE_EXPENSE,
  data
});

export const saveExpenseWithFile = (data) => ({
  type: SAVE_EXPENSE_WITH_FILE,
  data
});

export const changeStatusExpense = (data) => ({
  type: CHANGE_STATUS_EXPENSE,
  data
});

export const exportExpenses = (data) => ({
  type: EXPORT_EXPENSES,
  data
});

export const downloadDocumentOfExpense = (data) => ({
  type: DOWNLOAD_DOCUMENT_OF_EXPENSE,
  data
});
