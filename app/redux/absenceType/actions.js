import {
  ADD_ABSENCETYPE,
  DELETE_ABSENCETYPE,
  GET_ALL_ABSENCETYPES,
  GET_ALL_ABSENCETYPES_BY_STATE,
  UPDATE_ABSENCETYPE
} from './constants';

export const saveAbsenceType = absenceType => ({
  type: ADD_ABSENCETYPE,
  absenceType
});

export const updateAbsenceType = absenceTypeWithId => ({
  type: UPDATE_ABSENCETYPE,
  absenceTypeWithId
});

export const deleteAbsenceType = (absenceTypeId, newAbsenceTypeId) => ({
  type: DELETE_ABSENCETYPE,
  absenceTypeId,
  newAbsenceTypeId
});

export const getAllAbsenceType = () => ({
  type: GET_ALL_ABSENCETYPES
});

export const getAllAbsenceTypeByState = stateId => ({
  type: GET_ALL_ABSENCETYPES_BY_STATE,
  stateId
});
