import { all } from 'redux-saga/effects';

import citysSaga from './city/saga';
import commercialOperationStatusSaga from './commercialOperationStatus/saga';
import commercialServiceTypeSaga from './serviceType/saga';
// import watchers from other files
export default function* rootSaga() {
  yield all([
    citysSaga(),
    commercialOperationStatusSaga(),
    commercialServiceTypeSaga()
    // add other watchers to the array
  ]);
}
