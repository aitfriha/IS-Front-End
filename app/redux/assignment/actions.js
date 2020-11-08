import {
  ADD_ASSIGNMENT,
  DELETE_ASSIGNMENT,
  GET_ALL_ASSIGNMENTS,
  UPDATE_ASSIGNMENT
} from './constants';

export const addAssignment = (assignment) => ({
  type: ADD_ASSIGNMENT,
  assignment
});

export const updateAssignment = (assignmentWithId) => ({
  type: UPDATE_ASSIGNMENT,
  assignmentWithId
});

export const deleteAssignment = (assignmentId) => ({
  type: DELETE_ASSIGNMENT,
  assignmentId
});

export const getAllAssignment = () => ({
  type: GET_ALL_ASSIGNMENTS,
});
