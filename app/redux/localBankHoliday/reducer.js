import {
  ADD_LOCALBANKHOLIDAY,
  ADD_LOCALBANKHOLIDAY_FAILURE,
  ADD_LOCALBANKHOLIDAY_SUCCESS,
  DELETE_LOCALBANKHOLIDAY,
  DELETE_LOCALBANKHOLIDAY_FAILURE,
  DELETE_LOCALBANKHOLIDAY_SUCCESS,
  GET_ALL_LOCALBANKHOLIDAYS,
  GET_ALL_LOCALBANKHOLIDAYS_FAILURE,
  GET_ALL_LOCALBANKHOLIDAYS_SUCCESS,
  GET_ALL_LOCALBANKHOLIDAYS_BY_COMPANY,
  GET_ALL_LOCALBANKHOLIDAYS_BY_COMPANY_FAILURE,
  GET_ALL_LOCALBANKHOLIDAYS_BY_COMPANY_SUCCESS,
  UPDATE_LOCALBANKHOLIDAY,
  UPDATE_LOCALBANKHOLIDAY_FAILURE,
  UPDATE_LOCALBANKHOLIDAY_SUCCESS
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  localBankHolidayResponse: '',
  allLocalBankHoliday: [],
  allLocalBankHolidayByCompany: []
};

export default function localBankHolidayReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    // TRIGGERING ACTIONS
    case GET_ALL_LOCALBANKHOLIDAYS:
    case GET_ALL_LOCALBANKHOLIDAYS_BY_COMPANY:
    case ADD_LOCALBANKHOLIDAY:
    case UPDATE_LOCALBANKHOLIDAY:
    case DELETE_LOCALBANKHOLIDAY:
      return {
        ...state,
        isLoading: true,
        localBankHolidayResponse: ''
      };

    // SUCCESS ACTIONS
    case ADD_LOCALBANKHOLIDAY_SUCCESS:
    case UPDATE_LOCALBANKHOLIDAY_SUCCESS:
    case DELETE_LOCALBANKHOLIDAY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        localBankHolidayResponse: action.payload,
        errors: {}
      };

    case GET_ALL_LOCALBANKHOLIDAYS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allLocalBankHoliday: action.payload,
        localBankHolidayResponse: ''
      };

    case GET_ALL_LOCALBANKHOLIDAYS_BY_COMPANY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allLocalBankHolidayByCompany: action.payload,
        localBankHolidayResponse: ''
      };

    // FAILURE ACTIONS
    case GET_ALL_LOCALBANKHOLIDAYS_FAILURE:
    case GET_ALL_LOCALBANKHOLIDAYS_BY_COMPANY_FAILURE:
    case ADD_LOCALBANKHOLIDAY_FAILURE:
    case UPDATE_LOCALBANKHOLIDAY_FAILURE:
    case DELETE_LOCALBANKHOLIDAY_FAILURE:
      return {
        ...state,
        isLoading: false,
        localBankHolidayResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
