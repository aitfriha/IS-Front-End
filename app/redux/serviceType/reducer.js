import {
  ADD_COMMERCIALSERVICETYPE,
  ADD_COMMERCIALSERVICETYPE_FAILURE,
  ADD_COMMERCIALSERVICETYPE_SUCCESS,
  DELETE_COMMERCIALSERVICETYPE,
  DELETE_COMMERCIALSERVICETYPE_FAILURE,
  DELETE_COMMERCIALSERVICETYPE_SUCCESS,
  GET_ALL_COMMERCIALSERVICETYPES,
  GET_ALL_COMMERCIALSERVICETYPES_FAILURE,
  GET_ALL_COMMERCIALSERVICETYPES_SUCCESS,
  UPDATE_COMMERCIALSERVICETYPE,
  UPDATE_COMMERCIALSERVICETYPE_FAILURE,
  UPDATE_COMMERCIALSERVICETYPE_SUCCESS,

  UPDATE_DELETE_COMMERCIALSERVICETYPE,
  UPDATE_DELETE_COMMERCIALSERVICETYPE_FAILURE,
  UPDATE_DELETE_COMMERCIALSERVICETYPE_SUCCESS,
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  commercialServiceTypeResponse: '',
  allCommercialServiceType: []
};

export default function commercialServiceTypeReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case GET_ALL_COMMERCIALSERVICETYPES:
    case ADD_COMMERCIALSERVICETYPE:
    case UPDATE_COMMERCIALSERVICETYPE:
    case UPDATE_DELETE_COMMERCIALSERVICETYPE:
    case DELETE_COMMERCIALSERVICETYPE:
      return {
        ...state,
        isLoading: true,
        commercialServiceTypeResponse: ''
      };

      // SUCCESS ACTIONS
    case ADD_COMMERCIALSERVICETYPE_SUCCESS:
    case UPDATE_COMMERCIALSERVICETYPE_SUCCESS:
    case UPDATE_DELETE_COMMERCIALSERVICETYPE_SUCCESS:
    case DELETE_COMMERCIALSERVICETYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        commercialServiceTypeResponse: action.payload,
        errors: {}
      };

    case GET_ALL_COMMERCIALSERVICETYPES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allCommercialServiceType: action.payload,
        commercialServiceTypeResponse: ''
      };

      // FAILURE ACTIONS
    case GET_ALL_COMMERCIALSERVICETYPES_FAILURE:
    case ADD_COMMERCIALSERVICETYPE_FAILURE:
    case UPDATE_COMMERCIALSERVICETYPE_FAILURE:
    case UPDATE_DELETE_COMMERCIALSERVICETYPE_FAILURE:
    case DELETE_COMMERCIALSERVICETYPE_FAILURE:
      return {
        ...state,
        isLoading: false,
        commercialServiceTypeResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
