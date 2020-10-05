import * as types from '../constants/clientConstants';


export const addClient = client => ({
  type: types.ADDCLIENT,
  client
});
export const getClient = () => ({
  type: types.GETCLIENT
});
