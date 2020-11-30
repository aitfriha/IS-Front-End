import {
  UPDATE_STAFFECONOMICCONTRACTINFORMATION
} from './constants';

export const updateStaffEconomicContractInformation = staffEconomicContractInformationWithId => ({
  type: UPDATE_STAFFECONOMICCONTRACTINFORMATION,
  staffEconomicContractInformationWithId
});
