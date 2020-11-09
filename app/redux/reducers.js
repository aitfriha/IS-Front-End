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
import assignmentReducer from './assignment/reducer';

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
    assignments: assignmentReducer,
    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers
  });
  // Wrap the root reducer and return a new root reducer with router state
  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(rootReducer);
}
