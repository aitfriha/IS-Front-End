import {
  UPDATE_STAFFECONOMICCONTRACTINFORMATION,
  UPDATE_STAFFECONOMICCONTRACTINFORMATION_FAILURE,
  UPDATE_STAFFECONOMICCONTRACTINFORMATION_SUCCESS
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  staffEconomicContractInformationResponse: ''
};

export default function staffEconomicContractInformationReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case UPDATE_STAFFECONOMICCONTRACTINFORMATION:
      return {
        ...state,
        isLoading: true,
        staffEconomicContractInformationResponse: ''
      };

    // SUCCESS ACTIONS
    case UPDATE_STAFFECONOMICCONTRACTINFORMATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        staffEconomicContractInformationResponse: action.payload,
        errors: {}
      };

    // FAILURE ACTIONS
    case UPDATE_STAFFECONOMICCONTRACTINFORMATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        staffEconomicContractInformationResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
