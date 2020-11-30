import {
  ADD_STAFFDOCUMENT,
  ADD_STAFFDOCUMENT_FAILURE,
  ADD_STAFFDOCUMENT_SUCCESS,
  DELETE_STAFFDOCUMENT,
  DELETE_STAFFDOCUMENT_FAILURE,
  DELETE_STAFFDOCUMENT_SUCCESS
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  staffDocumentResponse: ''
};

export default function staffDocumentReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case ADD_STAFFDOCUMENT:
    case DELETE_STAFFDOCUMENT:
      return {
        ...state,
        isLoading: true,
        staffDocumentResponse: ''
      };

    // SUCCESS ACTIONS
    case ADD_STAFFDOCUMENT_SUCCESS:
    case DELETE_STAFFDOCUMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        staffDocumentResponse: action.payload,
        errors: {}
      };

    // FAILURE ACTIONS
    case ADD_STAFFDOCUMENT_FAILURE:
    case DELETE_STAFFDOCUMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        staffDocumentResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
