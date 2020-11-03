import { SET_STAFF, SET_EDIT } from './constants';

export const setStaff = staff => ({
  type: SET_STAFF,
  staff
});

export const setEdit = isEdit => ({
  type: SET_EDIT,
  isEdit
});
