import {
    ADD_SUBJECT,
    ADD_SUBJECT_FAILURE,
    ADD_SUBJECT_SUCCESS,
    DELETE_SUBJECT,
    DELETE_SUBJECT_FAILURE,
    DELETE_SUBJECT_SUCCESS,
    GET_ALL_SUBJECTS,
    GET_ALL_SUBJECTS_FAILURE,
    GET_ALL_SUBJECTS_SUCCESS,
    UPDATE_SUBJECT,
    UPDATE_SUBJECT_FAILURE,
    UPDATE_SUBJECT_SUCCESS
} from './constants';

const initialState = {
    isLoading: false,
    errors: {},
    subjectResponse: '',
    allSubjects: []
};

export default function subjectsReducer(state = initialState, action) {
    switch (action.type) {
    // TRIGGERING ACTIONS
    case GET_ALL_SUBJECTS:
    case ADD_SUBJECT:
    case UPDATE_SUBJECT:
    case DELETE_SUBJECT:
        return {
            ...state,
            isLoading: true
        };

        // SUCCESS ACTIONS
    case ADD_SUBJECT_SUCCESS:
    case UPDATE_SUBJECT_SUCCESS:
    case DELETE_SUBJECT_SUCCESS:
        return {
            ...state,
            isLoading: false,
            subjectResponse: action.payload,
            errors: {}
        };

    case GET_ALL_SUBJECTS_SUCCESS:
        return {
            ...state,
            isLoading: false,
            allSubjects: action.payload,
        };

        // FAILURE ACTIONS
    case GET_ALL_SUBJECTS_FAILURE:
    case ADD_SUBJECT_FAILURE:
    case UPDATE_SUBJECT_FAILURE:
    case DELETE_SUBJECT_FAILURE:
        return {
            ...state,
            isLoading: false,
            subjectResponse: '',
            errors: action.errors
        };

    default:
        return state;
    }
}
