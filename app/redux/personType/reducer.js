import {

  ADD_PERSON_TYPE,
  ADD_PERSON_TYPE_FAILURE,
  ADD_PERSON_TYPE_SUCCESS,

  UPDATE_PERSON_TYPE,
  UPDATE_PERSON_TYPE_FAILURE,
  UPDATE_PERSON_TYPE_SUCCESS,

  DELETE_PERSON_TYPE,
  DELETE_PERSON_TYPE_FAILURE,
  DELETE_PERSON_TYPE_SUCCESS,

  GET_ALL_PERSON_TYPES,
  GET_ALL_PERSON_TYPES_FAILURE,
  GET_ALL_PERSON_TYPES_SUCCESS,

} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  personTypeResponse: '',
  personTypes: []
};

export default function personTypeReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case ADD_PERSON_TYPE:
    case UPDATE_PERSON_TYPE:
    case DELETE_PERSON_TYPE:
    case GET_ALL_PERSON_TYPES:
      return {
        ...state,
        isLoading: true
      };

      // SUCCESS ACTIONS
    case GET_ALL_PERSON_TYPES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        personTypes: action.payload,
      };
    case UPDATE_PERSON_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        personTypeResponse: action.payload,
        errors: {}
      };
    case ADD_PERSON_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        personTypeResponse: action.payload,
        errors: {}
      };
    case DELETE_PERSON_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        personTypeResponse: action.payload,
        errors: {}
      };


      // FAILURE ACTIONS
    case ADD_PERSON_TYPE_FAILURE:
    case UPDATE_PERSON_TYPE_FAILURE:
    case DELETE_PERSON_TYPE_FAILURE:
    case GET_ALL_PERSON_TYPES_FAILURE:
      return {
        ...state,
        isLoading: false,
        personTypeResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
