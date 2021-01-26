import {

  GET_CURRENCY_TYPES,
  GET_CURRENCY_TYPES_FAILURE,
  GET_CURRENCY_TYPES_SUCCESS

} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  currencyTypeResponse: '',
  currencyTypes: {}
};

export default function currencyTypeReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case GET_CURRENCY_TYPES:
      return {
        ...state,
        isLoading: true
      };

      // SUCCESS ACTIONS
    case GET_CURRENCY_TYPES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currencyTypes: action.payload,
      };

      // FAILURE ACTIONS
    case GET_CURRENCY_TYPES_FAILURE:
      return {
        ...state,
        isLoading: false,
        currencyTypeResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
