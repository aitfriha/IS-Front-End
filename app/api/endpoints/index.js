
// API Endpoints
const ENDPOINTS = {
  AUTH: '/api/auth',
  TRANSLATION: {
    DEFAULT_SENTENCE: '/api/translation/defaultSentence',
    TRANSLATE_SENTENCE: '/api/translation/translateSentence'
  },
  CITY: 'http://localhost:9000/api/city',
  COMMERCIALOPERATIONSTATUS: 'http://localhost:9000/api/commercialOperationStatus',
  COMMERCIALSERVICETYPE: 'http://localhost:9000/api/commercialServiceType',
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
