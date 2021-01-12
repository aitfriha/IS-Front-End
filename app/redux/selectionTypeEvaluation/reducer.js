import {
  ADD_SELECTIONTYPEEVALUATION,
  ADD_SELECTIONTYPEEVALUATION_FAILURE,
  ADD_SELECTIONTYPEEVALUATION_SUCCESS,
  DELETE_SELECTIONTYPEEVALUATION,
  DELETE_SELECTIONTYPEEVALUATION_FAILURE,
  DELETE_SELECTIONTYPEEVALUATION_SUCCESS,
  GET_ALL_SELECTIONTYPEEVALUATIONS,
  GET_ALL_SELECTIONTYPEEVALUATIONS_FAILURE,
  GET_ALL_SELECTIONTYPEEVALUATIONS_SUCCESS,
  GET_ALL_SELECTIONTYPEEVALUATIONS_BY_TYPE,
  GET_ALL_SELECTIONTYPEEVALUATIONS_BY_TYPE_FAILURE,
  GET_ALL_SELECTIONTYPEEVALUATIONS_BY_TYPE_SUCCESS,
  UPDATE_SELECTIONTYPEEVALUATION,
  UPDATE_SELECTIONTYPEEVALUATION_FAILURE,
  UPDATE_SELECTIONTYPEEVALUATION_SUCCESS
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  selectionTypeEvaluationResponse: '',
  allSelectionTypeEvaluation: [],
  allSelectionTypeEvaluationByType: []
};

export default function functionalStructureReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    // TRIGGERING ACTIONS
    case GET_ALL_SELECTIONTYPEEVALUATIONS:
    case GET_ALL_SELECTIONTYPEEVALUATIONS_BY_TYPE:
    case ADD_SELECTIONTYPEEVALUATION:
    case UPDATE_SELECTIONTYPEEVALUATION:
    case DELETE_SELECTIONTYPEEVALUATION:
      return {
        ...state,
        isLoading: true,
        selectionTypeEvaluationResponse: ''
      };

    // SUCCESS ACTIONS
    case ADD_SELECTIONTYPEEVALUATION_SUCCESS:
    case UPDATE_SELECTIONTYPEEVALUATION_SUCCESS:
    case DELETE_SELECTIONTYPEEVALUATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        selectionTypeEvaluationResponse: action.payload,
        errors: {}
      };

    case GET_ALL_SELECTIONTYPEEVALUATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allSelectionTypeEvaluation: action.payload,
        selectionTypeEvaluationResponse: ''
      };
    case GET_ALL_SELECTIONTYPEEVALUATIONS_BY_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allSelectionTypeEvaluationByType: action.payload,
        selectionTypeEvaluationResponse: ''
      };

    // FAILURE ACTIONS
    case GET_ALL_SELECTIONTYPEEVALUATIONS_FAILURE:
    case GET_ALL_SELECTIONTYPEEVALUATIONS_BY_TYPE_FAILURE:
    case ADD_SELECTIONTYPEEVALUATION_FAILURE:
    case UPDATE_SELECTIONTYPEEVALUATION_FAILURE:
    case DELETE_SELECTIONTYPEEVALUATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        selectionTypeEvaluationResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
