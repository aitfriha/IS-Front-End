import {
  GET_ALL_PERSON_TYPES,
  ADD_PERSON_TYPE,
  UPDATE_PERSON_TYPE,
  DELETE_PERSON_TYPE

} from './constants';

export const getAllPersonTypes = () => ({
  type: GET_ALL_PERSON_TYPES
});

export const addPersonType = (data) => ({
  type: ADD_PERSON_TYPE,
  data
});

export const updatePersonType = (data) => ({
  type: UPDATE_PERSON_TYPE,
  data
});

export const deletePersonType = (data) => ({
  type: DELETE_PERSON_TYPE,
  data
});
