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
import selectionTypeEvaluationSaga from './selectionTypeEvaluation/saga';
import selectionProcessInformationSaga from './selectionProcessInformation/saga';
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
import authSaga from '../../transversal-administration/redux/auth/saga';
import usersSaga from '../../transversal-administration/redux/users/saga';
import rolesSaga from '../../transversal-administration/redux/rolesAbilities/saga';
import departmentsSaga from '../../transversal-administration/redux/departments/saga';
import subjectsSaga from '../../transversal-administration/redux/subjects/saga';
import actionsSaga from '../../transversal-administration/redux/actions/saga';


import defaultSentencesSaga from '../../transversal-translation/redux/defaultSentences/saga';
import translateSentencesSaga from '../../transversal-translation/redux/translateSentences/saga';
import businessExpenseTypesSaga from './businessExpenseType/saga';
import staffAssignmentSaga from './staffAssignment/saga';
import travelRequestSaga from './travelRequest/saga';
import currencySaga from './currency/saga';
import currencyTypeSaga from './currencyType/saga';
import requestStatusSaga from './requestStatus/saga';
import travelRequestEmailAddressSaga from './travelRequestEmailAddress/saga';
import staffExpenseTypesSaga from './staffExpenseType/saga';
import personTypeSaga from './personType/saga';
import voucherTypeSaga from './voucherType/saga';
import expenseSaga from './expense/saga';
import expenseStatusSaga from './expenseStatus/saga';
import expenseEmailAddressSaga from './expenseEmailAddress/saga';
import assignmentTypeSaga from './assignmentType/saga';
import weeklyReportSaga from './weeklyReport/saga';
import weeklyReportConfigSaga from './weeklyReportConfig/saga';
import logsSaga from "../../transversal-administration/redux/logs/saga";

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
    selectionTypeEvaluationSaga(),
    selectionProcessInformationSaga(),
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
    civilityTitleSaga(),
    authSaga(),
    usersSaga(),
    rolesSaga(),
    departmentsSaga(),
    subjectsSaga(),
    actionsSaga(),

    defaultSentencesSaga(),
    translateSentencesSaga(),
    businessExpenseTypesSaga(),
    staffAssignmentSaga(),
    travelRequestSaga(),
    currencySaga(),
    currencyTypeSaga(),
    requestStatusSaga(),
    travelRequestEmailAddressSaga(),
    staffExpenseTypesSaga(),
    personTypeSaga(),
    voucherTypeSaga(),
    expenseSaga(),
    expenseStatusSaga(),
    expenseEmailAddressSaga(),
    assignmentTypeSaga(),
    weeklyReportSaga(),
    weeklyReportConfigSaga(),
    logsSaga()
    // add other watchers to the array
  ]);
}
