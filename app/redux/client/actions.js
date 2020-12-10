import {
  ADD_CLIENT_COMMERCIAL,
  DELETE_CLIENT,
  GET_ALL_CLIENTS,
  GET_ALL_CLIENTS_BYCOUNTRY,
  UPDATE_CLIENT,
  IMPORT_CLIENT_COMMERCIAL
} from './constants';

export const addClientCommercial = (client) => ({
  type: ADD_CLIENT_COMMERCIAL,
  client
});
export const importClientCommercial = (client) => ({
  type: IMPORT_CLIENT_COMMERCIAL,
  client
});

export const updateClient = (clientWithId) => ({
  type: UPDATE_CLIENT,
  clientWithId
});

export const deleteClient = (clientId) => ({
  type: DELETE_CLIENT,
  clientId
});

export const getAllClient = () => ({
  type: GET_ALL_CLIENTS,
});

export const getAllClientByCountry = (country) => ({
  type: GET_ALL_CLIENTS_BYCOUNTRY,
  country
});
