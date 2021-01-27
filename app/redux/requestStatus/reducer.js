import {

  ADD_REQUEST_STATUS,
  ADD_REQUEST_STATUS_FAILURE,
  ADD_REQUEST_STATUS_SUCCESS,

  UPDATE_REQUEST_STATUS,
  UPDATE_REQUEST_STATUS_FAILURE,
  UPDATE_REQUEST_STATUS_SUCCESS,

  DELETE_REQUEST_STATUS,
  DELETE_REQUEST_STATUS_FAILURE,
  DELETE_REQUEST_STATUS_SUCCESS,

  GET_ALL_REQUEST_STATUS,
  GET_ALL_REQUEST_STATUS_FAILURE,
  GET_ALL_REQUEST_STATUS_SUCCESS

} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  requestStatusResponse: '',
  requestStatus: []
};

export default function requestStatusReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case ADD_REQUEST_STATUS:
    case UPDATE_REQUEST_STATUS:
    case DELETE_REQUEST_STATUS:
    case GET_ALL_REQUEST_STATUS:
      return {
        ...state,
        isLoading: true
      };

      // SUCCESS ACTIONS
    case GET_ALL_REQUEST_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        requestStatus: action.payload,
      };
    case ADD_REQUEST_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        requestStatusResponse: action.payload,
        errors: {}
      };
    case UPDATE_REQUEST_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        requestStatusResponse: action.payload,
        errors: {}
      };
    case DELETE_REQUEST_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        requestStatusResponse: action.payload,
        errors: {}
      };

      // FAILURE ACTIONS
    case ADD_REQUEST_STATUS_FAILURE:
    case UPDATE_REQUEST_STATUS_FAILURE:
    case DELETE_REQUEST_STATUS_FAILURE:
    case GET_ALL_REQUEST_STATUS_FAILURE:
      return {
        ...state,
        isLoading: false,
        requestStatusResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
