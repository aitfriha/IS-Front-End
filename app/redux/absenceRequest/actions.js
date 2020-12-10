import {
  ADD_ABSENCEREQUEST,
  DELETE_ABSENCEREQUEST,
  GET_ALL_ABSENCEREQUESTS,
  UPDATE_ABSENCEREQUEST
} from './constants';

export const saveAbsenceRequest = absenceRequest => ({
  type: ADD_ABSENCEREQUEST,
  absenceRequest
});

export const updateAbsenceRequest = absenceRequestWithId => ({
  type: UPDATE_ABSENCEREQUEST,
  absenceRequestWithId
});

export const deleteAbsenceRequest = absenceRequestId => ({
  type: DELETE_ABSENCEREQUEST,
  absenceRequestId
});

export const getAllAbsenceRequest = () => ({
  type: GET_ALL_ABSENCEREQUESTS
});
