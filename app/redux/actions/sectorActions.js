import * as types from '../constants/sectorConstants';

export const addSector = sector => ({
  type: types.ADDSECTOR,
  sector
});
export const getSector = () => ({
  type: types.GETSECTOR
});
