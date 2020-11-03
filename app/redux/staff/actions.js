import {
  SET_STAFF,
  SET_EDIT,
  ADD_STAFF,
  DELETE_STAFF,
  GET_ALL_STAFFS,
  UPDATE_STAFF
} from './constants';

export const addCommercialOperationStatus = staff => ({
  type: ADD_STAFF,
  staff
});

export const updateCommercialOperationStatus = staffWithId => ({
  type: UPDATE_STAFF,
  staffWithId
});

export const deleteCommercialOperationStatus = staffId => ({
  type: DELETE_STAFF,
  staffId
});

export const getAllCommercialOperationStatus = () => ({
  type: GET_ALL_STAFFS
});

export const setStaff = staff => ({
  type: SET_STAFF,
  staff
});

export const setEdit = isEdit => ({
  type: SET_EDIT,
  isEdit
});
