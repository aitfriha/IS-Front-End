import {
  ADD_CONTRACTMODEL,
  ADD_CONTRACTMODEL_FAILURE,
  ADD_CONTRACTMODEL_SUCCESS,
  DELETE_CONTRACTMODEL,
  DELETE_CONTRACTMODEL_FAILURE,
  DELETE_CONTRACTMODEL_SUCCESS,
  GET_ALL_CONTRACTMODELS,
  GET_ALL_CONTRACTMODELS_FAILURE,
  GET_ALL_CONTRACTMODELS_SUCCESS,
  UPDATE_CONTRACTMODEL,
  UPDATE_CONTRACTMODEL_FAILURE,
  UPDATE_CONTRACTMODEL_SUCCESS
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  contractModelResponse: '',
  allContractModel: []
};

export default function contractModelReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    // TRIGGERING ACTIONS
    case GET_ALL_CONTRACTMODELS:
    case ADD_CONTRACTMODEL:
    case UPDATE_CONTRACTMODEL:
    case DELETE_CONTRACTMODEL:
      return {
        ...state,
        isLoading: true,
        contractModelResponse: ''
      };

    // SUCCESS ACTIONS
    case ADD_CONTRACTMODEL_SUCCESS:
    case UPDATE_CONTRACTMODEL_SUCCESS:
    case DELETE_CONTRACTMODEL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        contractModelResponse: action.payload,
        errors: {}
      };

    case GET_ALL_CONTRACTMODELS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allContractModel: action.payload,
        contractModelResponse: ''
      };

    // FAILURE ACTIONS
    case GET_ALL_CONTRACTMODELS_FAILURE:
    case ADD_CONTRACTMODEL_FAILURE:
    case UPDATE_CONTRACTMODEL_FAILURE:
    case DELETE_CONTRACTMODEL_FAILURE:
      return {
        ...state,
        isLoading: false,
        contractModelResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
