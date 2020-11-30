import {
  ADD_ADMINISTRATIVESTRUCTURELEVEL,
  DELETE_ADMINISTRATIVESTRUCTURELEVEL,
  GET_ALL_ADMINISTRATIVESTRUCTURELEVELS,
  GET_ALL_ADMINISTRATIVESTRUCTURELEVELS_BY_TYPE,
  UPDATE_ADMINISTRATIVESTRUCTURELEVEL
} from './constants';

export const saveAdministrativeStructureLevel = administrativeStructureLevel => ({
  type: ADD_ADMINISTRATIVESTRUCTURELEVEL,
  administrativeStructureLevel
});

export const updateAdministrativeStructureLevel = administrativeStructureLevelWithId => ({
  type: UPDATE_ADMINISTRATIVESTRUCTURELEVEL,
  administrativeStructureLevelWithId
});

export const deleteAdministrativeStructureLevel = administrativeStructureLevelId => ({
  type: DELETE_ADMINISTRATIVESTRUCTURELEVEL,
  administrativeStructureLevelId
});

export const getAllAdministrativeStructureLevel = () => ({
  type: GET_ALL_ADMINISTRATIVESTRUCTURELEVELS
});

export const getAllAdministrativeStructureLevelByType = levelType => ({
  type: GET_ALL_ADMINISTRATIVESTRUCTURELEVELS_BY_TYPE,
  levelType
});
