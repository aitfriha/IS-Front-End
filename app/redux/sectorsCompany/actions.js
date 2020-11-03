import {
  ADD_SECTORCOMPANY,
  DELETE_SECTORCOMPANY,
  GET_ALL_SECTORCOMPANYS,
  UPDATE_SECTORCOMPANY,
  GET_ALL_CHILDSECTORCOMPANYS,
  GET_ALL_PRIMARYSECTORCOMPANYS,

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

export const getAllSectorCompany = () => ({
  type: GET_ALL_SECTORCOMPANYS,
});

export const getAllChildSectorCompany = (parentName) => ({
  type: GET_ALL_CHILDSECTORCOMPANYS,
  parentName
});

export const getAllPrimarySectorCompany = () => ({
  type: GET_ALL_PRIMARYSECTORCOMPANYS,
});
