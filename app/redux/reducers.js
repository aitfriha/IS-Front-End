/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { reducer as form } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import history from 'utils/history';

import languageProviderReducer from 'containers/LanguageProvider/reducer';
import login from './modules/login';
import uiReducer from './modules/ui';
import initval from './modules/initForm';
import ClientModule from './modules/clientModule';
import CompanyModule from './modules/companyModule';
import SectorModule from './modules/sectorModule';
import AreaModule from './modules/areaModule';
import SectorConfigModule from './modules/sectorConfigModule';
import FunctionalStructureConfigModule from './modules/functionalStructureConfigModule';
import citysReducer from './city/reducer';
import commercialOperationStatusReducer from './commercialOperationStatus/reducer';
import commercialServiceTypeReducer from './serviceType/reducer';
import stateCountryReducer from './stateCountry/reducer';
import countryReducer from './country/reducer';
import clientReducer from './client/reducer';
import sectorComapnyReducer from './sectorsCompany/reducer';
import commercialOperationReducer from './commercialOperation/reducer';
import staffReducer from './staff/reducer';
import contractTypeReducer from './contractType/reducer';
import absenceTypeReducer from './absenceType/reducer';
import absenceRequestReducer from './absenceRequest/reducer';
import contractModelReducer from './contractModel/reducer';
import legalCategoryTypeReducer from './legalCategoryType/reducer';
import localBankHolidayReducer from './localBankHoliday/reducer';
import selectionTypeEvaluationReducer from './selectionTypeEvaluation/reducer';
import selectionProcessInformationReducer from './selectionProcessInformation/reducer';
import functionalStructureReducer from './functionalStructure/reducer';
import functionalStructureAssignationHistoryReducer from './functionalStructureAssignationHistory/reducer';
import administrativeStructureReducer from './administrativeStructure/reducer';
import administrativeStructureAssignationHistoryReducer from './administrativeStructureAssignationHistory/reducer';
import assignmentReducer from './assignment/reducer';
import staffContractReducer from './staffContract/reducer';
import staffContractHistoryReducer from './staffContractHistory/reducer';
import staffDocumentReducer from './staffDocument/reducer';
import staffEconomicContractInformationReducer from './staffEconomicContractInformation/reducer';
import staffEconomicContractInformationHistoryReducer from './staffEconomicContractInformationHistory/reducer';
import contactReducer from './contact/reducer';
import contactByOperationReducer from './contactByOperation/reducer';
import civilityTitleReducer from './civilityTitle/reducer';
import authReducer from '../../transversal-administration/redux/auth/reducer';
import usersReducer from '../../transversal-administration/redux/users/reducer';
import rolesReducer from '../../transversal-administration/redux/rolesAbilities/reducer';
import departmentsReducer from '../../transversal-administration/redux/departments/reducer';
import subjectsReducer from '../../transversal-administration/redux/subjects/reducer';
import actionsReducer from '../../transversal-administration/redux/actions/reducer';


import defaultSentencesReducer from '../../transversal-translation/redux/defaultSentences/reducer';
import translateSentencesReducer from '../../transversal-translation/redux/translateSentences/reducer';
import businessExpenseTypeReducer from './businessExpenseType/reducer';
import staffAssignmentReducer from './staffAssignment/reducer';
import travelRequestReducer from './travelRequest/reducer';
import currencyReducer from './currency/reducer';
import currencyTypeReducer from './currencyType/reducer';
import requestStatusReducer from './requestStatus/reducer';
import travelRequestEmailAddressReducer from './travelRequestEmailAddress/reducer';
import staffExpenseTypeReducer from './staffExpenseType/reducer';
import personTypeReducer from './personType/reducer';
import voucherTypeReducer from './voucherType/reducer';
import expenseReducer from './expense/reducer';
import assignmentTypeReducer from './assignmentType/reducer';
import expenseStatusReducer from './expenseStatus/reducer';
import expenseEmailAddressReducer from './expenseEmailAddress/reducer';
import weeklyReportReducer from './weeklyReport/reducer';
import weeklyReportConfigReducer from './weeklyReportConfig/reducer';
import logsReducer from '../../transversal-administration/redux/logs/reducer';

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    form,
    login,
    ui: uiReducer,
    initval,
    ClientModule,
    CompanyModule,
    SectorModule,
    AreaModule,
    SectorConfigModule,
    FunctionalStructureConfigModule,
    cities: citysReducer,
    commercialOperationStatus: commercialOperationStatusReducer,
    commercialOperation: commercialOperationReducer,
    commercialServiceType: commercialServiceTypeReducer,
    stateCountries: stateCountryReducer,
    countries: countryReducer,
    clients: clientReducer,
    sectorCompany: sectorComapnyReducer,
    staffs: staffReducer,
    staffContracts: staffContractReducer,
    staffContractHistories: staffContractHistoryReducer,
    staffDocuments: staffDocumentReducer,
    staffEconomicContractInformations: staffEconomicContractInformationReducer,
    staffEconomicContractInformationHistories: staffEconomicContractInformationHistoryReducer,
    contractTypes: contractTypeReducer,
    absenceTypes: absenceTypeReducer,
    absenceRequests: absenceRequestReducer,
    legalCategoryTypes: legalCategoryTypeReducer,
    localBankHolidays: localBankHolidayReducer,
    contractModels: contractModelReducer,
    selectionTypeEvaluations: selectionTypeEvaluationReducer,
    selectionProcessInformations: selectionProcessInformationReducer,
    functionalStructureLevels: functionalStructureReducer,
    administrativeStructureLevels: administrativeStructureReducer,
    functionalStructureAssignationHistories: functionalStructureAssignationHistoryReducer,
    administrativeStructureAssignationHistories: administrativeStructureAssignationHistoryReducer,
    assignments: assignmentReducer,
    contacts: contactReducer,
    contactByOperations: contactByOperationReducer,
    civilityTitle: civilityTitleReducer,
    auth: authReducer,
    user: usersReducer,
    roles: rolesReducer,
    department: departmentsReducer,
    subject: subjectsReducer,
    action: actionsReducer,
    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers,

    defaultSentences: defaultSentencesReducer,
    translateSentences: translateSentencesReducer,
    businessExpenseType: businessExpenseTypeReducer,
    staffAssignment: staffAssignmentReducer,
    travelRequest: travelRequestReducer,
    currency: currencyReducer,
    currencyType: currencyTypeReducer,
    requestStatus: requestStatusReducer,
    travelRequestEmailAddress: travelRequestEmailAddressReducer,
    staffExpenseType: staffExpenseTypeReducer,
    personType: personTypeReducer,
    voucherType: voucherTypeReducer,
    expense: expenseReducer,
    expenseStatus: expenseStatusReducer,
    expenseEmailAddress: expenseEmailAddressReducer,
    assignmentType: assignmentTypeReducer,
    weeklyReport: weeklyReportReducer,
    weeklyReportConfig: weeklyReportConfigReducer,
    log: logsReducer,
  });
  // Wrap the root reducer and return a new root reducer with router state
  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(rootReducer);
}
