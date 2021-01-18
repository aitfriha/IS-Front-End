import {
    ADD_SUBJECT_FIELD,
    ADD_SUBJECT_FIELD_FAILURE,
    ADD_SUBJECT_FIELD_SUCCESS,
    DELETE_SUBJECT_FIELD,
    DELETE_SUBJECT_FIELD_FAILURE,
    DELETE_SUBJECT_FIELD_SUCCESS,
    GET_ALL_SUBJECT_FIELDS,
    GET_ALL_SUBJECT_FIELDS_FAILURE,
    GET_ALL_SUBJECT_FIELDS_SUCCESS,
    UPDATE_SUBJECT_FIELD,
    UPDATE_SUBJECT_FIELD_FAILURE,
    UPDATE_SUBJECT_FIELD_SUCCESS
} from './constants';

const initialState = {
    isLoading: false,
    errors: {},
    subjectFieldsResponse: '',
    allSubjectFields: []
};

export default function subjectsFieldReducer(state = initialState, action) {
    switch (action.type) {
    // TRIGGERING ACTIONS
    case GET_ALL_SUBJECT_FIELDS:
    case ADD_SUBJECT_FIELD:
    case UPDATE_SUBJECT_FIELD:
    case DELETE_SUBJECT_FIELD:
        return {
            ...state,
            isLoading: true
        };

        // SUCCESS ACTIONS
    case ADD_SUBJECT_FIELD_SUCCESS:
    case UPDATE_SUBJECT_FIELD_SUCCESS:
    case DELETE_SUBJECT_FIELD_SUCCESS:
        return {
            ...state,
            isLoading: false,
            subjectFieldsResponse: action.payload,
            errors: {}
        };

    case GET_ALL_SUBJECT_FIELDS_SUCCESS:
        return {
            ...state,
            isLoading: false,
            allSubjectFields: action.payload,
        };

        // FAILURE ACTIONS
    case GET_ALL_SUBJECT_FIELDS_FAILURE:
    case ADD_SUBJECT_FIELD_FAILURE:
    case UPDATE_SUBJECT_FIELD_FAILURE:
    case DELETE_SUBJECT_FIELD_FAILURE:
        return {
            ...state,
            isLoading: false,
            subjectFieldsResponse: '',
            errors: action.errors
        };

    default:
        return state;
    }
}
