import {
  ADD_ASSIGNMENT,
  ADD_ASSIGNMENT_FAILURE,
  ADD_ASSIGNMENT_SUCCESS,
  DELETE_ASSIGNMENT,
  DELETE_ASSIGNMENT_FAILURE,
  DELETE_ASSIGNMENT_SUCCESS,
  GET_ALL_ASSIGNMENTS,
  GET_ALL_ASSIGNMENTS_FAILURE,
  GET_ALL_ASSIGNMENTS_SUCCESS,
  UPDATE_ASSIGNMENT,
  UPDATE_ASSIGNMENT_FAILURE,
  UPDATE_ASSIGNMENT_SUCCESS,

  GET_ALL_ASSIGNMENTS_BY_STAFF_SUCCESS,
  GET_ALL_ASSIGNMENTS_BY_STAFF_FAILURE
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  assignmentResponse: '',
  allAssignments: [],
  assignmentResponseList:  []
};

export default function assignmentReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case GET_ALL_ASSIGNMENTS:
    case ADD_ASSIGNMENT:
    case UPDATE_ASSIGNMENT:
    case DELETE_ASSIGNMENT:
      return {
        ...state,
        isLoading: true,
        assignmentResponse: ''
      };

      // SUCCESS ACTIONS
    case ADD_ASSIGNMENT_SUCCESS:
    case UPDATE_ASSIGNMENT_SUCCESS:
    case DELETE_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        assignmentResponse: action.payload,
        errors: {}
      };

    case GET_ALL_ASSIGNMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allAssignments: action.payload,
        assignmentResponse: ''
      };

    case GET_ALL_ASSIGNMENTS_BY_STAFF_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allAssignments: action.payload,
        assignmentResponse: 'ok',
      };

      // FAILURE ACTIONS
    case GET_ALL_ASSIGNMENTS_BY_STAFF_FAILURE:
    case GET_ALL_ASSIGNMENTS_FAILURE:
    case ADD_ASSIGNMENT_FAILURE:
    case UPDATE_ASSIGNMENT_FAILURE:
    case DELETE_ASSIGNMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        assignmentResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
