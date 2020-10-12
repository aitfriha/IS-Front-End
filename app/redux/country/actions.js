import {
  ADD_COUNTRY,
  DELETE_COUNTRY,
  GET_ALL_COUNTRYS,
  UPDATE_COUNTRY
} from './constants';

export const addCountry = (country) => ({
  type: ADD_COUNTRY,
  country
});

export const updateCountry = (countryWithId) => ({
  type: UPDATE_COUNTRY,
  countryWithId
});

export const deleteCountry = (countryId) => ({
  type: DELETE_COUNTRY,
  countryId
});

export const getAllCountry = () => ({
  type: GET_ALL_COUNTRYS,
});
