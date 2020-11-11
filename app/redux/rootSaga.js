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
import legalCategoryTypeSaga from './legalCategoryType/saga';
import functionalStructureSaga from './functionalStructure/saga';

import assignmentSaga from './assignment/saga';
import contactSaga from './contact/saga';
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
    legalCategoryTypeSaga(),
    functionalStructureSaga(),
    assignmentSaga(),
    contactSaga()
    // add other watchers to the array
  ]);
}
