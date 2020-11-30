import {
  GET_ALL_ADMINISTRATIVESTRUCTUREASSIGNATIONHISTORIES,
  GET_ALL_ADMINISTRATIVESTRUCTUREASSIGNATIONHISTORIES_BY_LEVEL
} from './constants';

export const getAllAdministrativeStructureAssignationHistory = () => ({
  type: GET_ALL_ADMINISTRATIVESTRUCTUREASSIGNATIONHISTORIES
});

export const getAllAdministrativeStructureAssignationHistoryByLevel = levelId => ({
  type: GET_ALL_ADMINISTRATIVESTRUCTUREASSIGNATIONHISTORIES_BY_LEVEL,
  levelId
});
