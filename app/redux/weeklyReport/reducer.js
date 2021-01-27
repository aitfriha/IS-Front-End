import {
  GET_SUMMARIZED_WEEKLY_REPORT,
  GET_SUMMARIZED_WEEKLY_REPORT_FAILURE,
  GET_SUMMARIZED_WEEKLY_REPORT_SUCCESS,
  GET_EXTENDED_WEEKLY_REPORT,
  GET_EXTENDED_WEEKLY_REPORT_FAILURE,
  GET_EXTENDED_WEEKLY_REPORT_SUCCESS,

  SAVE_WEEKLY_REPORT,
  SAVE_WEEKLY_REPORT_FAILURE,
  SAVE_WEEKLY_REPORT_SUCCESS
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  weeklyReportResponse: '',
  summarizedWeeklyReport: [],
  extendedWeeklyReport: []
};

export default function weeklyReportReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case GET_SUMMARIZED_WEEKLY_REPORT:
    case GET_EXTENDED_WEEKLY_REPORT:
    case SAVE_WEEKLY_REPORT:
      return {
        ...state,
        isLoading: true
      };

      // SUCCESS ACTIONS
    case GET_SUMMARIZED_WEEKLY_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        summarizedWeeklyReport: action.payload,
        errors: {}
      };

    case GET_EXTENDED_WEEKLY_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        extendedWeeklyReport: action.payload,
      };
    case SAVE_WEEKLY_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        weeklyReportResponse: action.payload,
        errors: {}
      };
      // FAILURE ACTIONS
    case GET_SUMMARIZED_WEEKLY_REPORT_FAILURE:
    case GET_EXTENDED_WEEKLY_REPORT_FAILURE:
    case SAVE_WEEKLY_REPORT_FAILURE:
      return {
        ...state,
        isLoading: false,
        weeklyReportResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
