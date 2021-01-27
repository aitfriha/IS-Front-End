import {
  GET_EXPENSES,
  GET_EXPENSES_FAILURE,
  GET_EXPENSES_SUCCESS,

  SAVE_EXPENSE,
  SAVE_EXPENSE_FAILURE,
  SAVE_EXPENSE_SUCCESS,

  SAVE_EXPENSE_WITH_FILE,
  SAVE_EXPENSE_WITH_FILE_FAILURE,
  SAVE_EXPENSE_WITH_FILE_SUCCESS,

  CHANGE_STATUS_EXPENSE,
  CHANGE_STATUS_EXPENSE_FAILURE,
  CHANGE_STATUS_EXPENSE_SUCCESS,

  EXPORT_EXPENSES,
  EXPORT_EXPENSES_FAILURE,
  EXPORT_EXPENSES_SUCCESS,

  DOWNLOAD_DOCUMENT_OF_EXPENSE,
  DOWNLOAD_DOCUMENT_OF_EXPENSE_FAILURE,
  DOWNLOAD_DOCUMENT_OF_EXPENSE_SUCCESS
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  expenseResponse: '',
  expenses: []
};

export default function expensesReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case GET_EXPENSES:
    case SAVE_EXPENSE:
    case SAVE_EXPENSE_WITH_FILE:
    case CHANGE_STATUS_EXPENSE:
    case EXPORT_EXPENSES:
    case DOWNLOAD_DOCUMENT_OF_EXPENSE:
      return {
        ...state,
        isLoading: true
      };

      // SUCCESS ACTIONS
    case GET_EXPENSES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        expenses: action.payload,
      };
    case SAVE_EXPENSE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        expenseResponse: action.payload,
      };
    case SAVE_EXPENSE_WITH_FILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        expenseResponse: action.payload,
      };
    case CHANGE_STATUS_EXPENSE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        expenseResponse: action.payload,
      };
    case EXPORT_EXPENSES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        expenseResponse: action.payload,
      };
    case DOWNLOAD_DOCUMENT_OF_EXPENSE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        expenseResponse: action.payload
      };

      // FAILURE ACTIONS
    case GET_EXPENSES_FAILURE:
    case SAVE_EXPENSE_FAILURE:
    case SAVE_EXPENSE_WITH_FILE_FAILURE:
    case CHANGE_STATUS_EXPENSE_FAILURE:
    case EXPORT_EXPENSES_FAILURE:
    case DOWNLOAD_DOCUMENT_OF_EXPENSE_FAILURE:
      return {
        ...state,
        isLoading: false,
        expenseResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
