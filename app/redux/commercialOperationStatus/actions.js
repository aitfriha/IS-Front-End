import {
  ADD_COMMERCIALOPERATIONSTATUS,
  DELETE_COMMERCIALOPERATIONSTATUS,
  GET_ALL_COMMERCIALOPERATIONSTATUSS,
  UPDATE_COMMERCIALOPERATIONSTATUS
} from './constants';

export const addCommercialOperationStatus = (commercialOperationStatus) => ({
  type: ADD_COMMERCIALOPERATIONSTATUS,
  commercialOperationStatus
});

export const updateCommercialOperationStatus = (commercialOperationStatusWithId) => ({
  type: UPDATE_COMMERCIALOPERATIONSTATUS,
  commercialOperationStatusWithId
});

export const deleteCommercialOperationStatus = (commercialOperationStatusId) => ({
  type: DELETE_COMMERCIALOPERATIONSTATUS,
  commercialOperationStatusId
});

export const getAllCommercialOperationStatus = () => ({
  type: GET_ALL_COMMERCIALOPERATIONSTATUSS,
});
