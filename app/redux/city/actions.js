import {
  ADD_CITY,
  IMPORT_CITY,
  DELETE_CITY,
  GET_ALL_CITYS,
  UPDATE_CITY,
  GET_ALL_CITYBYSTATE
} from './constants';


export const addCity = (city) => ({
  type: ADD_CITY,
  city
});
export const importCity = (city) => ({
  type: IMPORT_CITY,
  city
});

export const updateCity = (cityWithId) => ({
  type: UPDATE_CITY,
  cityWithId
});

export const deleteCity = (cityId) => ({
  type: DELETE_CITY,
  cityId
});

export const getAllCitys = () => ({
  type: GET_ALL_CITYS,
});

export const getAllCityByState = (stateWithId) => ({
  type: GET_ALL_CITYBYSTATE,
  stateWithId
});

