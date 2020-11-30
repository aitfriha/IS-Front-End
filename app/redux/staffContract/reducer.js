import {
  UPDATE_STAFFCONTRACT,
  UPDATE_STAFFCONTRACT_FAILURE,
  UPDATE_STAFFCONTRACT_SUCCESS,
  GET_ALL_STAFFCONTRACT_BY_CONTRACTTYPE,
  GET_ALL_STAFFCONTRACT_BY_CONTRACTTYPE_FAILURE,
  GET_ALL_STAFFCONTRACT_BY_CONTRACTTYPE_SUCCESS,
  GET_ALL_STAFFCONTRACT_BY_LEGALCATEGORYTYPE,
  GET_ALL_STAFFCONTRACT_BY_LEGALCATEGORYTYPE_FAILURE,
  GET_ALL_STAFFCONTRACT_BY_LEGALCATEGORYTYPE_SUCCESS,
  GET_ALL_STAFFCONTRACT_BY_CONTRACTMODEL,
  GET_ALL_STAFFCONTRACT_BY_CONTRACTMODEL_FAILURE,
  GET_ALL_STAFFCONTRACT_BY_CONTRACTMODEL_SUCCESS
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  staffContractResponse: '',
  allStaffContractByContractType: [],
  allStaffContractByLegalCategoryType: [],
  allStaffContractByContractModel: []
};

export default function staffContractReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case UPDATE_STAFFCONTRACT:
    case GET_ALL_STAFFCONTRACT_BY_CONTRACTTYPE:
    case GET_ALL_STAFFCONTRACT_BY_LEGALCATEGORYTYPE:
    case GET_ALL_STAFFCONTRACT_BY_CONTRACTMODEL:
      return {
        ...state,
        isLoading: true,
        staffContractResponse: ''
      };

    // SUCCESS ACTIONS
    case UPDATE_STAFFCONTRACT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        staffContractResponse: action.payload,
        errors: {}
      };

    case GET_ALL_STAFFCONTRACT_BY_CONTRACTTYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allStaffContractByContractType: action.payload,
        staffResponse: ''
      };

    case GET_ALL_STAFFCONTRACT_BY_LEGALCATEGORYTYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allStaffContractByLegalCategoryType: action.payload,
        staffResponse: ''
      };

    case GET_ALL_STAFFCONTRACT_BY_CONTRACTMODEL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allStaffContractByContractModel: action.payload,
        staffResponse: ''
      };

    // FAILURE ACTIONS
    case UPDATE_STAFFCONTRACT_FAILURE:
    case GET_ALL_STAFFCONTRACT_BY_CONTRACTTYPE_FAILURE:
    case GET_ALL_STAFFCONTRACT_BY_LEGALCATEGORYTYPE_FAILURE:
    case GET_ALL_STAFFCONTRACT_BY_CONTRACTMODEL_FAILURE:
      return {
        ...state,
        isLoading: false,
        staffContractResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
