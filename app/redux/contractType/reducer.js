import {
  ADD_CONTRACTTYPE,
  ADD_CONTRACTTYPE_FAILURE,
  ADD_CONTRACTTYPE_SUCCESS,
  DELETE_CONTRACTTYPE,
  DELETE_CONTRACTTYPE_FAILURE,
  DELETE_CONTRACTTYPE_SUCCESS,
  GET_ALL_CONTRACTTYPES,
  GET_ALL_CONTRACTTYPES_FAILURE,
  GET_ALL_CONTRACTTYPES_SUCCESS,
  GET_ALL_CONTRACTTYPES_BY_STATE,
  GET_ALL_CONTRACTTYPES_BY_STATE_FAILURE,
  GET_ALL_CONTRACTTYPES_BY_STATE_SUCCESS,
  UPDATE_CONTRACTTYPE,
  UPDATE_CONTRACTTYPE_FAILURE,
  UPDATE_CONTRACTTYPE_SUCCESS
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  contractTypeResponse: '',
  allContractType: [],
  allContractTypeByState: []
};

export default function contractTypeReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    // TRIGGERING ACTIONS
    case GET_ALL_CONTRACTTYPES:
    case GET_ALL_CONTRACTTYPES_BY_STATE:
    case ADD_CONTRACTTYPE:
    case UPDATE_CONTRACTTYPE:
    case DELETE_CONTRACTTYPE:
      return {
        ...state,
        isLoading: true,
        contractTypeResponse: ''
      };

    // SUCCESS ACTIONS
    case ADD_CONTRACTTYPE_SUCCESS:
    case UPDATE_CONTRACTTYPE_SUCCESS:
    case DELETE_CONTRACTTYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        contractTypeResponse: action.payload,
        errors: {}
      };

    case GET_ALL_CONTRACTTYPES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allContractType: action.payload,
        contractTypeResponse: ''
      };
    case GET_ALL_CONTRACTTYPES_BY_STATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allContractTypeByState: action.payload,
        contractTypeResponse: ''
      };

    // FAILURE ACTIONS
    case GET_ALL_CONTRACTTYPES_FAILURE:
    case GET_ALL_CONTRACTTYPES_BY_STATE_FAILURE:
    case ADD_CONTRACTTYPE_FAILURE:
    case UPDATE_CONTRACTTYPE_FAILURE:
    case DELETE_CONTRACTTYPE_FAILURE:
      return {
        ...state,
        isLoading: false,
        contractTypeResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
