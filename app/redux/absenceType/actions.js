import {
  ADD_ABSENCETYPE,
  DELETE_ABSENCETYPE,
  GET_ALL_ABSENCETYPES,
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

export const deleteAbsenceType = absenceTypeId => ({
  type: DELETE_ABSENCETYPE,
  absenceTypeId
});

export const getAllAbsenceType = () => ({
  type: GET_ALL_ABSENCETYPES
});
