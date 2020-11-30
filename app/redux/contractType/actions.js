import {
  ADD_CONTRACTTYPE,
  DELETE_CONTRACTTYPE,
  GET_ALL_CONTRACTTYPES,
  GET_ALL_CONTRACTTYPES_BY_STATE,
  UPDATE_CONTRACTTYPE
} from './constants';

export const saveContractType = contractType => ({
  type: ADD_CONTRACTTYPE,
  contractType
});

export const updateContractType = contractTypeWithId => ({
  type: UPDATE_CONTRACTTYPE,
  contractTypeWithId
});

export const deleteContractType = (oldContractTypeId, newContractTypeId) => ({
  type: DELETE_CONTRACTTYPE,
  oldContractTypeId,
  newContractTypeId
});

export const getAllContractType = () => ({
  type: GET_ALL_CONTRACTTYPES
});

export const getAllContractTypeByState = stateId => ({
  type: GET_ALL_CONTRACTTYPES_BY_STATE,
  stateId
});
