import {
  GET_TRAVEL_REQUESTS,
  GET_TRAVEL_REQUESTS_FAILURE,
  GET_TRAVEL_REQUESTS_SUCCESS,

  ADD_TRAVEL_REQUEST,
  ADD_TRAVEL_REQUEST_FAILURE,
  ADD_TRAVEL_REQUEST_SUCCESS,

  UPDATE_TRAVEL_REQUEST,
  UPDATE_TRAVEL_REQUEST_FAILURE,
  UPDATE_TRAVEL_REQUEST_SUCCESS,

  CHANGE_STATUS_TRAVEL_REQUEST,
  CHANGE_STATUS_TRAVEL_REQUEST_FAILURE,
  CHANGE_STATUS_TRAVEL_REQUEST_SUCCESS,

  GET_COUNTRIES,
  GET_COUNTRIES_FAILURE,
  GET_COUNTRIES_SUCCESS,

  EXPORT_TRAVEL_REQUESTS,
  EXPORT_TRAVEL_REQUESTS_FAILURE,
  EXPORT_TRAVEL_REQUESTS_SUCCESS,

  APPROVE_TRAVEL_REQUEST,
  APPROVE_TRAVEL_REQUEST_FAILURE,
  APPROVE_TRAVEL_REQUEST_SUCCESS,

  DOWNLOAD_DOCUMENTS_OF_TRAVEL_REQUEST,
  DOWNLOAD_DOCUMENTS_OF_TRAVEL_REQUEST_FAILURE,
  DOWNLOAD_DOCUMENTS_OF_TRAVEL_REQUEST_SUCCESS
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  travelRequestResponse: '',
  travelRequests: [],
  countries: []
};

export default function travelRequestReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case GET_TRAVEL_REQUESTS:
    case ADD_TRAVEL_REQUEST:
    case UPDATE_TRAVEL_REQUEST:
    case CHANGE_STATUS_TRAVEL_REQUEST:
    case GET_COUNTRIES:
    case EXPORT_TRAVEL_REQUESTS:
    case APPROVE_TRAVEL_REQUEST:
    case DOWNLOAD_DOCUMENTS_OF_TRAVEL_REQUEST:
      return {
        ...state,
        isLoading: true
      };

      // SUCCESS ACTIONS
    case GET_TRAVEL_REQUESTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        travelRequests: action.payload,
      };
    case ADD_TRAVEL_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        travelRequestResponse: action.payload,
      };
    case UPDATE_TRAVEL_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        travelRequestResponse: action.payload,
      };
    case CHANGE_STATUS_TRAVEL_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        travelRequestResponse: action.payload,
      };
    case GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        countries: action.payload,
      };
    case EXPORT_TRAVEL_REQUESTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        travelRequestResponse: action.payload,
      };
    case APPROVE_TRAVEL_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        travelRequestResponse: action.payload
      };

    case DOWNLOAD_DOCUMENTS_OF_TRAVEL_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        travelRequestResponse: action.payload
      };

      // FAILURE ACTIONS
    case GET_TRAVEL_REQUESTS_FAILURE:
    case ADD_TRAVEL_REQUEST_FAILURE:
    case UPDATE_TRAVEL_REQUEST_FAILURE:
    case CHANGE_STATUS_TRAVEL_REQUEST_FAILURE:
    case GET_COUNTRIES_FAILURE:
    case EXPORT_TRAVEL_REQUESTS_FAILURE:
    case APPROVE_TRAVEL_REQUEST_FAILURE:
    case DOWNLOAD_DOCUMENTS_OF_TRAVEL_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        travelRequestResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
