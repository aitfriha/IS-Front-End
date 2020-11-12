import {
  ADD_CONTACT,
  ADD_CONTACT_FAILURE,
  ADD_CONTACT_SUCCESS,
  DELETE_CONTACT,
  DELETE_CONTACT_FAILURE,
  DELETE_CONTACT_SUCCESS,
  GET_ALL_CONTACTS,
  GET_ALL_CONTACTS_FAILURE,
  GET_ALL_CONTACTS_SUCCESS,
  UPDATE_CONTACT,
  UPDATE_CONTACT_FAILURE,
  UPDATE_CONTACT_SUCCESS
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  contactResponse: '',
  allContacts: []
};

export default function contactReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case GET_ALL_CONTACTS:
    case ADD_CONTACT:
    case UPDATE_CONTACT:
    case DELETE_CONTACT:
      return {
        ...state,
        isLoading: true,
        contactResponse: ''
      };

      // SUCCESS ACTIONS
    case ADD_CONTACT_SUCCESS:
    case UPDATE_CONTACT_SUCCESS:
    case DELETE_CONTACT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        contactResponse: action.payload,
        errors: {}
      };

    case GET_ALL_CONTACTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allContacts: action.payload,
        contactResponse: ''
      };

      // FAILURE ACTIONS
    case GET_ALL_CONTACTS_FAILURE:
    case ADD_CONTACT_FAILURE:
    case UPDATE_CONTACT_FAILURE:
    case DELETE_CONTACT_FAILURE:
      return {
        ...state,
        isLoading: false,
        contactResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
