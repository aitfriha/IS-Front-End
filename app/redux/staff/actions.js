import {
  ADD_STAFF,
  DELETE_STAFF,
  GET_ALL_STAFFS,
  UPDATE_STAFF,
  SET_STAFF,
  SET_EDIT
} from './constants';

export const addStaff = staff => ({
  type: ADD_STAFF,
  staff
});

export const updateStaff = staffWithId => ({
  type: UPDATE_STAFF,
  staffWithId
});

export const deleteStaff = staffId => ({
  type: DELETE_STAFF,
  staffId
});

export const getAllStaff = () => ({
  type: GET_ALL_STAFFS
});
