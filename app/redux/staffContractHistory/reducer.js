import {
  GET_ALL_STAFFCONTRACTHISTORIES,
  GET_ALL_STAFFCONTRACTHISTORIES_SUCCESS,
  GET_ALL_STAFFCONTRACTHISTORIES_FAILURE,
  GET_ALL_STAFFCONTRACTHISTORIES_BY_CONTRACT,
  GET_ALL_STAFFCONTRACTHISTORIES_BY_CONTRACT_SUCCESS,
  GET_ALL_STAFFCONTRACTHISTORIES_BY_CONTRACT_FAILURE
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  staffContractHistoryResponse: '',
  allStaffContractHistory: [],
  allStaffContractHistoryByContract: []
};

export default function staffContractHistoryReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case GET_ALL_STAFFCONTRACTHISTORIES:
    case GET_ALL_STAFFCONTRACTHISTORIES_BY_CONTRACT:
      return {
        ...state,
        isLoading: true,
        staffContractHistoryResponse: ''
      };

    // SUCCESS ACTIONS
    case GET_ALL_STAFFCONTRACTHISTORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allStaffContractHistory: action.payload,
        staffContractHistoryResponse: ''
      };

    case GET_ALL_STAFFCONTRACTHISTORIES_BY_CONTRACT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allStaffContractHistoryByContract: action.payload,
        staffContractHistoryResponse: ''
      };

    // FAILURE ACTIONS
    case GET_ALL_STAFFCONTRACTHISTORIES_FAILURE:
    case GET_ALL_STAFFCONTRACTHISTORIES_BY_CONTRACT_FAILURE:
      return {
        ...state,
        isLoading: false,
        staffContractHistoryResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
