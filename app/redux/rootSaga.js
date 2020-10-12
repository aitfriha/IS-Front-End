import { all } from 'redux-saga/effects';

import citysSaga from './city/saga';
import commercialOperationStatusSaga from './commercialOperationStatus/saga';
import commercialServiceTypeSaga from './serviceType/saga';
import stateCountrySaga from './stateCountry/saga';
import countrySaga from './country/saga';
// import watchers from other files
export default function* rootSaga() {
  yield all([
    citysSaga(),
    commercialOperationStatusSaga(),
    commercialServiceTypeSaga(),
    stateCountrySaga(),
    countrySaga()
    // add other watchers to the array
  ]);
}
