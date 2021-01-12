import {
  ADD_SELECTIONTYPEEVALUATION,
  DELETE_SELECTIONTYPEEVALUATION,
  GET_ALL_SELECTIONTYPEEVALUATIONS,
  GET_ALL_SELECTIONTYPEEVALUATIONS_BY_TYPE,
  UPDATE_SELECTIONTYPEEVALUATION
} from './constants';

export const saveSelectionTypeEvaluation = selectionTypeEvaluation => ({
  type: ADD_SELECTIONTYPEEVALUATION,
  selectionTypeEvaluation
});

export const updateSelectionTypeEvaluation = selectionTypeEvaluationWithId => ({
  type: UPDATE_SELECTIONTYPEEVALUATION,
  selectionTypeEvaluationWithId
});

export const deleteSelectionTypeEvaluation = selectionTypeEvaluationId => ({
  type: DELETE_SELECTIONTYPEEVALUATION,
  selectionTypeEvaluationId
});

export const getAllSelectionTypeEvaluation = () => ({
  type: GET_ALL_SELECTIONTYPEEVALUATIONS
});

export const getAllSelectionTypeEvaluationByType = selectionType => ({
  type: GET_ALL_SELECTIONTYPEEVALUATIONS_BY_TYPE,
  selectionType
});
