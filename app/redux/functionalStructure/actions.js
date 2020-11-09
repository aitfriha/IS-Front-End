import {
  ADD_FUNCTIONALSTRUCTURELEVEL,
  DELETE_FUNCTIONALSTRUCTURELEVEL,
  GET_ALL_FUNCTIONALSTRUCTURELEVELS,
  GET_ALL_FUNCTIONALSTRUCTURELEVELS_BY_TYPE,
  UPDATE_FUNCTIONALSTRUCTURELEVEL
} from './constants';

export const saveFunctionalStructureLevel = functionalStructureLevel => ({
  type: ADD_FUNCTIONALSTRUCTURELEVEL,
  functionalStructureLevel
});

export const updateFunctionalStructureLevel = functionalStructureLevelWithId => ({
  type: UPDATE_FUNCTIONALSTRUCTURELEVEL,
  functionalStructureLevelWithId
});

export const deleteFunctionalStructureLevel = functionalStructureLevelId => ({
  type: DELETE_FUNCTIONALSTRUCTURELEVEL,
  functionalStructureLevelId
});

export const getAllFunctionalStructureLevel = () => ({
  type: GET_ALL_FUNCTIONALSTRUCTURELEVELS
});

export const getAllFunctionalStructureLevelByType = levelType => ({
  type: GET_ALL_FUNCTIONALSTRUCTURELEVELS_BY_TYPE,
  levelType
});
