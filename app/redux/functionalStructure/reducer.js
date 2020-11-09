import {
  ADD_FUNCTIONALSTRUCTURELEVEL,
  ADD_FUNCTIONALSTRUCTURELEVEL_FAILURE,
  ADD_FUNCTIONALSTRUCTURELEVEL_SUCCESS,
  DELETE_FUNCTIONALSTRUCTURELEVEL,
  DELETE_FUNCTIONALSTRUCTURELEVEL_FAILURE,
  DELETE_FUNCTIONALSTRUCTURELEVEL_SUCCESS,
  GET_ALL_FUNCTIONALSTRUCTURELEVELS,
  GET_ALL_FUNCTIONALSTRUCTURELEVELS_FAILURE,
  GET_ALL_FUNCTIONALSTRUCTURELEVELS_SUCCESS,
  GET_ALL_FUNCTIONALSTRUCTURELEVELS_BY_TYPE,
  GET_ALL_FUNCTIONALSTRUCTURELEVELS_BY_TYPE_FAILURE,
  GET_ALL_FUNCTIONALSTRUCTURELEVELS_BY_TYPE_SUCCESS,
  UPDATE_FUNCTIONALSTRUCTURELEVEL,
  UPDATE_FUNCTIONALSTRUCTURELEVEL_FAILURE,
  UPDATE_FUNCTIONALSTRUCTURELEVEL_SUCCESS
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  functionalStructureLevelResponse: '',
  allFunctionalStructureLevel: [],
  allFunctionalStructureLevelByType: []
};

export default function functionalStructureReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    // TRIGGERING ACTIONS
    case GET_ALL_FUNCTIONALSTRUCTURELEVELS:
    case GET_ALL_FUNCTIONALSTRUCTURELEVELS_BY_TYPE:
    case ADD_FUNCTIONALSTRUCTURELEVEL:
    case UPDATE_FUNCTIONALSTRUCTURELEVEL:
    case DELETE_FUNCTIONALSTRUCTURELEVEL:
      return {
        ...state,
        isLoading: true,
        functionalStructureLevelResponse: ''
      };

    // SUCCESS ACTIONS
    case ADD_FUNCTIONALSTRUCTURELEVEL_SUCCESS:
    case UPDATE_FUNCTIONALSTRUCTURELEVEL_SUCCESS:
    case DELETE_FUNCTIONALSTRUCTURELEVEL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        functionalStructureLevelResponse: action.payload,
        errors: {}
      };

    case GET_ALL_FUNCTIONALSTRUCTURELEVELS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allFunctionalStructureLevel: action.payload,
        functionalStructureLevelResponse: ''
      };
    case GET_ALL_FUNCTIONALSTRUCTURELEVELS_BY_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allFunctionalStructureLevelByType: action.payload,
        functionalStructureLevelResponse: ''
      };

    // FAILURE ACTIONS
    case GET_ALL_FUNCTIONALSTRUCTURELEVELS_FAILURE:
    case GET_ALL_FUNCTIONALSTRUCTURELEVELS_BY_TYPE_FAILURE:
    case ADD_FUNCTIONALSTRUCTURELEVEL_FAILURE:
    case UPDATE_FUNCTIONALSTRUCTURELEVEL_FAILURE:
    case DELETE_FUNCTIONALSTRUCTURELEVEL_FAILURE:
      return {
        ...state,
        isLoading: false,
        functionalStructureLevelResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
