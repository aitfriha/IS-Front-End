import {
  ADD_COMMERCIALSERVICETYPE,
  DELETE_COMMERCIALSERVICETYPE,
  GET_ALL_COMMERCIALSERVICETYPES,
  UPDATE_COMMERCIALSERVICETYPE,
  UPDATE_DELETE_COMMERCIALSERVICETYPE,
} from './constants';

export const addCommercialServiceType = (commercialServiceType) => ({
  type: ADD_COMMERCIALSERVICETYPE,
  commercialServiceType
});

export const updateCommercialServiceType = (commercialServiceTypeWithId) => ({
  type: UPDATE_COMMERCIALSERVICETYPE,
  commercialServiceTypeWithId
});

export const updateDeleteCommercialServiceType = (serviceType, listOperation) => ({
  type: UPDATE_DELETE_COMMERCIALSERVICETYPE,
  serviceType,
  listOperation
});

export const deleteCommercialServiceType = (commercialServiceTypeId) => ({
  type: DELETE_COMMERCIALSERVICETYPE,
  commercialServiceTypeId
});

export const getAllCommercialServiceType = () => ({
  type: GET_ALL_COMMERCIALSERVICETYPES,
});
