import {
  ADD_STAFF,
  ADD_STAFF_FAILURE,
  ADD_STAFF_SUCCESS,
  DELETE_STAFF,
  DELETE_STAFF_FAILURE,
  DELETE_STAFF_SUCCESS,
  GET_ALL_STAFFS,
  GET_ALL_STAFFS_FAILURE,
  GET_ALL_STAFFS_SUCCESS,
  UPDATE_STAFF,
  UPDATE_STAFF_FAILURE,
  UPDATE_STAFF_SUCCESS
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  staffResponse: '',
  allStaffs: []
};

export default function staffReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case GET_ALL_STAFFS:
    case ADD_STAFF:
    case UPDATE_STAFF:
    case DELETE_STAFF:
      return {
        ...state,
        isLoading: true,
        staffResponse: ''
      };

      // SUCCESS ACTIONS
    case ADD_STAFF_SUCCESS:
    case UPDATE_STAFF_SUCCESS:
    case DELETE_STAFF_SUCCESS:
      return {
        ...state,
        isLoading: false,
        staffResponse: action.payload,
        errors: {}
      };

    case GET_ALL_STAFFS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allStaffs: action.payload,
        staffResponse: ''
      };

      // FAILURE ACTIONS
    case GET_ALL_STAFFS_FAILURE:
    case ADD_STAFF_FAILURE:
    case UPDATE_STAFF_FAILURE:
    case DELETE_STAFF_FAILURE:
      return {
        ...state,
        isLoading: false,
        staffResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
