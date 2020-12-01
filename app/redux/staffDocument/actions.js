import {
  ADD_STAFFDOCUMENT,
  DELETE_STAFFDOCUMENT
} from './constants';

export const addStaffDocument = staffDocument => ({
  type: ADD_STAFFDOCUMENT,
  staffDocument
});

export const deleteStaffDocument = staffDocumentId => ({
  type: DELETE_STAFFDOCUMENT,
  staffDocumentId
});
