import {
  ADD_CONTACTBYOPERATION,
  ADD_CONTACTBYOPERATION_FAILURE,
  ADD_CONTACTBYOPERATION_SUCCESS,
  DELETE_CONTACTBYOPERATION,
  DELETE_CONTACTBYOPERATION_FAILURE,
  DELETE_CONTACTBYOPERATION_SUCCESS,
  GET_ALL_CONTACTBYOPERATIONS,
  GET_ALL_CONTACTBYOPERATIONS_FAILURE,
  GET_ALL_CONTACTBYOPERATIONS_SUCCESS,
  UPDATE_CONTACTBYOPERATION,
  UPDATE_CONTACTBYOPERATION_FAILURE,
  UPDATE_CONTACTBYOPERATION_SUCCESS
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  contactByOperationResponse: '',
  allCommercialOperationStatuss: []
};

export default function contactByOperationReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case GET_ALL_CONTACTBYOPERATIONS:
    case ADD_CONTACTBYOPERATION:
    case UPDATE_CONTACTBYOPERATION:
    case DELETE_CONTACTBYOPERATION:
      return {
        ...state,
        isLoading: true,
        contactByOperationResponse: ''
      };

      // SUCCESS ACTIONS
    case ADD_CONTACTBYOPERATION_SUCCESS:
    case UPDATE_CONTACTBYOPERATION_SUCCESS:
    case DELETE_CONTACTBYOPERATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        contactByOperationResponse: action.payload,
        errors: {}
      };

    case GET_ALL_CONTACTBYOPERATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allCommercialOperationStatuss: action.payload,
        contactByOperationResponse: ''
      };

      // FAILURE ACTIONS
    case GET_ALL_CONTACTBYOPERATIONS_FAILURE:
    case ADD_CONTACTBYOPERATION_FAILURE:
    case UPDATE_CONTACTBYOPERATION_FAILURE:
    case DELETE_CONTACTBYOPERATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        contactByOperationResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
