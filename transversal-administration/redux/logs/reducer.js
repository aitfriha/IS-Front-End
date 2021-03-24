import {
  GET_ALL_LOGS,
  GET_ALL_LOGS_FAILURE,
  GET_ALL_LOGS_SUCCESS,
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  logResponse: '',
  allLogs: []
};

export default function logsReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING LOGS
    case GET_ALL_LOGS:
      return {
        ...state,
        isLoading: true
      };

    case GET_ALL_LOGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allLogs: action.payload,
      };

      // FAILURE LOGS
    case GET_ALL_LOGS_FAILURE:
      return {
        ...state,
        isLoading: false,
        logResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
