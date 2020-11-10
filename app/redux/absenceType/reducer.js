import {
  ADD_ABSENCETYPE,
  ADD_ABSENCETYPE_FAILURE,
  ADD_ABSENCETYPE_SUCCESS,
  DELETE_ABSENCETYPE,
  DELETE_ABSENCETYPE_FAILURE,
  DELETE_ABSENCETYPE_SUCCESS,
  GET_ALL_ABSENCETYPES,
  GET_ALL_ABSENCETYPES_FAILURE,
  GET_ALL_ABSENCETYPES_SUCCESS,
  GET_ALL_ABSENCETYPES_BY_STATE,
  GET_ALL_ABSENCETYPES_BY_STATE_FAILURE,
  GET_ALL_ABSENCETYPES_BY_STATE_SUCCESS,
  UPDATE_ABSENCETYPE,
  UPDATE_ABSENCETYPE_FAILURE,
  UPDATE_ABSENCETYPE_SUCCESS
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  absenceTypeResponse: '',
  allAbsenceType: [],
  allAbsenceTypeByState: []
};

export default function absenceTypeReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    // TRIGGERING ACTIONS
    case GET_ALL_ABSENCETYPES:
    case GET_ALL_ABSENCETYPES_BY_STATE:
    case ADD_ABSENCETYPE:
    case UPDATE_ABSENCETYPE:
    case DELETE_ABSENCETYPE:
      return {
        ...state,
        isLoading: true,
        absenceTypeResponse: ''
      };

    // SUCCESS ACTIONS
    case ADD_ABSENCETYPE_SUCCESS:
    case UPDATE_ABSENCETYPE_SUCCESS:
    case DELETE_ABSENCETYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        absenceTypeResponse: action.payload,
        errors: {}
      };

    case GET_ALL_ABSENCETYPES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allAbsenceType: action.payload,
        absenceTypeResponse: ''
      };
    case GET_ALL_ABSENCETYPES_BY_STATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allAbsenceTypeByState: action.payload,
        absenceTypeResponse: ''
      };

    // FAILURE ACTIONS
    case GET_ALL_ABSENCETYPES_FAILURE:
    case GET_ALL_ABSENCETYPES_BY_STATE_FAILURE:
    case ADD_ABSENCETYPE_FAILURE:
    case UPDATE_ABSENCETYPE_FAILURE:
    case DELETE_ABSENCETYPE_FAILURE:
      return {
        ...state,
        isLoading: false,
        absenceTypeResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
