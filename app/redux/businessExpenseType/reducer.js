import {

  ADD_BUSINESS_EXPENSE_TYPE,
  ADD_BUSINESS_EXPENSE_TYPE_FAILURE,
  ADD_BUSINESS_EXPENSE_TYPE_SUCCESS,

  UPDATE_BUSINESS_EXPENSE_TYPE,
  UPDATE_BUSINESS_EXPENSE_TYPE_FAILURE,
  UPDATE_BUSINESS_EXPENSE_TYPE_SUCCESS,

  DELETE_BUSINESS_EXPENSE_TYPE,
  DELETE_BUSINESS_EXPENSE_TYPE_FAILURE,
  DELETE_BUSINESS_EXPENSE_TYPE_SUCCESS,

  GET_BUSINESS_EXPENSES_TYPES,
  GET_BUSINESS_EXPENSES_TYPES_FAILURE,
  GET_BUSINESS_EXPENSES_TYPES_SUCCESS,

  //---------------------------------------------------------------------------------------------

  ADD_BUSINESS_EXPENSE_SUBTYPE,
  ADD_BUSINESS_EXPENSE_SUBTYPE_FAILURE,
  ADD_BUSINESS_EXPENSE_SUBTYPE_SUCCESS,

  UPDATE_BUSINESS_EXPENSE_SUBTYPE,
  UPDATE_BUSINESS_EXPENSE_SUBTYPE_FAILURE,
  UPDATE_BUSINESS_EXPENSE_SUBTYPE_SUCCESS,

  DELETE_BUSINESS_EXPENSE_SUBTYPE,
  DELETE_BUSINESS_EXPENSE_SUBTYPE_FAILURE,
  DELETE_BUSINESS_EXPENSE_SUBTYPE_SUCCESS,


} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  businessExpenseTypeResponse: '',
  businessExpensesTypes: []
};

export default function businessExpenseTypesReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case ADD_BUSINESS_EXPENSE_TYPE:
    case UPDATE_BUSINESS_EXPENSE_TYPE:
    case DELETE_BUSINESS_EXPENSE_TYPE:
    case ADD_BUSINESS_EXPENSE_SUBTYPE:
    case UPDATE_BUSINESS_EXPENSE_SUBTYPE:
    case DELETE_BUSINESS_EXPENSE_SUBTYPE:
    case GET_BUSINESS_EXPENSES_TYPES:
      return {
        ...state,
        isLoading: true
      };

      // SUCCESS ACTIONS
    case GET_BUSINESS_EXPENSES_TYPES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        businessExpensesTypes: action.payload,
      };
    case ADD_BUSINESS_EXPENSE_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        businessExpenseTypeResponse: action.payload,
        errors: {}
      };
    case UPDATE_BUSINESS_EXPENSE_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        businessExpenseTypeResponse: action.payload,
        errors: {}
      };
    case DELETE_BUSINESS_EXPENSE_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        businessExpenseTypeResponse: action.payload,
        errors: {}
      };

    case ADD_BUSINESS_EXPENSE_SUBTYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        businessExpenseTypeResponse: action.payload,
        errors: {}
      };
    case UPDATE_BUSINESS_EXPENSE_SUBTYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        businessExpenseTypeResponse: action.payload,
        errors: {}
      };
    case DELETE_BUSINESS_EXPENSE_SUBTYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        businessExpenseTypeResponse: action.payload,
        errors: {}
      };

      // FAILURE ACTIONS
    case ADD_BUSINESS_EXPENSE_TYPE_FAILURE:
    case UPDATE_BUSINESS_EXPENSE_TYPE_FAILURE:
    case DELETE_BUSINESS_EXPENSE_TYPE_FAILURE:
    case GET_BUSINESS_EXPENSES_TYPES_FAILURE:
    case ADD_BUSINESS_EXPENSE_SUBTYPE_FAILURE:
    case UPDATE_BUSINESS_EXPENSE_SUBTYPE_FAILURE:
    case DELETE_BUSINESS_EXPENSE_SUBTYPE_FAILURE:
      return {
        ...state,
        isLoading: false,
        businessExpenseTypeResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
