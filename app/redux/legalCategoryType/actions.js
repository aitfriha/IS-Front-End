import {
  ADD_LEGALCATEGORYTYPE,
  DELETE_LEGALCATEGORYTYPE,
  GET_ALL_LEGALCATEGORYTYPES,
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

export const deleteLegalCategoryType = legalCategoryTypeId => ({
  type: DELETE_LEGALCATEGORYTYPE,
  legalCategoryTypeId
});

export const getAllLegalCategoryType = () => ({
  type: GET_ALL_LEGALCATEGORYTYPES
});
