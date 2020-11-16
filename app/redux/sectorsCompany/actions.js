import {
  ADD_SECTORCOMPANY,
  DELETE_SECTORCOMPANY,
  DELETECONFIRMATION_SECTORCOMPANY,
  GET_ALL_SECTORCOMPANYS,
  UPDATE_SECTORCOMPANY,
  GET_ALL_CHILDSECTORCOMPANYS,
  GET_ALL_PRIMARYSECTORCOMPANYS,
  GET_ALL_SUBCHILDSECTORCOMPANYS

} from './constants';

export const addSectorCompany = (sectorCompany) => ({
  type: ADD_SECTORCOMPANY,
  sectorCompany
});

export const updateSectorCompany = (sectorCompanyWithId) => ({
  type: UPDATE_SECTORCOMPANY,
  sectorCompanyWithId
});

export const deleteSectorCompany = (firstSectorName, secondSectorName, thirdSectorName) => ({
  type: DELETE_SECTORCOMPANY,
  firstSectorName,
  secondSectorName,
  thirdSectorName
});

export const deleteConfirmationSectorCompany = (firstSectorName, secondSectorName, thirdSectorName) => ({
  type: DELETECONFIRMATION_SECTORCOMPANY,
  firstSectorName,
  secondSectorName,
  thirdSectorName
});

export const getAllSectorCompany = () => ({
  type: GET_ALL_SECTORCOMPANYS,
});

export const getAllChildSectorCompany = (parentName) => ({
  type: GET_ALL_CHILDSECTORCOMPANYS,
  parentName
});

export const getAllSubChildSectorCompany = (parentName) => ({
  type: GET_ALL_SUBCHILDSECTORCOMPANYS,
  parentName
});

export const getAllPrimarySectorCompany = () => ({
  type: GET_ALL_PRIMARYSECTORCOMPANYS,
});
