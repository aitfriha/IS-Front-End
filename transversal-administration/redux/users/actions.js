import {
  ADD_USER,
  DELETE_USER,
  GET_ALL_USERS,
  UPDATE_USER,
  FORGETPASSWORD_USER,
  GETBYEMAIL_USER,
  CHANGEPASSWORD_USER
} from './constants';

export const addUser = (user) => ({
  type: ADD_USER,
  user
});
export const updateUser = (userWithId) => ({
  type: UPDATE_USER,
  userWithId
});

export const getUserByEmail = (userEmail) => ({
  type: GETBYEMAIL_USER,
  userEmail
});

export const forgetPasswordUser = (userEmail) => ({
  type: FORGETPASSWORD_USER,
  userEmail
});
export const changePasswordUser = (data) => ({
  type: CHANGEPASSWORD_USER,
  data
});

export const deleteUser = (userId) => ({
  type: DELETE_USER,
  userId
});

export const getAllUsers = () => ({
  type: GET_ALL_USERS,
});
