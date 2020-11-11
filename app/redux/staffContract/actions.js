import {
  UPDATE_STAFFCONTRACT
} from './constants';

export const updateStaffContract = staffContractWithId => ({
  type: UPDATE_STAFFCONTRACT,
  staffContractWithId
});
