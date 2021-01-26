import {
  GET_ALL_VOUCHER_TYPES,
  ADD_VOUCHER_TYPE,
  UPDATE_VOUCHER_TYPE,
  DELETE_VOUCHER_TYPE

} from './constants';

export const getAllVoucherTypes = () => ({
  type: GET_ALL_VOUCHER_TYPES
});

export const addVoucherType = (data) => ({
  type: ADD_VOUCHER_TYPE,
  data
});

export const updateVoucherType = (data) => ({
  type: UPDATE_VOUCHER_TYPE,
  data
});

export const deleteVoucherType = (data) => ({
  type: DELETE_VOUCHER_TYPE,
  data
});
