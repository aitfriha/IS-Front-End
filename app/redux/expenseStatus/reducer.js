import {
  ADD_EXPENSE_STATUS,
  ADD_EXPENSE_STATUS_FAILURE,
  ADD_EXPENSE_STATUS_SUCCESS,

  UPDATE_EXPENSE_STATUS,
  UPDATE_EXPENSE_STATUS_FAILURE,
  UPDATE_EXPENSE_STATUS_SUCCESS,

  DELETE_EXPENSE_STATUS,
  DELETE_EXPENSE_STATUS_FAILURE,
  DELETE_EXPENSE_STATUS_SUCCESS,

  GET_ALL_EXPENSES_STATUS,
  GET_ALL_EXPENSES_STATUS_FAILURE,
  GET_ALL_EXPENSES_STATUS_SUCCESS

} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  expenseStatusResponse: '',
  expensesStatus: []
};

export default function expenseStatusReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case ADD_EXPENSE_STATUS:
    case UPDATE_EXPENSE_STATUS:
    case DELETE_EXPENSE_STATUS:
    case GET_ALL_EXPENSES_STATUS:
      return {
        ...state,
        isLoading: true
      };

      // SUCCESS ACTIONS
    case GET_ALL_EXPENSES_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        expensesStatus: action.payload,
      };
    case ADD_EXPENSE_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        expenseStatusResponse: action.payload,
        errors: {}
      };
    case UPDATE_EXPENSE_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        expenseStatusResponse: action.payload,
        errors: {}
      };
    case DELETE_EXPENSE_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        expenseStatusResponse: action.payload,
        errors: {}
      };

      // FAILURE ACTIONS
    case ADD_EXPENSE_STATUS_FAILURE:
    case UPDATE_EXPENSE_STATUS_FAILURE:
    case DELETE_EXPENSE_STATUS_FAILURE:
    case GET_ALL_EXPENSES_STATUS_FAILURE:
      return {
        ...state,
        isLoading: false,
        expenseStatusResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
