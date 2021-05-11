// API Endpoints
const ENDPOINTS = {
  AUTH: '/api/auth',
  TRANSLATION: {
    DEFAULT_SENTENCE: '/api/translation/defaultSentence',
    TRANSLATE_SENTENCE: '/api/translation/translateSentence'
  },
  COUNTRY: '/api/county',
  STATECOUNTRY: '/api/stateCountry',
  CITY: '/api/city',
  COMMERCIALOPERATIONSTATUS:
    '/api/commercialOperationStatus',
  COMMERCIALOPERATION: '/api/commercialOperation',
  COMMERCIALSERVICETYPE: '/api/commercialServiceType',
  ASSIGNMENT: '/api/assignment',
  CLIENT: '/api/client',
  STAFF: '/api/staff',
  STAFFCONTRACT: '/api/staffContract',
  STAFFCONTRACTHISTORY: '/api/staffContractHistory',
  STAFFDOCUMENT: '/api/staffDocument',
  STAFFECONOMICCONTRACTINFORMATION:
    '/api/staffEconomicContractInformation',
  STAFFECONOMICCONTRACTINFORMATIONHISTORY:
    '/api/staffEconomicContractInformationHistory',
  SECTORCOMPANY: '/api/SectorCompany',
  CONTACT: '/api/contact',
  CONTRACTTYPE: '/api/contractType',
  ABSENCETYPE: '/api/absenceType',
  ABSENCEREQUEST: '/api/absenceRequest',
  LEGALCATEGORYTYPE: '/api/legalCategoryType',
  LOCALBANKHOLIDAY: '/api/localBankHoliday',
  CONTRACTMODEL: '/api/contractModel',
  FUNCTIONALSTRUCTURE: '/api/functionalStructure',
  ADMINISTRATIVESTRUCTURE: '/api/administrativeStructure',
  FUNCTIONALSTRUCTUREASSIGNATIONHISTORY:
    '/api/functionalStructureAssignationHistory',
  ADMINISTRATIVESTRUCTUREASSIGNATIONHISTORY:
    '/api/administrativeStructureAssignationHistory',
  SELECTIONTYPEEVALUATION: '/api/selectionTypeEvaluation',
  SELECTIONPROCESSINFORMATION:
    '/api/selectionProcessInformation',
  CONTACTBYOPERATION: '/api/contactByOperation',
  CIVILITYTITLE: '/api/civilityTitle',
  CONTRACTING: {
    APPLICATIONS: '/api/applications',
    CONTRACTS: '/api/contract'
  },
  ADMINISTRATION: {
    DEPARTMENT: '/api/department',
    ACTION: '/api/action',
    SUBJECT: '/api/subject',
    SUBJECT_FIELD: '/api/subjectField',
    MACHINE: '/api/machine',
    USER: '/api/user',
    ROLE: '/api/role',
    LOG: '/api/log'
  },
  TEST: '/api/test/t',

  ASSIGNMENT_TYPE: '/api/assignmentType',
  BUSINESS_EXPENSE_TYPES: '/api/businessExpenseTypes',
  STAFF_EXPENSE_TYPES: '/api/staffExpenseTypes',
  PERSON_TYPE: '/api/personType',
  VOUCHER_TYPE: '/api/voucherType',
  EXPENSE_STATUS: '/api/expenseStatus',
  EXPENSE_EMAIL_ADDRESS: '/api/expenseEmailAddress',
  STAFF_ASSIGNMENT: '/api/staffAssignment',
  TRAVEL_REQUEST: '/api/travelRequest',
  EXPENSE: '/api/expense',
  CURRENCY: '/api/currency',
  CURRENCY_TYPE: '/api/typeOfCurrency',
  REQUEST_STATUS: '/api/requestStatus',
  TRAVEL_REQUEST_EMAIL_ADDRESS: '/api/travelRequestEmailAddress',
  WEEKLY_REPORT: '/api/weeklyReport',
  WEEKLY_REPORT_CONFIG: '/api/weeklyReportConfig',
};

export default ENDPOINTS;
