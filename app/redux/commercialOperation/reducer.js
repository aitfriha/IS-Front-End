import {
  ADD_COMMERCIALOPERATION,
  ADD_COMMERCIALOPERATION_FAILURE,
  ADD_COMMERCIALOPERATION_SUCCESS,
  DELETE_COMMERCIALOPERATION,
  DELETE_COMMERCIALOPERATION_FAILURE,
  DELETE_COMMERCIALOPERATION_SUCCESS,
  GET_ALL_COMMERCIALOPERATIONS,
  GET_ALL_COMMERCIALOPERATIONS_FAILURE,
  GET_ALL_COMMERCIALOPERATIONS_SUCCESS,
  UPDATE_COMMERCIALOPERATION,
  UPDATE_COMMERCIALOPERATION_FAILURE,
  UPDATE_COMMERCIALOPERATION_SUCCESS
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  commercialOperationResponse: '',
  allCommercialOperations: []
};

export default function commercialOperationReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case GET_ALL_COMMERCIALOPERATIONS:
    case ADD_COMMERCIALOPERATION:
    case UPDATE_COMMERCIALOPERATION:
    case DELETE_COMMERCIALOPERATION:
      return {
        ...state,
        isLoading: true,
        commercialOperationResponse: ''
      };

      // SUCCESS ACTIONS
    case ADD_COMMERCIALOPERATION_SUCCESS:
    case UPDATE_COMMERCIALOPERATION_SUCCESS:
    case DELETE_COMMERCIALOPERATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        commercialOperationResponse: action.payload,
        errors: {}
      };

    case GET_ALL_COMMERCIALOPERATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allCommercialOperations: action.payload,
        commercialOperationResponse: ''
      };

      // FAILURE ACTIONS
    case GET_ALL_COMMERCIALOPERATIONS_FAILURE:
    case ADD_COMMERCIALOPERATION_FAILURE:
    case UPDATE_COMMERCIALOPERATION_FAILURE:
    case DELETE_COMMERCIALOPERATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        commercialOperationResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
