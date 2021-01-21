import {
    ADD_SUBJECT_FIELD,
    DELETE_SUBJECT_FIELD,
    GET_ALL_SUBJECT_FIELDS,
    UPDATE_SUBJECT_FIELD

} from './constants';

export const addSubjectField = (subject) => ({
    type: ADD_SUBJECT_FIELD,
    subject
});
export const updateSubjectField = (subjectWithId) => ({
    type: UPDATE_SUBJECT_FIELD,
    subjectWithId
});

export const deleteSubjectField = (subjectId) => ({
    type: DELETE_SUBJECT_FIELD,
    subjectId
});

export const getAllSubjectFields = () => ({
    type: GET_ALL_SUBJECT_FIELDS,
});
