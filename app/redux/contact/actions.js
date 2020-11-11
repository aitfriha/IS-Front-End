import {
  ADD_CONTACT,
  DELETE_CONTACT,
  GET_ALL_CONTACTS,
  UPDATE_CONTACT
} from './constants';

export const addContact = (contact) => ({
  type: ADD_CONTACT,
  contact
});

export const updateContact = (contactWithId) => ({
  type: UPDATE_CONTACT,
  contactWithId
});

export const deleteContact = (contactId) => ({
  type: DELETE_CONTACT,
  contactId
});

export const getAllContact = () => ({
  type: GET_ALL_CONTACTS,
});
