import {
  ADD_LEGALCATEGORYTYPE,
  DELETE_LEGALCATEGORYTYPE,
  GET_ALL_LEGALCATEGORYTYPES,
  GET_ALL_LEGALCATEGORYTYPES_BY_COMPANY,
  UPDATE_LEGALCATEGORYTYPE
} from './constants';

export const saveLegalCategoryType = legalCategoryType => ({
  type: ADD_LEGALCATEGORYTYPE,
  legalCategoryType
});

export const updateLegalCategoryType = legalCategoryTypeWithId => ({
  type: UPDATE_LEGALCATEGORYTYPE,
  legalCategoryTypeWithId
});

export const deleteLegalCategoryType = (
  oldLegalCategoryTypeId,
  newLegalCategoryTypeId
) => ({
  type: DELETE_LEGALCATEGORYTYPE,
  oldLegalCategoryTypeId,
  newLegalCategoryTypeId
});

export const getAllLegalCategoryType = () => ({
  type: GET_ALL_LEGALCATEGORYTYPES
});

export const getAllLegalCategoryTypeByCompany = companyId => ({
  type: GET_ALL_LEGALCATEGORYTYPES_BY_COMPANY,
  companyId
});
