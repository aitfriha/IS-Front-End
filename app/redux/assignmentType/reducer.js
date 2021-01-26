import {
  ADD_ASSIGNMENT_TYPE,
  ADD_ASSIGNMENT_TYPE_FAILURE,
  ADD_ASSIGNMENT_TYPE_SUCCESS,
  UPDATE_ASSIGNMENT_TYPE,
  UPDATE_ASSIGNMENT_TYPE_FAILURE,
  UPDATE_ASSIGNMENT_TYPE_SUCCESS,
  DELETE_ASSIGNMENT_TYPE,
  DELETE_ASSIGNMENT_TYPE_FAILURE,
  DELETE_ASSIGNMENT_TYPE_SUCCESS,
  GET_ALL_ASSIGNMENT_TYPES,
  GET_ALL_ASSIGNMENT_TYPES_FAILURE,
  GET_ALL_ASSIGNMENT_TYPES_SUCCESS
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  assignmentTypeResponse: '',
  assignmentTypes: []
};

export default function assignmentTypeReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case GET_ALL_ASSIGNMENT_TYPES:
    case ADD_ASSIGNMENT_TYPE:
    case UPDATE_ASSIGNMENT_TYPE:
    case DELETE_ASSIGNMENT_TYPE:
      return {
        ...state,
        isLoading: true
      };

      // SUCCESS ACTIONS
    case GET_ALL_ASSIGNMENT_TYPES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        assignmentTypes: action.payload,
      };
    case ADD_ASSIGNMENT_TYPE_SUCCESS:
    case UPDATE_ASSIGNMENT_TYPE_SUCCESS:
    case DELETE_ASSIGNMENT_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        assignmentTypeResponse: action.payload,
        errors: {}
      };


      // FAILURE ACTIONS
    case GET_ALL_ASSIGNMENT_TYPES_FAILURE:
    case ADD_ASSIGNMENT_TYPE_FAILURE:
    case UPDATE_ASSIGNMENT_TYPE_FAILURE:
    case DELETE_ASSIGNMENT_TYPE_FAILURE:
      return {
        ...state,
        isLoading: false,
        assignmentTypeResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
