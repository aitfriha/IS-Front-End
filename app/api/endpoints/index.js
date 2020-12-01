// API Endpoints
const ENDPOINTS = {
  AUTH: '/api/auth',
  TRANSLATION: {
    DEFAULT_SENTENCE: '/api/translation/defaultSentence',
    TRANSLATE_SENTENCE: '/api/translation/translateSentence'
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
  LEGALCATEGORYTYPE: 'http://localhost:9000/api/legalCategoryType',
  CONTRACTMODEL: 'http://localhost:9000/api/contractModel',
  FUNCTIONALSTRUCTURE: 'http://localhost:9000/api/functionalStructure',
  ADMINISTRATIVESTRUCTURE: 'http://localhost:9000/api/administrativeStructure',
  FUNCTIONALSTRUCTUREASSIGNATIONHISTORY:
    'http://localhost:9000/api/functionalStructureAssignationHistory',
    ADMINISTRATIVESTRUCTUREASSIGNATIONHISTORY:
    'http://localhost:9000/api/administrativeStructureAssignationHistory',
  CONTACTBYOPERATION: 'http://localhost:9000/api/contactByOperation',
  CIVILITYTITLE: 'http://localhost:9000/api/civilityTitle',
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
    ROLE: '/api/role'
  },
  TEST: '/api/test/t'
};

export default ENDPOINTS;
