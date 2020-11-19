import {
  ADD_CONTACTBYOPERATION,
  DELETE_CONTACTBYOPERATION,
  GET_ALL_CONTACTBYOPERATIONS,
  UPDATE_CONTACTBYOPERATION
} from './constants';

export const addContactByOperation = (contactByOperation) => ({
  type: ADD_CONTACTBYOPERATION,
  contactByOperation
});

export const updateContactByOperation = (contactByOperationWithId) => ({
  type: UPDATE_CONTACTBYOPERATION,
  contactByOperationWithId
});

export const deleteContactByOperation = (contactByOperationId) => ({
  type: DELETE_CONTACTBYOPERATION,
  contactByOperationId
});

export const getAllContactByOperation = () => ({
  type: GET_ALL_CONTACTBYOPERATIONS,
});
