import {
  ADD_COUNTRY,
  ADD_COUNTRY_FAILURE,
  ADD_COUNTRY_SUCCESS,
  DELETE_COUNTRY,
  DELETE_COUNTRY_FAILURE,
  DELETE_COUNTRY_SUCCESS,
  GET_ALL_COUNTRYS,
  GET_ALL_COUNTRYS_FAILURE,
  GET_ALL_COUNTRYS_SUCCESS,
  UPDATE_COUNTRY,
  UPDATE_COUNTRY_FAILURE,
  UPDATE_COUNTRY_SUCCESS
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  countryResponse: '',
  allCountrys: []
};

export default function countryReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case GET_ALL_COUNTRYS:
    case ADD_COUNTRY:
    case UPDATE_COUNTRY:
    case DELETE_COUNTRY:
      return {
        ...state,
        isLoading: true,
        countryResponse: ''
      };

      // SUCCESS ACTIONS
    case ADD_COUNTRY_SUCCESS:
    case UPDATE_COUNTRY_SUCCESS:
    case DELETE_COUNTRY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        countryResponse: action.payload,
        errors: {}
      };

    case GET_ALL_COUNTRYS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allCountrys: action.payload,
        countryResponse: ''
      };

      // FAILURE ACTIONS
    case GET_ALL_COUNTRYS_FAILURE:
    case ADD_COUNTRY_FAILURE:
    case UPDATE_COUNTRY_FAILURE:
    case DELETE_COUNTRY_FAILURE:
      return {
        ...state,
        isLoading: false,
        countryResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
