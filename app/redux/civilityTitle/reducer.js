import {
  ADD_CIVILITYTITLE,
  ADD_CIVILITYTITLE_FAILURE,
  ADD_CIVILITYTITLE_SUCCESS,
  DELETE_CIVILITYTITLE,
  DELETE_CIVILITYTITLE_FAILURE,
  DELETE_CIVILITYTITLE_SUCCESS,
  GET_ALL_CIVILITYTITLES,
  GET_ALL_CIVILITYTITLES_FAILURE,
  GET_ALL_CIVILITYTITLES_SUCCESS,
  UPDATE_CIVILITYTITLE,
  UPDATE_CIVILITYTITLE_FAILURE,
  UPDATE_CIVILITYTITLE_SUCCESS
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  civilityTitleResponse: '',
  allCivilityTitles: []
};

export default function civilityTitleReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case GET_ALL_CIVILITYTITLES:
    case ADD_CIVILITYTITLE:
    case UPDATE_CIVILITYTITLE:
    case DELETE_CIVILITYTITLE:
      return {
        ...state,
        isLoading: true,
        civilityTitleResponse: ''
      };

      // SUCCESS ACTIONS
    case ADD_CIVILITYTITLE_SUCCESS:
    case UPDATE_CIVILITYTITLE_SUCCESS:
    case DELETE_CIVILITYTITLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        civilityTitleResponse: action.payload,
        errors: {}
      };

    case GET_ALL_CIVILITYTITLES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allCivilityTitles: action.payload,
        civilityTitleResponse: ''
      };

      // FAILURE ACTIONS
    case GET_ALL_CIVILITYTITLES_FAILURE:
    case ADD_CIVILITYTITLE_FAILURE:
    case UPDATE_CIVILITYTITLE_FAILURE:
    case DELETE_CIVILITYTITLE_FAILURE:
      return {
        ...state,
        isLoading: false,
        civilityTitleResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
