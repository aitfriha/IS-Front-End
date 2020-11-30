import {
  UPDATE_STAFFCONTRACT,
  GET_ALL_STAFFCONTRACT_BY_CONTRACTTYPE,
  GET_ALL_STAFFCONTRACT_BY_LEGALCATEGORYTYPE,
  GET_ALL_STAFFCONTRACT_BY_CONTRACTMODEL
} from './constants';

export const updateStaffContract = staffContractWithId => ({
  type: UPDATE_STAFFCONTRACT,
  staffContractWithId
});

export const getAllStaffContractByContractType = contractTypeId => ({
  type: GET_ALL_STAFFCONTRACT_BY_CONTRACTTYPE,
  contractTypeId
});

export const getAllStaffContractByLegalCategoryType = legalCategoryTypeId => ({
  type: GET_ALL_STAFFCONTRACT_BY_LEGALCATEGORYTYPE,
  legalCategoryTypeId
});

export const getAllStaffContractByContractModel = contractModelId => ({
  type: GET_ALL_STAFFCONTRACT_BY_CONTRACTMODEL,
  contractModelId
});
