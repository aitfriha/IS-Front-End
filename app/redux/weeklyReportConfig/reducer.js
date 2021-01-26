import {
  UPDATE_WEEKLY_REPORT_CONFIG,
  UPDATE_WEEKLY_REPORT_CONFIG_FAILURE,
  UPDATE_WEEKLY_REPORT_CONFIG_SUCCESS,
  GET_WEEKLY_REPORT_CONFIG,
  GET_WEEKLY_REPORT_CONFIG_FAILURE,
  GET_WEEKLY_REPORT_CONFIG_SUCCESS,
  GET_WEEKLY_REPORT_CONFIG_BY_ID,
  GET_WEEKLY_REPORT_CONFIG_BY_ID_FAILURE,
  GET_WEEKLY_REPORT_CONFIG_BY_ID_SUCCESS
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  weeklyReportConfigResponse: '',
  weeklyReportConfig: []
};

export default function weeklyReportConfigReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case UPDATE_WEEKLY_REPORT_CONFIG:
    case GET_WEEKLY_REPORT_CONFIG:
    case GET_WEEKLY_REPORT_CONFIG_BY_ID:
      return {
        ...state,
        isLoading: true
      };

      // SUCCESS ACTIONS
    case GET_WEEKLY_REPORT_CONFIG_BY_ID_SUCCESS:
    case GET_WEEKLY_REPORT_CONFIG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        weeklyReportConfig: action.payload,
      };
    case UPDATE_WEEKLY_REPORT_CONFIG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        weeklyReportConfigResponse: action.payload,
        errors: {}
      };


      // FAILURE ACTIONS
    case UPDATE_WEEKLY_REPORT_CONFIG_FAILURE:
    case GET_WEEKLY_REPORT_CONFIG_BY_ID_FAILURE:
    case GET_WEEKLY_REPORT_CONFIG_FAILURE:
      return {
        ...state,
        isLoading: false,
        weeklyReportConfigResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
