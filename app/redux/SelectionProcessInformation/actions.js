import {
  ADD_SELECTIONPROCESSINFORMATION,
  DELETE_SELECTIONPROCESSINFORMATION,
  GET_ALL_SELECTIONPROCESSINFORMATIONS,
  UPDATE_SELECTIONPROCESSINFORMATION
} from './constants';

export const saveSelectionProcessInformation = selectionProcessInformation => ({
  type: ADD_SELECTIONPROCESSINFORMATION,
  selectionProcessInformation
});

export const updateSelectionProcessInformation = selectionProcessInformationWithId => ({
  type: UPDATE_SELECTIONPROCESSINFORMATION,
  selectionProcessInformationWithId
});

export const deleteSelectionProcessInformation = selectionProcessId => ({
  type: DELETE_SELECTIONPROCESSINFORMATION,
  selectionProcessId
});

export const getAllSelectionProcessInformation = () => ({
  type: GET_ALL_SELECTIONPROCESSINFORMATIONS
});
