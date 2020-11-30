import {
  GET_ALL_FUNCTIONALSTRUCTUREASSIGNATIONHISTORIES,
  GET_ALL_FUNCTIONALSTRUCTUREASSIGNATIONHISTORIES_SUCCESS,
  GET_ALL_FUNCTIONALSTRUCTUREASSIGNATIONHISTORIES_FAILURE,
  GET_ALL_FUNCTIONALSTRUCTUREASSIGNATIONHISTORIES_BY_LEVEL,
  GET_ALL_FUNCTIONALSTRUCTUREASSIGNATIONHISTORIES_BY_LEVEL_SUCCESS,
  GET_ALL_FUNCTIONALSTRUCTUREASSIGNATIONHISTORIES_BY_LEVEL_FAILURE
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  functionalStructureAssignationHistoryResponse: '',
  allFunctionalStructureAssignationHistory: [],
  allFunctionalStructureAssignationHistoryByLevel: []
};

export default function functionalStructureAssignationHistoryReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case GET_ALL_FUNCTIONALSTRUCTUREASSIGNATIONHISTORIES:
    case GET_ALL_FUNCTIONALSTRUCTUREASSIGNATIONHISTORIES_BY_LEVEL:
      return {
        ...state,
        isLoading: true,
        functionalStructureAssignationHistoryResponse: ''
      };

    // SUCCESS ACTIONS
    case GET_ALL_FUNCTIONALSTRUCTUREASSIGNATIONHISTORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allFunctionalStructureAssignationHistory: action.payload,
        functionalStructureAssignationHistoryResponse: ''
      };

    case GET_ALL_FUNCTIONALSTRUCTUREASSIGNATIONHISTORIES_BY_LEVEL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allFunctionalStructureAssignationHistoryByLevel: action.payload,
        functionalStructureAssignationHistoryResponse: ''
      };

    // FAILURE ACTIONS
    case GET_ALL_FUNCTIONALSTRUCTUREASSIGNATIONHISTORIES_FAILURE:
    case GET_ALL_FUNCTIONALSTRUCTUREASSIGNATIONHISTORIES_BY_LEVEL_FAILURE:
      return {
        ...state,
        isLoading: false,
        functionalStructureAssignationHistoryResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
