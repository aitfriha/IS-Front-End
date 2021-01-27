import {
  ADD_USER,
  DELETE_USER,
  GET_ALL_USERS,
  UPDATE_USER,
  FORGETPASSWORD_USER
} from './constants';

export const addUser = (user) => ({
  type: ADD_USER,
  user
});
export const updateUser = (userWithId) => ({
  type: UPDATE_USER,
  userWithId
});

export const forgetPasswordUser = (userEmail) => ({
  type: FORGETPASSWORD_USER,
  userEmail
});

export const deleteUser = (userId) => ({
  type: DELETE_USER,
  userId
});

export const getAllUsers = () => ({
  type: GET_ALL_USERS,
});
