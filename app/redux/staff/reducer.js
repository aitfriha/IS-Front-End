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
  UPDATE_STAFF_SUCCESS,
  SET_STAFF,
  SET_EDIT
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  staffResponse: '',
  allStaff: [],
  staff: {},
  isEdit: false
};

export default function staffReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STAFF:
      return {
        ...state,
        staff: action.staff
      };

    case SET_EDIT:
      return {
        ...state,
        isEdit: action.isEdit
      };
    // TRIGGERING ACTIONS
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
        allStaff: action.payload,
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
