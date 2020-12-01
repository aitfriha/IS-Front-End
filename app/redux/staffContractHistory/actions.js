import {
  GET_ALL_STAFFCONTRACTHISTORIES,
  GET_ALL_STAFFCONTRACTHISTORIES_BY_CONTRACT
} from './constants';

export const getAllStaffContractHistory = () => ({
  type: GET_ALL_STAFFCONTRACTHISTORIES
});

export const getAllStaffContractHistoryByContract = staffContractId => ({
  type: GET_ALL_STAFFCONTRACTHISTORIES_BY_CONTRACT,
  staffContractId
});
