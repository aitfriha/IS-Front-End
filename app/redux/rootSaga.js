import { all } from 'redux-saga/effects';

import citysSaga from './city/saga';
import commercialOperationStatusSaga from './commercialOperationStatus/saga';
import commercialServiceTypeSaga from './serviceType/saga';
import stateCountrySaga from './stateCountry/saga';
import countrySaga from './country/saga';
import clientSaga from './client/saga';
import sectorCompanySaga from './sectorsCompany/saga';
import commercialOperationSaga from './commercialOperation/saga';
import staffSaga from './staff/saga';
import contractTypeSaga from './contractType/saga';
import absenceTypeSaga from './absenceType/saga';
import absenceRequestSaga from './absenceRequest/saga';
import legalCategoryTypeSaga from './legalCategoryType/saga';
import localBankHolidaySaga from './localBankHoliday/saga';
import contractModelSaga from './contractModel/saga';
import functionalStructureSaga from './functionalStructure/saga';
import functionalStructureAssignationHistorySaga from './functionalStructureAssignationHistory/saga';
import administrativeStructureSaga from './administrativeStructure/saga';
import administrativeStructureAssignationHistorySaga from './administrativeStructureAssignationHistory/saga';
import staffContractSaga from './staffContract/saga';
import staffContractHistorySaga from './staffContractHistory/saga';
import staffDocumentSaga from './staffDocument/saga';
import staffEconomicContractInformationSaga from './staffEconomicContractInformation/saga';
import staffEconomicContractInformationHistorySaga from './staffEconomicContractInformationHistory/saga';

import assignmentSaga from './assignment/saga';
import contactSaga from './contact/saga';
import contactByOperationSaga from './contactByOperation/saga';
import civilityTitleSaga from './civilityTitle/saga';
// import watchers from other files
export default function* rootSaga() {
  yield all([
    citysSaga(),
    commercialOperationStatusSaga(),
    commercialOperationSaga(),
    commercialServiceTypeSaga(),
    stateCountrySaga(),
    countrySaga(),
    clientSaga(),
    sectorCompanySaga(),
    staffSaga(),
    contractTypeSaga(),
    absenceTypeSaga(),
    absenceRequestSaga(),
    legalCategoryTypeSaga(),
    localBankHolidaySaga(),
    contractModelSaga(),
    functionalStructureSaga(),
    functionalStructureAssignationHistorySaga(),
    administrativeStructureSaga(),
    administrativeStructureAssignationHistorySaga(),
    assignmentSaga(),
    staffContractSaga(),
    staffContractHistorySaga(),
    staffDocumentSaga(),
    staffEconomicContractInformationSaga(),
    staffEconomicContractInformationHistorySaga(),
    contactSaga(),
    contactByOperationSaga(),
    civilityTitleSaga()
    // add other watchers to the array
  ]);
}
