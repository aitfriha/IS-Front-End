import {
  UPDATE_STAFFCONTRACT,
  UPDATE_STAFFCONTRACT_FAILURE,
  UPDATE_STAFFCONTRACT_SUCCESS
} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  staffContractResponse: ''
};

export default function staffContractReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case UPDATE_STAFFCONTRACT:
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

    // FAILURE ACTIONS
    case UPDATE_STAFFCONTRACT_FAILURE:
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
