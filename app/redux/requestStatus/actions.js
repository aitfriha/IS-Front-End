import {
  ADD_REQUEST_STATUS,
  UPDATE_REQUEST_STATUS,
  DELETE_REQUEST_STATUS,
  GET_ALL_REQUEST_STATUS

} from './constants';

export const addRequestStatus = (data) => ({
  type: ADD_REQUEST_STATUS,
  data
});

export const updateRequestStatus = (data) => ({
  type: UPDATE_REQUEST_STATUS,
  data
});

export const deleteRequestStatus = (data) => ({
  type: DELETE_REQUEST_STATUS,
  data
});

export const getAllRequestStatus = () => ({
  type: GET_ALL_REQUEST_STATUS
});
