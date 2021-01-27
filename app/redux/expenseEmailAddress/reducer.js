import {
  ADD_EXPENSE_EMAIL_ADDRESS,
  ADD_EXPENSE_EMAIL_ADDRESS_FAILURE,
  ADD_EXPENSE_EMAIL_ADDRESS_SUCCESS,

  UPDATE_EXPENSE_EMAIL_ADDRESS,
  UPDATE_EXPENSE_EMAIL_ADDRESS_FAILURE,
  UPDATE_EXPENSE_EMAIL_ADDRESS_SUCCESS,

  DELETE_EXPENSE_EMAIL_ADDRESS,
  DELETE_EXPENSE_EMAIL_ADDRESS_FAILURE,
  DELETE_EXPENSE_EMAIL_ADDRESS_SUCCESS,

  GET_ALL_EXPENSE_EMAIL_ADDRESSES,
  GET_ALL_EXPENSE_EMAIL_ADDRESSES_FAILURE,
  GET_ALL_EXPENSE_EMAIL_ADDRESSES_SUCCESS

} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  expenseEmailAddressResponse: '',
  emailAddresses: []
};

export default function staffExpensesConfigReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case ADD_EXPENSE_EMAIL_ADDRESS:
    case UPDATE_EXPENSE_EMAIL_ADDRESS:
    case DELETE_EXPENSE_EMAIL_ADDRESS:
    case GET_ALL_EXPENSE_EMAIL_ADDRESSES:
      return {
        ...state,
        isLoading: true
      };

      // SUCCESS ACTIONS
    case GET_ALL_EXPENSE_EMAIL_ADDRESSES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        emailAddresses: action.payload,
      };
    case ADD_EXPENSE_EMAIL_ADDRESS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        expenseEmailAddressResponse: action.payload,
        errors: {}
      };
    case UPDATE_EXPENSE_EMAIL_ADDRESS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        expenseEmailAddressResponse: action.payload,
        errors: {}
      };
    case DELETE_EXPENSE_EMAIL_ADDRESS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        expenseEmailAddressResponse: action.payload,
        errors: {}
      };


      // FAILURE ACTIONS
    case ADD_EXPENSE_EMAIL_ADDRESS_FAILURE:
    case UPDATE_EXPENSE_EMAIL_ADDRESS_FAILURE:
    case DELETE_EXPENSE_EMAIL_ADDRESS_FAILURE:
    case GET_ALL_EXPENSE_EMAIL_ADDRESSES_FAILURE:
      return {
        ...state,
        isLoading: false,
        expenseEmailAddressResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
