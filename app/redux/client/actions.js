import {
  ADD_CLIENT,
  DELETE_CLIENT,
  GET_ALL_CLIENTS,
  UPDATE_CLIENT
} from './constants';

export const addClient = (client) => ({
  type: ADD_CLIENT,
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
