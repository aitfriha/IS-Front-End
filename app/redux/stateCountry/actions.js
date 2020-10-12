import {
  ADD_STATECOUNTRY,
  DELETE_STATECOUNTRY,
  GET_ALL_STATECOUNTRYS,
  UPDATE_STATECOUNTRY
} from './constants';

export const addStateCountry = (stateCountry) => ({
  type: ADD_STATECOUNTRY,
  stateCountry
});

export const updateStateCountry = (stateCountryWithId) => ({
  type: UPDATE_STATECOUNTRY,
  stateCountryWithId
});

export const deleteStateCountry = (stateCountryId) => ({
  type: DELETE_STATECOUNTRY,
  stateCountryId
});

export const getAllStateCountry = () => ({
  type: GET_ALL_STATECOUNTRYS,
});
