import {
  ADD_CITY,
  ADD_CITY_FAILURE,
  ADD_CITY_SUCCESS,
  IMPORT_CITY,
  IMPORT_CITY_FAILURE,
  IMPORT_CITY_SUCCESS,
  DELETE_CITY,
  DELETE_CITY_FAILURE,
  DELETE_CITY_SUCCESS,
  GET_ALL_CITYS,
  GET_ALL_CITYS_FAILURE,
  GET_ALL_CITYS_SUCCESS,
  UPDATE_CITY,
  UPDATE_CITY_FAILURE,
  UPDATE_CITY_SUCCESS
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  cityResponse: '',
  allCitys: []
};

export default function citysReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case GET_ALL_CITYS:
    case ADD_CITY:
    case IMPORT_CITY:
    case UPDATE_CITY:
    case DELETE_CITY:
      return {
        ...state,
        isLoading: true,
        cityResponse: ''
      };

      // SUCCESS ACTIONS
    case ADD_CITY_SUCCESS:
    case IMPORT_CITY_SUCCESS:
    case UPDATE_CITY_SUCCESS:
    case DELETE_CITY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cityResponse: action.payload,
        errors: {}
      };

    case GET_ALL_CITYS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allCitys: action.payload,
        cityResponse: ''
      };

      // FAILURE ACTIONS
    case GET_ALL_CITYS_FAILURE:
    case ADD_CITY_FAILURE:
    case IMPORT_CITY_FAILURE:
    case UPDATE_CITY_FAILURE:
    case DELETE_CITY_FAILURE:
      return {
        ...state,
        isLoading: false,
        cityResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
