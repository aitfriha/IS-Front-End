import {
  ADD_CONTRACTMODEL,
  DELETE_CONTRACTMODEL,
  GET_ALL_CONTRACTMODELS,
  UPDATE_CONTRACTMODEL
} from './constants';

export const saveContractModel = contractModel => ({
  type: ADD_CONTRACTMODEL,
  contractModel
});

export const updateContractModel = contractModelWithId => ({
  type: UPDATE_CONTRACTMODEL,
  contractModelWithId
});

export const deleteContractModel = (
  oldContractModelId,
  newContractModelId
) => ({
  type: DELETE_CONTRACTMODEL,
  oldContractModelId,
  newContractModelId
});

export const getAllContractModel = () => ({
  type: GET_ALL_CONTRACTMODELS
});
