import {

  ADD_TRAVEL_REQUEST_EMAIL_ADDRESS,
  ADD_TRAVEL_REQUEST_EMAIL_ADDRESS_FAILURE,
  ADD_TRAVEL_REQUEST_EMAIL_ADDRESS_SUCCESS,

  UPDATE_TRAVEL_REQUEST_EMAIL_ADDRESS,
  UPDATE_TRAVEL_REQUEST_EMAIL_ADDRESS_FAILURE,
  UPDATE_TRAVEL_REQUEST_EMAIL_ADDRESS_SUCCESS,

  DELETE_TRAVEL_REQUEST_EMAIL_ADDRESS,
  DELETE_TRAVEL_REQUEST_EMAIL_ADDRESS_FAILURE,
  DELETE_TRAVEL_REQUEST_EMAIL_ADDRESS_SUCCESS,

  GET_ALL_TRAVEL_REQUEST_EMAIL_ADDRESSES,
  GET_ALL_TRAVEL_REQUEST_EMAIL_ADDRESSES_FAILURE,
  GET_ALL_TRAVEL_REQUEST_EMAIL_ADDRESSES_SUCCESS


} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  travelRequestEmailAddressResponse: '',
  emailAddresses: []
};

export default function travelRequestEmailAddressReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case ADD_TRAVEL_REQUEST_EMAIL_ADDRESS:
    case UPDATE_TRAVEL_REQUEST_EMAIL_ADDRESS:
    case DELETE_TRAVEL_REQUEST_EMAIL_ADDRESS:
    case GET_ALL_TRAVEL_REQUEST_EMAIL_ADDRESSES:
      return {
        ...state,
        isLoading: true
      };

      // SUCCESS ACTIONS
    case GET_ALL_TRAVEL_REQUEST_EMAIL_ADDRESSES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        emailAddresses: action.payload,
      };
    case ADD_TRAVEL_REQUEST_EMAIL_ADDRESS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        travelRequestEmailAddressResponse: action.payload,
        errors: {}
      };
    case UPDATE_TRAVEL_REQUEST_EMAIL_ADDRESS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        travelRequestEmailAddressResponse: action.payload,
        errors: {}
      };
    case DELETE_TRAVEL_REQUEST_EMAIL_ADDRESS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        travelRequestEmailAddressResponse: action.payload,
        errors: {}
      };


      // FAILURE ACTIONS
    case ADD_TRAVEL_REQUEST_EMAIL_ADDRESS_FAILURE:
    case UPDATE_TRAVEL_REQUEST_EMAIL_ADDRESS_FAILURE:
    case DELETE_TRAVEL_REQUEST_EMAIL_ADDRESS_FAILURE:
    case GET_ALL_TRAVEL_REQUEST_EMAIL_ADDRESSES_FAILURE:
      return {
        ...state,
        isLoading: false,
        travelRequestEmailAddressResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
