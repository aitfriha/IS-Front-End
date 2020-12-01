import {
  GET_ALL_ADMINISTRATIVESTRUCTUREASSIGNATIONHISTORIES,
  GET_ALL_ADMINISTRATIVESTRUCTUREASSIGNATIONHISTORIES_SUCCESS,
  GET_ALL_ADMINISTRATIVESTRUCTUREASSIGNATIONHISTORIES_FAILURE,
  GET_ALL_ADMINISTRATIVESTRUCTUREASSIGNATIONHISTORIES_BY_LEVEL,
  GET_ALL_ADMINISTRATIVESTRUCTUREASSIGNATIONHISTORIES_BY_LEVEL_SUCCESS,
  GET_ALL_ADMINISTRATIVESTRUCTUREASSIGNATIONHISTORIES_BY_LEVEL_FAILURE
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  administrativeStructureAssignationHistoryResponse: '',
  allAdministrativeStructureAssignationHistory: [],
  allAdministrativeStructureAssignationHistoryByLevel: []
};

export default function administrativeStructureAssignationHistoryReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case GET_ALL_ADMINISTRATIVESTRUCTUREASSIGNATIONHISTORIES:
    case GET_ALL_ADMINISTRATIVESTRUCTUREASSIGNATIONHISTORIES_BY_LEVEL:
      return {
        ...state,
        isLoading: true,
        administrativeStructureAssignationHistoryResponse: ''
      };

    // SUCCESS ACTIONS
    case GET_ALL_ADMINISTRATIVESTRUCTUREASSIGNATIONHISTORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allAdministrativeStructureAssignationHistory: action.payload,
        administrativeStructureAssignationHistoryResponse: ''
      };

    case GET_ALL_ADMINISTRATIVESTRUCTUREASSIGNATIONHISTORIES_BY_LEVEL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allAdministrativeStructureAssignationHistoryByLevel: action.payload,
        administrativeStructureAssignationHistoryResponse: ''
      };

    // FAILURE ACTIONS
    case GET_ALL_ADMINISTRATIVESTRUCTUREASSIGNATIONHISTORIES_FAILURE:
    case GET_ALL_ADMINISTRATIVESTRUCTUREASSIGNATIONHISTORIES_BY_LEVEL_FAILURE:
      return {
        ...state,
        isLoading: false,
        administrativeStructureAssignationHistoryResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
