import {
  GET_TRAVEL_REQUESTS,
  ADD_TRAVEL_REQUEST,
  UPDATE_TRAVEL_REQUEST,
  CHANGE_STATUS_TRAVEL_REQUEST,
  APPROVE_TRAVEL_REQUEST,
  GET_COUNTRIES,
  EXPORT_TRAVEL_REQUESTS,
  DOWNLOAD_DOCUMENTS_OF_TRAVEL_REQUEST
} from './constants';

export const getTravelRequests = (data) => ({
  type: GET_TRAVEL_REQUESTS,
  data
});

export const addTravelRequest = (data) => ({
  type: ADD_TRAVEL_REQUEST,
  data
});

export const updateTravelRequest = (data) => ({
  type: UPDATE_TRAVEL_REQUEST,
  data
});

export const changeStatusTravelRequest = (data) => ({
  type: CHANGE_STATUS_TRAVEL_REQUEST,
  data
});

export const getCountries = () => ({
  type: GET_COUNTRIES
});

export const exportTravelRequests = (data) => ({
  type: EXPORT_TRAVEL_REQUESTS,
  data
});

export const approveTravelRequest = (data) => ({
  type: APPROVE_TRAVEL_REQUEST,
  data
});

export const downloadDocumentsOfTravelRequest = (data) => ({
  type: DOWNLOAD_DOCUMENTS_OF_TRAVEL_REQUEST,
  data
});
