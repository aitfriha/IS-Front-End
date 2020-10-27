import {
  ADD_COMMERCIALOPERATION,
  DELETE_COMMERCIALOPERATION,
  GET_ALL_COMMERCIALOPERATIONS,
  UPDATE_COMMERCIALOPERATION
} from './constants';

export const addCommercialOperation = (commercialOperation) => ({
  type: ADD_COMMERCIALOPERATION,
  commercialOperation
});

export const updateCommercialOperation = (commercialOperationSWithId) => ({
  type: UPDATE_COMMERCIALOPERATION,
  commercialOperationSWithId
});

export const deleteCommercialOperation = (commercialOperationId) => ({
  type: DELETE_COMMERCIALOPERATION,
  commercialOperationId
});

export const getAllCommercialOperation = () => ({
  type: GET_ALL_COMMERCIALOPERATIONS,
});
