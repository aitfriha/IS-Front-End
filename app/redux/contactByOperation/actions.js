import {
  ADD_CONTACTBYOPERATION,
  DELETE_CONTACTBYOPERATION,
  GET_ALL_CONTACTBYOPERATIONS,
  UPDATE_CONTACTBYOPERATION,
  GET_ONE_CONTACTBYOPERATIONS
} from './constants';

export const addContactByOperation = (contactByOperation) => ({
  type: ADD_CONTACTBYOPERATION,
  contactByOperation
});

export const updateContactByOperation = (contactByOperationWithId) => ({
  type: UPDATE_CONTACTBYOPERATION,
  contactByOperationWithId
});

export const getContactByOperationById = (contactByOperationWithId) => ({
  type: GET_ONE_CONTACTBYOPERATIONS,
  contactByOperationWithId
});

export const deleteContactByOperation = (contactByOperationId,contactTypeName) => ({
  type: DELETE_CONTACTBYOPERATION,
  contactByOperationId,
  contactTypeName
});

export const getAllContactByOperation = () => ({
  type: GET_ALL_CONTACTBYOPERATIONS,
});
