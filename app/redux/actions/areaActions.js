import * as types from '../constants/areaConstants';

export const addArea = area => ({
  type: types.ADDAREA,
  area
});
export const getArea = () => ({
  type: types.GETAREA
});
