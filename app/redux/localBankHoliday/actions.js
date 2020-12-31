import {
  ADD_LOCALBANKHOLIDAY,
  DELETE_LOCALBANKHOLIDAY,
  GET_ALL_LOCALBANKHOLIDAYS,
  GET_ALL_LOCALBANKHOLIDAYS_BY_COMPANY,
  UPDATE_LOCALBANKHOLIDAY
} from './constants';

export const saveLocalBankHoliday = localBankHoliday => ({
  type: ADD_LOCALBANKHOLIDAY,
  localBankHoliday
});

export const updateLocalBankHoliday = localBankHolidayWithId => ({
  type: UPDATE_LOCALBANKHOLIDAY,
  localBankHolidayWithId
});

export const deleteLocalBankHoliday = localBankHolidayId => ({
  type: DELETE_LOCALBANKHOLIDAY,
  localBankHolidayId
});

export const getAllLocalBankHoliday = () => ({
  type: GET_ALL_LOCALBANKHOLIDAYS
});

export const getAllLocalBankHolidayByCompany = companyId => ({
  type: GET_ALL_LOCALBANKHOLIDAYS_BY_COMPANY,
  companyId
});
