import {
    ADD_SUBJECT,
    DELETE_SUBJECT,
    GET_ALL_SUBJECTS,
    UPDATE_SUBJECT

} from './constants';

export const addSubject = (subject) => ({
    type: ADD_SUBJECT,
    subject
});
export const updateSubject = (subjectWithId) => ({
    type: UPDATE_SUBJECT,
    subjectWithId
});

export const deleteSubject = (subjectId) => ({
    type: DELETE_SUBJECT,
    subjectId
});

export const getAllSubjects = () => ({
    type: GET_ALL_SUBJECTS,
});
