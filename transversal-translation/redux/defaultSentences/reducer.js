import {
  ADD_DEFAULT_SENTENCE,
  ADD_DEFAULT_SENTENCE_FAILURE,
  ADD_DEFAULT_SENTENCE_SUCCESS,
  DELETE_DEFAULT_SENTENCE,
  DELETE_DEFAULT_SENTENCE_FAILURE,
  DELETE_DEFAULT_SENTENCE_SUCCESS,
  GET_ALL_DEFAULT_SENTENCES,
  GET_ALL_DEFAULT_SENTENCES_FAILURE,
  GET_ALL_DEFAULT_SENTENCES_SUCCESS,
  UPDATE_DEFAULT_SENTENCE,
  UPDATE_DEFAULT_SENTENCE_FAILURE,
  UPDATE_DEFAULT_SENTENCE_SUCCESS
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  defaultSentenceResponse: '',
  allDefaultSentences: []
};

export default function defaultSentencesReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case GET_ALL_DEFAULT_SENTENCES:
    case ADD_DEFAULT_SENTENCE:
    case UPDATE_DEFAULT_SENTENCE:
    case DELETE_DEFAULT_SENTENCE:
      return {
        ...state,
        isLoading: true
      };

    // SUCCESS ACTIONS
    case ADD_DEFAULT_SENTENCE_SUCCESS:
    case UPDATE_DEFAULT_SENTENCE_SUCCESS:
    case DELETE_DEFAULT_SENTENCE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        defaultSentenceResponse: action.payload,
        errors: {}
      };

    case GET_ALL_DEFAULT_SENTENCES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allDefaultSentences: action.payload,
      };

    // FAILURE ACTIONS
    case GET_ALL_DEFAULT_SENTENCES_FAILURE:
    case ADD_DEFAULT_SENTENCE_FAILURE:
    case UPDATE_DEFAULT_SENTENCE_FAILURE:
    case DELETE_DEFAULT_SENTENCE_FAILURE:
      return {
        ...state,
        isLoading: false,
        defaultSentenceResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
