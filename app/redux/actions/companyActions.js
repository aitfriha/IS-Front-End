import * as types from '../constants/companyConstants';

export const addCompany = company => ({
  type: types.ADDCOMPANY,
  company
});
export const getCompany = () => ({
  type: types.GETCOMPANY
});
