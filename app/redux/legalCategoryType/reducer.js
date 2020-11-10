import {
  ADD_LEGALCATEGORYTYPE,
  ADD_LEGALCATEGORYTYPE_FAILURE,
  ADD_LEGALCATEGORYTYPE_SUCCESS,
  DELETE_LEGALCATEGORYTYPE,
  DELETE_LEGALCATEGORYTYPE_FAILURE,
  DELETE_LEGALCATEGORYTYPE_SUCCESS,
  GET_ALL_LEGALCATEGORYTYPES,
  GET_ALL_LEGALCATEGORYTYPES_FAILURE,
  GET_ALL_LEGALCATEGORYTYPES_SUCCESS,
  UPDATE_LEGALCATEGORYTYPE,
  UPDATE_LEGALCATEGORYTYPE_FAILURE,
  UPDATE_LEGALCATEGORYTYPE_SUCCESS
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  legalCategoryTypeResponse: '',
  allLegalCategoryType: []
};

export default function legalCategoryTypeReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    // TRIGGERING ACTIONS
    case GET_ALL_LEGALCATEGORYTYPES:
    case ADD_LEGALCATEGORYTYPE:
    case UPDATE_LEGALCATEGORYTYPE:
    case DELETE_LEGALCATEGORYTYPE:
      return {
        ...state,
        isLoading: true,
        legalCategoryTypeResponse: ''
      };

    // SUCCESS ACTIONS
    case ADD_LEGALCATEGORYTYPE_SUCCESS:
    case UPDATE_LEGALCATEGORYTYPE_SUCCESS:
    case DELETE_LEGALCATEGORYTYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        legalCategoryTypeResponse: action.payload,
        errors: {}
      };

    case GET_ALL_LEGALCATEGORYTYPES_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        allLegalCategoryType: action.payload,
        legalCategoryTypeResponse: ''
      };

    // FAILURE ACTIONS
    case GET_ALL_LEGALCATEGORYTYPES_FAILURE:
    case ADD_LEGALCATEGORYTYPE_FAILURE:
    case UPDATE_LEGALCATEGORYTYPE_FAILURE:
    case DELETE_LEGALCATEGORYTYPE_FAILURE:
      return {
        ...state,
        isLoading: false,
        legalCategoryTypeResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
