import {
  ADD_STAFF_EXPENSE_TYPE,
  ADD_STAFF_EXPENSE_TYPE_FAILURE,
  ADD_STAFF_EXPENSE_TYPE_SUCCESS,

  UPDATE_STAFF_EXPENSE_TYPE,
  UPDATE_STAFF_EXPENSE_TYPE_FAILURE,
  UPDATE_STAFF_EXPENSE_TYPE_SUCCESS,

  DELETE_STAFF_EXPENSE_TYPE,
  DELETE_STAFF_EXPENSE_TYPE_FAILURE,
  DELETE_STAFF_EXPENSE_TYPE_SUCCESS,

  GET_STAFF_EXPENSES_TYPES,
  GET_STAFF_EXPENSES_TYPES_FAILURE,
  GET_STAFF_EXPENSES_TYPES_SUCCESS,

  //---------------------------------------------------------------------------------------------

  ADD_STAFF_EXPENSE_SUBTYPE,
  ADD_STAFF_EXPENSE_SUBTYPE_FAILURE,
  ADD_STAFF_EXPENSE_SUBTYPE_SUCCESS,

  UPDATE_STAFF_EXPENSE_SUBTYPE,
  UPDATE_STAFF_EXPENSE_SUBTYPE_FAILURE,
  UPDATE_STAFF_EXPENSE_SUBTYPE_SUCCESS,

  DELETE_STAFF_EXPENSE_SUBTYPE,
  DELETE_STAFF_EXPENSE_SUBTYPE_FAILURE,
  DELETE_STAFF_EXPENSE_SUBTYPE_SUCCESS,

} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  staffExpenseTypeResponse: '',
  staffExpensesTypes: []
};

export default function staffExpenseTypeReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case ADD_STAFF_EXPENSE_TYPE:
    case UPDATE_STAFF_EXPENSE_TYPE:
    case DELETE_STAFF_EXPENSE_TYPE:
    case ADD_STAFF_EXPENSE_SUBTYPE:
    case UPDATE_STAFF_EXPENSE_SUBTYPE:
    case DELETE_STAFF_EXPENSE_SUBTYPE:
    case GET_STAFF_EXPENSES_TYPES:
      return {
        ...state,
        isLoading: true
      };

      // SUCCESS ACTIONS
    case GET_STAFF_EXPENSES_TYPES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        staffExpensesTypes: action.payload,
      };
    case ADD_STAFF_EXPENSE_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        staffExpenseTypeResponse: action.payload,
        errors: {}
      };
    case UPDATE_STAFF_EXPENSE_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        staffExpenseTypeResponse: action.payload,
        errors: {}
      };
    case DELETE_STAFF_EXPENSE_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        staffExpenseTypeResponse: action.payload,
        errors: {}
      };

    case ADD_STAFF_EXPENSE_SUBTYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        staffExpenseTypeResponse: action.payload,
        errors: {}
      };
    case UPDATE_STAFF_EXPENSE_SUBTYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        staffExpenseTypeResponse: action.payload,
        errors: {}
      };
    case DELETE_STAFF_EXPENSE_SUBTYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        staffExpenseTypeResponse: action.payload,
        errors: {}
      };


      // FAILURE ACTIONS
    case ADD_STAFF_EXPENSE_TYPE_FAILURE:
    case UPDATE_STAFF_EXPENSE_TYPE_FAILURE:
    case DELETE_STAFF_EXPENSE_TYPE_FAILURE:
    case GET_STAFF_EXPENSES_TYPES_FAILURE:
    case ADD_STAFF_EXPENSE_SUBTYPE_FAILURE:
    case UPDATE_STAFF_EXPENSE_SUBTYPE_FAILURE:
    case DELETE_STAFF_EXPENSE_SUBTYPE_FAILURE:
      return {
        ...state,
        isLoading: false,
        staffExpenseTypeResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
