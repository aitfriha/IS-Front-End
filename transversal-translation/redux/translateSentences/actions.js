import {
  GET_ALL_TRANSLATE_SENTENCES,
  GET_ALL_TRANSLATE_SENTENCES_BY_COUNTRY_LANGUAGE,
  GET_ALL_TRANSLATE_SENTENCES_DISTINCT_COUNTRY_LANGUAGES,
  UPDATE_TRANSLATE_SENTENCE,
  CHANGE_LOCALE
} from './constants';
export const updateTranslateSentence = (translateSentence) => ({
  type: UPDATE_TRANSLATE_SENTENCE,
  translateSentence
});

export const getAllTranslateSentencesByCountryLanguage = (countryLanguage) => ({
  type: GET_ALL_TRANSLATE_SENTENCES_BY_COUNTRY_LANGUAGE,
  countryLanguage
});

export const getAllTranslateSentencesDistinctCountryLanguage = () => ({
  type: GET_ALL_TRANSLATE_SENTENCES_DISTINCT_COUNTRY_LANGUAGES,
});


export const getAllTranslateSentences = () => ({
  type: GET_ALL_TRANSLATE_SENTENCES,
});


export const changeLocale = (languageLocale) => ({
  type: CHANGE_LOCALE,
  locale: languageLocale,
});
