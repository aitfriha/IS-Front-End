import {
  ADD_TRAVEL_REQUEST_EMAIL_ADDRESS,
  UPDATE_TRAVEL_REQUEST_EMAIL_ADDRESS,
  DELETE_TRAVEL_REQUEST_EMAIL_ADDRESS,
  GET_ALL_TRAVEL_REQUEST_EMAIL_ADDRESSES,

} from './constants';

export const addTravelRequestEmailAddress = (data) => ({
  type: ADD_TRAVEL_REQUEST_EMAIL_ADDRESS,
  data
});

export const updateTravelRequestEmailAddress = (data) => ({
  type: UPDATE_TRAVEL_REQUEST_EMAIL_ADDRESS,
  data
});

export const deleteTravelRequestEmailAddress = (data) => ({
  type: DELETE_TRAVEL_REQUEST_EMAIL_ADDRESS,
  data
});

export const getAllTravelRequestEmailAddresses = () => ({
  type: GET_ALL_TRAVEL_REQUEST_EMAIL_ADDRESSES
});
