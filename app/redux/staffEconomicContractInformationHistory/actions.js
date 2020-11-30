import {
  GET_ALL_STAFFECONOMICCONTRACTINFORMATIONHISTORIES,
  GET_ALL_STAFFECONOMICCONTRACTINFORMATIONHISTORIES_BY_CONTRACT
} from './constants';

export const getAllStaffEconomicContractInformationHistory = () => ({
  type: GET_ALL_STAFFECONOMICCONTRACTINFORMATIONHISTORIES
});

export const getAllStaffEconomicContractInformationHistoryByContract = staffEconomicContractInformationId => ({
  type: GET_ALL_STAFFECONOMICCONTRACTINFORMATIONHISTORIES_BY_CONTRACT,
  staffEconomicContractInformationId
});
