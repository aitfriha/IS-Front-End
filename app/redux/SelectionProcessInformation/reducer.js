import {
  ADD_SELECTIONPROCESSINFORMATION,
  ADD_SELECTIONPROCESSINFORMATION_FAILURE,
  ADD_SELECTIONPROCESSINFORMATION_SUCCESS,
  DELETE_SELECTIONPROCESSINFORMATION,
  DELETE_SELECTIONPROCESSINFORMATION_FAILURE,
  DELETE_SELECTIONPROCESSINFORMATION_SUCCESS,
  GET_ALL_SELECTIONPROCESSINFORMATIONS,
  GET_ALL_SELECTIONPROCESSINFORMATIONS_FAILURE,
  GET_ALL_SELECTIONPROCESSINFORMATIONS_SUCCESS,
  UPDATE_SELECTIONPROCESSINFORMATION,
  UPDATE_SELECTIONPROCESSINFORMATION_FAILURE,
  UPDATE_SELECTIONPROCESSINFORMATION_SUCCESS
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  selectionProcessInformationResponse: '',
  allSelectionProcessInformation: [],
  allSelectionProcessInformationByState: []
};

export default function selectionProcessInformationReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    // TRIGGERING ACTIONS
    case GET_ALL_SELECTIONPROCESSINFORMATIONS:
    case ADD_SELECTIONPROCESSINFORMATION:
    case UPDATE_SELECTIONPROCESSINFORMATION:
    case DELETE_SELECTIONPROCESSINFORMATION:
      return {
        ...state,
        isLoading: true,
        selectionProcessInformationResponse: ''
      };

    // SUCCESS ACTIONS
    case ADD_SELECTIONPROCESSINFORMATION_SUCCESS:
    case UPDATE_SELECTIONPROCESSINFORMATION_SUCCESS:
    case DELETE_SELECTIONPROCESSINFORMATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        selectionProcessInformationResponse: action.payload,
        errors: {}
      };

    case GET_ALL_SELECTIONPROCESSINFORMATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allSelectionProcessInformation: action.payload,
        selectionProcessInformationResponse: ''
      };

    // FAILURE ACTIONS
    case GET_ALL_SELECTIONPROCESSINFORMATIONS_FAILURE:
    case ADD_SELECTIONPROCESSINFORMATION_FAILURE:
    case UPDATE_SELECTIONPROCESSINFORMATION_FAILURE:
    case DELETE_SELECTIONPROCESSINFORMATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        selectionProcessInformationResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
