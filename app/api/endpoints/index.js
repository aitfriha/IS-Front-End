// API Endpoints
const ENDPOINTS = {
  AUTH: 'http://localhost:9000/api/auth',
  TRANSLATION: {
    DEFAULT_SENTENCE: 'http://localhost:9000/api/translation/defaultSentence',
    TRANSLATE_SENTENCE: 'http://localhost:9000/api/translation/translateSentence'
  },
  COUNTRY: 'http://localhost:9000/api/county',
  STATECOUNTRY: 'http://localhost:9000/api/stateCountry',
  CITY: 'http://localhost:9000/api/city',
  COMMERCIALOPERATIONSTATUS:
    'http://localhost:9000/api/commercialOperationStatus',
  COMMERCIALOPERATION: 'http://localhost:9000/api/commercialOperation',
  COMMERCIALSERVICETYPE: 'http://localhost:9000/api/commercialServiceType',
  ASSIGNMENT: 'http://localhost:9000/api/assignment',
  CLIENT: 'http://localhost:9000/api/client',
  STAFF: 'http://localhost:9000/api/staff',
  STAFFCONTRACT: 'http://localhost:9000/api/staffContract',
  STAFFCONTRACTHISTORY: 'http://localhost:9000/api/staffContractHistory',
  STAFFDOCUMENT: 'http://localhost:9000/api/staffDocument',
  STAFFECONOMICCONTRACTINFORMATION:
    'http://localhost:9000/api/staffEconomicContractInformation',
  STAFFECONOMICCONTRACTINFORMATIONHISTORY:
    'http://localhost:9000/api/staffEconomicContractInformationHistory',
  SECTORCOMPANY: 'http://localhost:9000/api/SectorCompany',
  CONTACT: 'http://localhost:9000/api/contact',
  CONTRACTTYPE: 'http://localhost:9000/api/contractType',
  ABSENCETYPE: 'http://localhost:9000/api/absenceType',
  ABSENCEREQUEST: 'http://localhost:9000/api/absenceRequest',
  LEGALCATEGORYTYPE: 'http://localhost:9000/api/legalCategoryType',
  LOCALBANKHOLIDAY: 'http://localhost:9000/api/localBankHoliday',
  CONTRACTMODEL: 'http://localhost:9000/api/contractModel',
  FUNCTIONALSTRUCTURE: 'http://localhost:9000/api/functionalStructure',
  ADMINISTRATIVESTRUCTURE: 'http://localhost:9000/api/administrativeStructure',
  FUNCTIONALSTRUCTUREASSIGNATIONHISTORY:
    'http://localhost:9000/api/functionalStructureAssignationHistory',
  ADMINISTRATIVESTRUCTUREASSIGNATIONHISTORY:
    'http://localhost:9000/api/administrativeStructureAssignationHistory',
  SELECTIONTYPEEVALUATION: 'http://localhost:9000/api/selectionTypeEvaluation',
  SELECTIONPROCESSINFORMATION:
    'http://localhost:9000/api/selectionProcessInformation',
  CONTACTBYOPERATION: 'http://localhost:9000/api/contactByOperation',
  CIVILITYTITLE: 'http://localhost:9000/api/civilityTitle',
  CONTRACTING: {
    APPLICATIONS: '/api/applications',
    CONTRACTS: '/api/contract'
  },
  ADMINISTRATION: {
    DEPARTMENT: 'http://localhost:9000/api/department',
    ACTION: 'http://localhost:9000/api/action',
    SUBJECT: 'http://localhost:9000/api/subject',
    SUBJECT_FIELD: 'http://localhost:9000/api/subjectField',
    MACHINE: 'http://localhost:9000/api/machine',
    USER: 'http://localhost:9000/api/user',
    ROLE: 'http://localhost:9000/api/role',
    LOG: 'http://localhost:9000/api/log'
  },
  TEST: '/api/test/t',

  ASSIGNMENT_TYPE: 'http://localhost:9000/api/assignmentType',
  BUSINESS_EXPENSE_TYPES: 'http://localhost:9000/api/businessExpenseTypes',
  STAFF_EXPENSE_TYPES: 'http://localhost:9000/api/staffExpenseTypes',
  PERSON_TYPE: 'http://localhost:9000/api/personType',
  VOUCHER_TYPE: 'http://localhost:9000/api/voucherType',
  EXPENSE_STATUS: 'http://localhost:9000/api/expenseStatus',
  EXPENSE_EMAIL_ADDRESS: 'http://localhost:9000/api/expenseEmailAddress',
  STAFF_ASSIGNMENT: 'http://localhost:9000/api/staffAssignment',
  TRAVEL_REQUEST: 'http://localhost:9000/api/travelRequest',
  EXPENSE: 'http://localhost:9000/api/expense',
  CURRENCY: 'http://localhost:9000/api/currency',
  CURRENCY_TYPE: 'http://localhost:9000/api/typeOfCurrency',
  REQUEST_STATUS: 'http://localhost:9000/api/requestStatus',
  TRAVEL_REQUEST_EMAIL_ADDRESS: 'http://localhost:9000/api/travelRequestEmailAddress',
  WEEKLY_REPORT: 'http://localhost:9000/api/weeklyReport',
  WEEKLY_REPORT_CONFIG: 'http://localhost:9000/api/weeklyReportConfig',
};

export default ENDPOINTS;
