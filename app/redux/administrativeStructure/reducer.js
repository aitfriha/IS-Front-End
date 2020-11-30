import {
  ADD_ADMINISTRATIVESTRUCTURELEVEL,
  ADD_ADMINISTRATIVESTRUCTURELEVEL_FAILURE,
  ADD_ADMINISTRATIVESTRUCTURELEVEL_SUCCESS,
  DELETE_ADMINISTRATIVESTRUCTURELEVEL,
  DELETE_ADMINISTRATIVESTRUCTURELEVEL_FAILURE,
  DELETE_ADMINISTRATIVESTRUCTURELEVEL_SUCCESS,
  GET_ALL_ADMINISTRATIVESTRUCTURELEVELS,
  GET_ALL_ADMINISTRATIVESTRUCTURELEVELS_FAILURE,
  GET_ALL_ADMINISTRATIVESTRUCTURELEVELS_SUCCESS,
  GET_ALL_ADMINISTRATIVESTRUCTURELEVELS_BY_TYPE,
  GET_ALL_ADMINISTRATIVESTRUCTURELEVELS_BY_TYPE_FAILURE,
  GET_ALL_ADMINISTRATIVESTRUCTURELEVELS_BY_TYPE_SUCCESS,
  UPDATE_ADMINISTRATIVESTRUCTURELEVEL,
  UPDATE_ADMINISTRATIVESTRUCTURELEVEL_FAILURE,
  UPDATE_ADMINISTRATIVESTRUCTURELEVEL_SUCCESS
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  administrativeStructureLevelResponse: '',
  allAdministrativeStructureLevel: [],
  allAdministrativeStructureLevelByType: []
};

export default function administrativeStructureReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    // TRIGGERING ACTIONS
    case GET_ALL_ADMINISTRATIVESTRUCTURELEVELS:
    case GET_ALL_ADMINISTRATIVESTRUCTURELEVELS_BY_TYPE:
    case ADD_ADMINISTRATIVESTRUCTURELEVEL:
    case UPDATE_ADMINISTRATIVESTRUCTURELEVEL:
    case DELETE_ADMINISTRATIVESTRUCTURELEVEL:
      return {
        ...state,
        isLoading: true,
        administrativeStructureLevelResponse: ''
      };

    // SUCCESS ACTIONS
    case ADD_ADMINISTRATIVESTRUCTURELEVEL_SUCCESS:
    case UPDATE_ADMINISTRATIVESTRUCTURELEVEL_SUCCESS:
    case DELETE_ADMINISTRATIVESTRUCTURELEVEL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        administrativeStructureLevelResponse: action.payload,
        errors: {}
      };

    case GET_ALL_ADMINISTRATIVESTRUCTURELEVELS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allAdministrativeStructureLevel: action.payload,
        administrativeStructureLevelResponse: ''
      };
    case GET_ALL_ADMINISTRATIVESTRUCTURELEVELS_BY_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allAdministrativeStructureLevelByType: action.payload,
        administrativeStructureLevelResponse: ''
      };

    // FAILURE ACTIONS
    case GET_ALL_ADMINISTRATIVESTRUCTURELEVELS_FAILURE:
    case GET_ALL_ADMINISTRATIVESTRUCTURELEVELS_BY_TYPE_FAILURE:
    case ADD_ADMINISTRATIVESTRUCTURELEVEL_FAILURE:
    case UPDATE_ADMINISTRATIVESTRUCTURELEVEL_FAILURE:
    case DELETE_ADMINISTRATIVESTRUCTURELEVEL_FAILURE:
      return {
        ...state,
        isLoading: false,
        administrativeStructureLevelResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
