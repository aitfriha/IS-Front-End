import {
  ADD_ASSIGNMENT_TYPE,
  UPDATE_ASSIGNMENT_TYPE,
  DELETE_ASSIGNMENT_TYPE,
  GET_ALL_ASSIGNMENT_TYPES
} from './constants';

export const addAssignmentType = (data) => ({
  type: ADD_ASSIGNMENT_TYPE,
  data
});

export const updateAssignmentType = (data) => ({
  type: UPDATE_ASSIGNMENT_TYPE,
  data
});

export const deleteAssignmentType = (data) => ({
  type: DELETE_ASSIGNMENT_TYPE,
  data
});

export const getAllAssignmentTypes = () => ({
  type: GET_ALL_ASSIGNMENT_TYPES,
});
