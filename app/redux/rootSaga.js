import { all } from 'redux-saga/effects';

import citysSaga from './city/saga';
import commercialOperationStatusSaga from './commercialOperationStatus/saga';
// import watchers from other files
export default function* rootSaga() {
  yield all([
    citysSaga(),
    commercialOperationStatusSaga()
    // add other watchers to the array
  ]);
}
