import * as types from '../constants/functionaStructureConfigModule';

export const addLevelConfig = levelConfig => ({
  type: types.ADDLEVELCONFIG,
  levelConfig
});
export const getLevelConfig = () => ({
  type: types.GETLEVELCONFIG
});

export const setLevelConfig = levelsConfig => ({
  type: types.SETLEVELCONFIG,
  levelsConfig
});
