import {

  GET_DATA_BY_CURRENCY_TYPE,
  GET_DATA_BY_CURRENCY_TYPE_FAILURE,
  GET_DATA_BY_CURRENCY_TYPE_SUCCESS,

  GET_DATA_ASSOCIATED_WITH_CURRENCY_TYPES,
  GET_DATA_ASSOCIATED_WITH_CURRENCY_TYPES_FAILURE,
  GET_DATA_ASSOCIATED_WITH_CURRENCY_TYPES_SUCCESS,

} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  currencyResponse: '',
  currencyData: {},
};

export default function currencyReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case GET_DATA_BY_CURRENCY_TYPE:
    case GET_DATA_ASSOCIATED_WITH_CURRENCY_TYPES:
      return {
        ...state,
        isLoading: true
      };

      // SUCCESS ACTIONS
    case GET_DATA_BY_CURRENCY_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currencyData: action.payload,
      };
    case GET_DATA_ASSOCIATED_WITH_CURRENCY_TYPES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currencyData: action.payload,
        errors: {}
      };

      // FAILURE ACTIONS
    case GET_DATA_BY_CURRENCY_TYPE_FAILURE:
    case GET_DATA_ASSOCIATED_WITH_CURRENCY_TYPES_FAILURE:
      return {
        ...state,
        isLoading: false,
        currencyResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
