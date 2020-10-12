import {
  ADD_STATECOUNTRY,
  ADD_STATECOUNTRY_FAILURE,
  ADD_STATECOUNTRY_SUCCESS,
  DELETE_STATECOUNTRY,
  DELETE_STATECOUNTRY_FAILURE,
  DELETE_STATECOUNTRY_SUCCESS,
  GET_ALL_STATECOUNTRYS,
  GET_ALL_STATECOUNTRYS_FAILURE,
  GET_ALL_STATECOUNTRYS_SUCCESS,
  UPDATE_STATECOUNTRY,
  UPDATE_STATECOUNTRY_FAILURE,
  UPDATE_STATECOUNTRY_SUCCESS,

  GET_ALL_STATECOUNTRYSBYCOUNTRY,
  GET_ALL_STATECOUNTRYSBYCOUNTRY_SUCCESS,
  GET_ALL_STATECOUNTRYSBYCOUNTRY_FAILURE,
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  stateCountryResponse: '',
  allStateCountrys: []
};

export default function stateCountryReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case GET_ALL_STATECOUNTRYS:
    case GET_ALL_STATECOUNTRYSBYCOUNTRY:
    case ADD_STATECOUNTRY:
    case UPDATE_STATECOUNTRY:
    case DELETE_STATECOUNTRY:
      return {
        ...state,
        isLoading: true,
        stateCountryResponse: ''
      };

      // SUCCESS ACTIONS
    case ADD_STATECOUNTRY_SUCCESS:
    case UPDATE_STATECOUNTRY_SUCCESS:
    case DELETE_STATECOUNTRY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        stateCountryResponse: action.payload,
        errors: {}
      };

    case GET_ALL_STATECOUNTRYS_SUCCESS:
    case GET_ALL_STATECOUNTRYSBYCOUNTRY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allStateCountrys: action.payload,
        stateCountryResponse: ''
      };


      // FAILURE ACTIONS
    case GET_ALL_STATECOUNTRYS_FAILURE:
    case GET_ALL_STATECOUNTRYSBYCOUNTRY_FAILURE:
    case ADD_STATECOUNTRY_FAILURE:
    case UPDATE_STATECOUNTRY_FAILURE:
    case DELETE_STATECOUNTRY_FAILURE:
      return {
        ...state,
        isLoading: false,
        stateCountryResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
