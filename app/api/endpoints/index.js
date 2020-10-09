
// API Endpoints
const ENDPOINTS = {
  AUTH: '/api/auth',
  TRANSLATION: {
    DEFAULT_SENTENCE: '/api/translation/defaultSentence',
    TRANSLATE_SENTENCE: '/api/translation/translateSentence'
  },
  WATER_SERVICE: '/api/waterService',
  WATER_CONTRACT: '/api/waterContract',
  MEASUREMENT_UNIT: '/api/measurementUnit',
  APPLICATION: '/api/application',
  CLIENT: '/api/client',
  NATIONAL: '/api/national',
  CITY: 'http://localhost:9000/api/city',
  COMMERCIALOPERATIONSTATUS: 'http://localhost:9000/api/commercialOperationStatus',
  CONTRACTING: {
    APPLICATIONS: '/api/applications',
    CONTRACTS: '/api/contract',
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
