import {
  ADD_COMMERCIALOPERATIONSTATUS,
  ADD_COMMERCIALOPERATIONSTATUS_FAILURE,
  ADD_COMMERCIALOPERATIONSTATUS_SUCCESS,
  DELETE_COMMERCIALOPERATIONSTATUS,
  DELETE_COMMERCIALOPERATIONSTATUS_FAILURE,
  DELETE_COMMERCIALOPERATIONSTATUS_SUCCESS,
  GET_ALL_COMMERCIALOPERATIONSTATUSS,
  GET_ALL_COMMERCIALOPERATIONSTATUSS_FAILURE,
  GET_ALL_COMMERCIALOPERATIONSTATUSS_SUCCESS,
  UPDATE_COMMERCIALOPERATIONSTATUS,
  UPDATE_COMMERCIALOPERATIONSTATUS_FAILURE,
  UPDATE_COMMERCIALOPERATIONSTATUS_SUCCESS
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  commercialOperationStatusResponse: '',
  allCommercialOperationStatuss: []
};

export default function commercialOperationStatusReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case GET_ALL_COMMERCIALOPERATIONSTATUSS:
    case ADD_COMMERCIALOPERATIONSTATUS:
    case UPDATE_COMMERCIALOPERATIONSTATUS:
    case DELETE_COMMERCIALOPERATIONSTATUS:
      return {
        ...state,
        isLoading: true,
        commercialOperationStatusResponse: ''
      };

      // SUCCESS ACTIONS
    case ADD_COMMERCIALOPERATIONSTATUS_SUCCESS:
    case UPDATE_COMMERCIALOPERATIONSTATUS_SUCCESS:
    case DELETE_COMMERCIALOPERATIONSTATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        commercialOperationStatusResponse: action.payload,
        errors: {}
      };

    case GET_ALL_COMMERCIALOPERATIONSTATUSS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allCommercialOperationStatuss: action.payload,
        commercialOperationStatusResponse: ''
      };

      // FAILURE ACTIONS
    case GET_ALL_COMMERCIALOPERATIONSTATUSS_FAILURE:
    case ADD_COMMERCIALOPERATIONSTATUS_FAILURE:
    case UPDATE_COMMERCIALOPERATIONSTATUS_FAILURE:
    case DELETE_COMMERCIALOPERATIONSTATUS_FAILURE:
      return {
        ...state,
        isLoading: false,
        commercialOperationStatusResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
