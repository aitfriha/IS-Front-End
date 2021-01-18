import {
  ADD_ASSIGNMENT,
  DELETE_ASSIGNMENT,
  GET_ALL_ASSIGNMENTS,
  UPDATE_ASSIGNMENT,
  GET_ALL_ASSIGNMENTS_BY_STAFF
} from './constants';

export const addAssignment = (assignment) => ({
  type: ADD_ASSIGNMENT,
  assignment
});

export const updateAssignment = (assignmentWithId) => ({
  type: UPDATE_ASSIGNMENT,
  assignmentWithId
});

export const deleteAssignment = (clientId) => ({
  type: DELETE_ASSIGNMENT,
  clientId
});

export const getAllAssignment = () => ({
  type: GET_ALL_ASSIGNMENTS,
});

export const getAssignmentByStaff = (staffId) => ({
  type: GET_ALL_ASSIGNMENTS_BY_STAFF,
  staffId
});
