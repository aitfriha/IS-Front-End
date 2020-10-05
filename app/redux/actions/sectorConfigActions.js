import * as types from '../constants/sectorConfigModule';


export const addSectorConfig = sectorConfig => ({
  type: types.ADDSECTORCONFIG,
  sectorConfig
});
export const getSectorConfig = () => ({
  type: types.GETSECTORCONFIG
});

export const setSectorConfig = (sectorsConfig) => ({
  type: types.SETSECTORCONFIG,
  sectorsConfig
});
