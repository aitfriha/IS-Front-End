import {
  ADD_TRANSLATE_SENTENCE,
  ADD_TRANSLATE_SENTENCE_FAILURE,
  ADD_TRANSLATE_SENTENCE_SUCCESS,
  DELETE_TRANSLATE_SENTENCE,
  DELETE_TRANSLATE_SENTENCE_FAILURE,
  DELETE_TRANSLATE_SENTENCE_SUCCESS,
  GET_ALL_TRANSLATE_SENTENCES,
  GET_ALL_TRANSLATE_SENTENCES_BY_COUNTRY_LANGUAGE,
  GET_ALL_TRANSLATE_SENTENCES_BY_COUNTRY_LANGUAGE_FAILURE,
  GET_ALL_TRANSLATE_SENTENCES_BY_COUNTRY_LANGUAGE_SUCCESS,
  GET_ALL_TRANSLATE_SENTENCES_DISTINCT_COUNTRY_LANGUAGES,
  GET_ALL_TRANSLATE_SENTENCES_DISTINCT_COUNTRY_LANGUAGES_FAILURE,
  GET_ALL_TRANSLATE_SENTENCES_DISTINCT_COUNTRY_LANGUAGES_SUCCESS,
  GET_ALL_TRANSLATE_SENTENCES_FAILURE,
  GET_ALL_TRANSLATE_SENTENCES_SUCCESS,
  UPDATE_TRANSLATE_SENTENCE,
  UPDATE_TRANSLATE_SENTENCE_FAILURE,
  UPDATE_TRANSLATE_SENTENCE_SUCCESS,
  CHANGE_LOCALE
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  locale: 'en-US',
  translateSentenceResponse: '',
  allTranslateSentences: [],
  systemTranslateLanguages: [],
  allTranslateSentencesByCountryLanguage: []
};

export default function translateSentencesReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case GET_ALL_TRANSLATE_SENTENCES:
    case GET_ALL_TRANSLATE_SENTENCES_DISTINCT_COUNTRY_LANGUAGES:
    case GET_ALL_TRANSLATE_SENTENCES_BY_COUNTRY_LANGUAGE:
    case ADD_TRANSLATE_SENTENCE:
    case UPDATE_TRANSLATE_SENTENCE:
    case DELETE_TRANSLATE_SENTENCE:
      return {
        ...state,
        isLoading: true
      };

      // SUCCESS ACTIONS
    case ADD_TRANSLATE_SENTENCE_SUCCESS:
    case UPDATE_TRANSLATE_SENTENCE_SUCCESS:
    case DELETE_TRANSLATE_SENTENCE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        translateSentenceResponse: action.payload,
        errors: {}
      };

    case GET_ALL_TRANSLATE_SENTENCES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allTranslateSentences: action.payload,
      };

    case GET_ALL_TRANSLATE_SENTENCES_DISTINCT_COUNTRY_LANGUAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        systemTranslateLanguages: action.payload,
      };

    case GET_ALL_TRANSLATE_SENTENCES_BY_COUNTRY_LANGUAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allTranslateSentencesByCountryLanguage: action.payload,
      };

      // FAILURE ACTIONS
    case GET_ALL_TRANSLATE_SENTENCES_FAILURE:
    case GET_ALL_TRANSLATE_SENTENCES_DISTINCT_COUNTRY_LANGUAGES_FAILURE:
    case GET_ALL_TRANSLATE_SENTENCES_BY_COUNTRY_LANGUAGE_FAILURE:
    case ADD_TRANSLATE_SENTENCE_FAILURE:
    case UPDATE_TRANSLATE_SENTENCE_FAILURE:
    case DELETE_TRANSLATE_SENTENCE_FAILURE:
      return {
        ...state,
        isLoading: false,
        translateSentenceResponse: '',
        errors: action.errors
      };
      // CHANGE LOCALE
    case CHANGE_LOCALE:
      return {
        ...state,
        locale: action.locale
      };
    default:
      return state;
  }
}
