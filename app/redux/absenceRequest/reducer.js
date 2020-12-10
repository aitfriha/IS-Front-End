import {
  ADD_ABSENCEREQUEST,
  ADD_ABSENCEREQUEST_FAILURE,
  ADD_ABSENCEREQUEST_SUCCESS,
  DELETE_ABSENCEREQUEST,
  DELETE_ABSENCEREQUEST_FAILURE,
  DELETE_ABSENCEREQUEST_SUCCESS,
  GET_ALL_ABSENCEREQUESTS,
  GET_ALL_ABSENCEREQUESTS_FAILURE,
  GET_ALL_ABSENCEREQUESTS_SUCCESS,
  UPDATE_ABSENCEREQUEST,
  UPDATE_ABSENCEREQUEST_FAILURE,
  UPDATE_ABSENCEREQUEST_SUCCESS
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  absenceRequestResponse: '',
  allAbsenceRequest: []
};

export default function absenceRequestReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    // TRIGGERING ACTIONS
    case GET_ALL_ABSENCEREQUESTS:
    case ADD_ABSENCEREQUEST:
    case UPDATE_ABSENCEREQUEST:
    case DELETE_ABSENCEREQUEST:
      return {
        ...state,
        isLoading: true,
        absenceRequestResponse: ''
      };

    // SUCCESS ACTIONS
    case ADD_ABSENCEREQUEST_SUCCESS:
    case UPDATE_ABSENCEREQUEST_SUCCESS:
    case DELETE_ABSENCEREQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        absenceRequestResponse: action.payload,
        errors: {}
      };

    case GET_ALL_ABSENCEREQUESTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allAbsenceRequest: action.payload,
        absenceRequestResponse: ''
      };

    // FAILURE ACTIONS
    case GET_ALL_ABSENCEREQUESTS_FAILURE:
    case ADD_ABSENCEREQUEST_FAILURE:
    case UPDATE_ABSENCEREQUEST_FAILURE:
    case DELETE_ABSENCEREQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        absenceRequestResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
