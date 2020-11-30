import {
  GET_ALL_FUNCTIONALSTRUCTUREASSIGNATIONHISTORIES,
  GET_ALL_FUNCTIONALSTRUCTUREASSIGNATIONHISTORIES_BY_LEVEL
} from './constants';

export const getAllFunctionalStructureAssignationHistory = () => ({
  type: GET_ALL_FUNCTIONALSTRUCTUREASSIGNATIONHISTORIES
});

export const getAllFunctionalStructureAssignationHistoryByLevel = levelId => ({
  type: GET_ALL_FUNCTIONALSTRUCTUREASSIGNATIONHISTORIES_BY_LEVEL,
  levelId
});
