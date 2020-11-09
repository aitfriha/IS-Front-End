import {
  ADD_CONTRACTTYPE,
  DELETE_CONTRACTTYPE,
  GET_ALL_CONTRACTTYPES,
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

export const deleteContractType = contractTypeId => ({
  type: DELETE_CONTRACTTYPE,
  contractTypeId
});

export const getAllContractType = () => ({
  type: GET_ALL_CONTRACTTYPES
});
