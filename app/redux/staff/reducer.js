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
  SET_EDIT,
  GET_ALL_ASSIGNED_FUNCTIONAL_LEVEL_STAFFS,
  GET_ALL_ASSIGNED_FUNCTIONAL_LEVEL_STAFFS_SUCCESS,
  GET_ALL_ASSIGNED_FUNCTIONAL_LEVEL_STAFFS_FAILURE,
  GET_STAFF_BY_COMPANY_EMAIL,
  GET_STAFF_BY_COMPANY_EMAIL_SUCCESS,
  GET_STAFF_BY_COMPANY_EMAIL_FAILURE
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  staffResponse: '',
  allStaff: [],
  selectedStaff: {},
  isEditStaff: false,
  staff: {}
};

export default function staffReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STAFF:
      return {
        ...state,
        selectedStaff: action.staff
      };

    case SET_EDIT:
      return {
        ...state,
        isEditStaff: action.isEdit
      };
    // TRIGGERING ACTIONS
    // TRIGGERING ACTIONS
    case GET_ALL_STAFFS:
    case GET_ALL_ASSIGNED_FUNCTIONAL_LEVEL_STAFFS:
    case ADD_STAFF:
    case UPDATE_STAFF:
    case DELETE_STAFF:
    case GET_STAFF_BY_COMPANY_EMAIL:
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
    case GET_ALL_ASSIGNED_FUNCTIONAL_LEVEL_STAFFS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allStaff: action.payload,
        staffResponse: ''
      };
    case GET_STAFF_BY_COMPANY_EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        staff: action.payload,
        staffResponse: ''
      }

    // FAILURE ACTIONS
    case GET_ALL_STAFFS_FAILURE:
    case GET_ALL_ASSIGNED_FUNCTIONAL_LEVEL_STAFFS_FAILURE:
    case ADD_STAFF_FAILURE:
    case UPDATE_STAFF_FAILURE:
    case DELETE_STAFF_FAILURE:
    case GET_STAFF_BY_COMPANY_EMAIL_FAILURE:
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
