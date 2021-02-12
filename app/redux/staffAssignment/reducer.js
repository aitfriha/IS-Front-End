import {
  UPDATE_OPERATION_ASSIGNMENT,
  UPDATE_OPERATION_ASSIGNMENT_FAILURE,
  UPDATE_OPERATION_ASSIGNMENT_SUCCESS,
  GET_TREE_DATA,
  GET_TREE_DATA_FAILURE,
  GET_TREE_DATA_SUCCESS,
  GET_ELIGIBLE_STAFF,
  GET_ELIGIBLE_STAFF_FAILURE,
  GET_ELIGIBLE_STAFF_SUCCESS,
  GET_STAFF_ASSIGNED_BY_OPERATION,
  GET_STAFF_ASSIGNED_BY_OPERATION_FAILURE,
  GET_STAFF_ASSIGNED_BY_OPERATION_SUCCESS,
  FILTER_STAFF_BY_EMAIL,
  FILTER_STAFF_BY_EMAIL_FAILURE,
  FILTER_STAFF_BY_EMAIL_SUCCESS,

  GET_CUSTOMER_CONTRACTS_BY_EMPLOYEE,
  GET_CUSTOMER_CONTRACTS_BY_EMPLOYEE_FAILURE,
  GET_CUSTOMER_CONTRACTS_BY_EMPLOYEE_SUCCESS,

  GET_CUSTOMER_CONTRACTS_BY_COMPANY_EMAIL,
  GET_CUSTOMER_CONTRACTS_BY_COMPANY_EMAIL_FAILURE,
  GET_CUSTOMER_CONTRACTS_BY_COMPANY_EMAIL_SUCCESS,

  GET_OPERATIONS_BY_EMPLOYEE_AND_CUSTOMER,
  GET_OPERATIONS_BY_EMPLOYEE_AND_CUSTOMER_FAILURE,
  GET_OPERATIONS_BY_EMPLOYEE_AND_CUSTOMER_SUCCESS,

  EXPORT_STAFF_ASSIGNMENT,
  EXPORT_STAFF_ASSIGNMENT_FAILURE,
  EXPORT_STAFF_ASSIGNMENT_SUCCESS

} from './constants';

const initialState = {
  isLoading: false,
  errors: {},
  staffAssignmentResponse: '',
  treeData: [],
  filterStaff: [],
  eligibleStaff: [],
  assignedStaff: [],
  reportData: [],
  customerContracts: [],
  operations: []
};

export default function staffAssignmentReducer(state = initialState, action) {
  switch (action.type) {
    // TRIGGERING ACTIONS
    case UPDATE_OPERATION_ASSIGNMENT:
    case GET_TREE_DATA:
    case GET_ELIGIBLE_STAFF:
    case GET_STAFF_ASSIGNED_BY_OPERATION:
    case FILTER_STAFF_BY_EMAIL:
    case GET_CUSTOMER_CONTRACTS_BY_EMPLOYEE:
    case GET_OPERATIONS_BY_EMPLOYEE_AND_CUSTOMER:
    case EXPORT_STAFF_ASSIGNMENT:
    case GET_CUSTOMER_CONTRACTS_BY_COMPANY_EMAIL:
      return {
        ...state,
        isLoading: true
      };

    // SUCCESS ACTIONS
    case UPDATE_OPERATION_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        staffAssignmentResponse: action.payload,
        errors: {}
      };

    case GET_TREE_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        treeData: action.payload,
      };
    case GET_ELIGIBLE_STAFF_SUCCESS:
      return {
        ...state,
        isLoading: false,
        eligibleStaff: action.payload,
      };

    case GET_STAFF_ASSIGNED_BY_OPERATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        assignedStaff: action.payload,
      };

    case FILTER_STAFF_BY_EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        filterStaff: action.payload,
      };

    case GET_CUSTOMER_CONTRACTS_BY_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        customerContracts: action.payload,
        errors: {}
      };

    case GET_CUSTOMER_CONTRACTS_BY_COMPANY_EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        customerContracts: action.payload,
        errors: {}
      };

    case GET_OPERATIONS_BY_EMPLOYEE_AND_CUSTOMER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        operations: action.payload,
        errors: {}
      };
    case EXPORT_STAFF_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        staffAssignmentResponse: action.payload,
      };

    // FAILURE ACTIONS
    case UPDATE_OPERATION_ASSIGNMENT_FAILURE:
    case GET_TREE_DATA_FAILURE:
    case GET_ELIGIBLE_STAFF_FAILURE:
    case GET_STAFF_ASSIGNED_BY_OPERATION_FAILURE:
    case FILTER_STAFF_BY_EMAIL_FAILURE:
    case GET_CUSTOMER_CONTRACTS_BY_EMPLOYEE_FAILURE:
    case GET_CUSTOMER_CONTRACTS_BY_COMPANY_EMAIL_FAILURE:
    case GET_OPERATIONS_BY_EMPLOYEE_AND_CUSTOMER_FAILURE:
    case EXPORT_STAFF_ASSIGNMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        staffAssignmentResponse: '',
        errors: action.errors
      };

    default:
      return state;
  }
}
