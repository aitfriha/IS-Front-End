import {
  ADD_CIVILITYTITLE,
  DELETE_CIVILITYTITLE,
  GET_ALL_CIVILITYTITLES,
  UPDATE_CIVILITYTITLE
} from './constants';

export const addCivilityTitleStatus = (civilityTitle) => ({
  type: ADD_CIVILITYTITLE,
  civilityTitle
});

export const updateCivilityTitleStatus = (civilityTitleWithId) => ({
  type: UPDATE_CIVILITYTITLE,
  civilityTitleWithId
});

export const deleteCivilityTitleStatus = (civilityTitleId) => ({
  type: DELETE_CIVILITYTITLE,
  civilityTitleId
});

export const getAllCivilityTitleStatus = () => ({
  type: GET_ALL_CIVILITYTITLES,
});
