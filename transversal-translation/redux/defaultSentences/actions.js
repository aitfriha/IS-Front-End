import {
  ADD_DEFAULT_SENTENCE,
  DELETE_DEFAULT_SENTENCE,
  GET_ALL_DEFAULT_SENTENCES,
  UPDATE_DEFAULT_SENTENCE
} from './constants';

export const addDefaultSentence = (defaultSentence) => ({
  type: ADD_DEFAULT_SENTENCE,
  defaultSentence
});

export const updateDefaultSentence = (defaultSentenceWithId) => ({
  type: UPDATE_DEFAULT_SENTENCE,
  defaultSentenceWithId
});

export const deleteDefaultSentence = (defaultSentenceId) => ({
  type: DELETE_DEFAULT_SENTENCE,
  defaultSentenceId
});

export const getAllDefaultSentences = () => ({
  type: GET_ALL_DEFAULT_SENTENCES,
});
