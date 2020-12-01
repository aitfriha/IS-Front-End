import {
  GET_ALL_STAFFECONOMICCONTRACTINFORMATIONHISTORIES,
  GET_ALL_STAFFECONOMICCONTRACTINFORMATIONHISTORIES_SUCCESS,
  GET_ALL_STAFFECONOMICCONTRACTINFORMATIONHISTORIES_FAILURE,
  GET_ALL_STAFFECONOMICCONTRACTINFORMATIONHISTORIES_BY_CONTRACT,
  GET_ALL_STAFFECONOMICCONTRACTINFORMATIONHISTORIES_BY_CONTRACT_SUCCESS,
  GET_ALL_STAFFECONOMICCONTRACTINFORMATIONHISTORIES_BY_CONTRACT_FAILURE
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  staffEconomicContractInformationHistoryResponse: '',
  allStaffEconomicContractInformationHistory: [],
  allStaffEconomicContractInformationHistoryByContract: []
};

export default function staffEconomicContractInformationHistoryReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case GET_ALL_STAFFECONOMICCONTRACTINFORMATIONHISTORIES:
    case GET_ALL_STAFFECONOMICCONTRACTINFORMATIONHISTORIES_BY_CONTRACT:
      return {
        ...state,
        isLoading: true,
        staffEconomicContractInformationHistoryResponse: ''
      };

    // SUCCESS ACTIONS
    case GET_ALL_STAFFECONOMICCONTRACTINFORMATIONHISTORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allStaffEconomicContractInformationHistory: action.payload,
        staffEconomicContractInformationHistoryResponse: ''
      };

    case GET_ALL_STAFFECONOMICCONTRACTINFORMATIONHISTORIES_BY_CONTRACT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allStaffEconomicContractInformationHistoryByContract: action.payload,
        staffEconomicContractInformationHistoryResponse: ''
      };

    // FAILURE ACTIONS
    case GET_ALL_STAFFECONOMICCONTRACTINFORMATIONHISTORIES_FAILURE:
    case GET_ALL_STAFFECONOMICCONTRACTINFORMATIONHISTORIES_BY_CONTRACT_FAILURE:
      return {
        ...state,
        isLoading: false,
        staffEconomicContractInformationHistoryResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
