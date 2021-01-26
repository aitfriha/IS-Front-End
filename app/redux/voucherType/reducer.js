import {

  ADD_VOUCHER_TYPE,
  ADD_VOUCHER_TYPE_FAILURE,
  ADD_VOUCHER_TYPE_SUCCESS,

  UPDATE_VOUCHER_TYPE,
  UPDATE_VOUCHER_TYPE_FAILURE,
  UPDATE_VOUCHER_TYPE_SUCCESS,

  DELETE_VOUCHER_TYPE,
  DELETE_VOUCHER_TYPE_FAILURE,
  DELETE_VOUCHER_TYPE_SUCCESS,

  GET_ALL_VOUCHER_TYPES,
  GET_ALL_VOUCHER_TYPES_FAILURE,
  GET_ALL_VOUCHER_TYPES_SUCCESS

} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  voucherTypeResponse: '',
  voucherTypes: []
};

export default function voucherTypeReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case ADD_VOUCHER_TYPE:
    case UPDATE_VOUCHER_TYPE:
    case DELETE_VOUCHER_TYPE:
    case GET_ALL_VOUCHER_TYPES:
      return {
        ...state,
        isLoading: true
      };

      // SUCCESS ACTIONS
    case GET_ALL_VOUCHER_TYPES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        voucherTypes: action.payload,
      };
    case UPDATE_VOUCHER_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        voucherTypeResponse: action.payload,
        errors: {}
      };

    case ADD_VOUCHER_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        voucherTypeResponse: action.payload,
        errors: {}
      };

    case DELETE_VOUCHER_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        voucherTypeResponse: action.payload,
        errors: {}
      };


      // FAILURE ACTIONS
    case ADD_VOUCHER_TYPE_FAILURE:
    case UPDATE_VOUCHER_TYPE_FAILURE:
    case DELETE_VOUCHER_TYPE_FAILURE:
    case GET_ALL_VOUCHER_TYPES_FAILURE:
      return {
        ...state,
        isLoading: false,
        voucherTypeResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
