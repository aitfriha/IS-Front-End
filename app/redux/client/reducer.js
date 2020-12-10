import {
  ADD_CLIENT_COMMERCIAL,
  ADD_CLIENT_FAILURE,
  ADD_CLIENT_SUCCESS,
  DELETE_CLIENT,
  DELETE_CLIENT_FAILURE,
  DELETE_CLIENT_SUCCESS,
  GET_ALL_CLIENTS,
  GET_ALL_CLIENTS_FAILURE,
  GET_ALL_CLIENTS_SUCCESS,
  UPDATE_CLIENT,
  UPDATE_CLIENT_FAILURE,
  UPDATE_CLIENT_SUCCESS,

  GET_ALL_CLIENTS_BYCOUNTRY,
  GET_ALL_CLIENTS_BYCOUNTRY_FAILURE,
  GET_ALL_CLIENTS_BYCOUNTRY_SUCCESS,

  IMPORT_CLIENT_COMMERCIAL,
  IMPORT_CLIENT_FAILURE,
  IMPORT_CLIENT_SUCCESS,
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  clientResponse: '',
  allClients: []
};

export default function clientReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case GET_ALL_CLIENTS:
    case GET_ALL_CLIENTS_BYCOUNTRY:
    case ADD_CLIENT_COMMERCIAL:
    case IMPORT_CLIENT_COMMERCIAL:
    case UPDATE_CLIENT:
    case DELETE_CLIENT:
      return {
        ...state,
        isLoading: true,
        clientResponse: ''
      };

      // SUCCESS ACTIONS
    case ADD_CLIENT_SUCCESS:
    case IMPORT_CLIENT_SUCCESS:
    case UPDATE_CLIENT_SUCCESS:
    case DELETE_CLIENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        clientResponse: action.payload,
        errors: {}
      };

    case GET_ALL_CLIENTS_SUCCESS:
    case GET_ALL_CLIENTS_BYCOUNTRY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allClients: action.payload,
        clientResponse: ''
      };

      // FAILURE ACTIONS
    case GET_ALL_CLIENTS_FAILURE:
    case GET_ALL_CLIENTS_BYCOUNTRY_FAILURE:
    case IMPORT_CLIENT_FAILURE:
    case ADD_CLIENT_FAILURE:
    case UPDATE_CLIENT_FAILURE:
    case DELETE_CLIENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        clientResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
