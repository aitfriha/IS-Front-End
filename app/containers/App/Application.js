import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../Templates/Dashboard';
import { ThemeContext } from './ThemeWrapper';
import {
  Parent,
  DashboardPage,
  BlankPage,
  Form,
  Table,
  Error,
  NotFound,
  Clients,
  AddClients,
  AddContacts,
  Companies,
  ContactByOperationStatus,
  Sectors,
  AddSector,
  FunctionalStructure,
  AddLevel,
  Areas,
  AddArea,
  CountryConfig,
  Assignments,
  AddCountry,
  CommercialAssignment,
  People,
  AddWorkers,
  Staff,
  AddStaff,
  Operations,
  OperationsAssignment,
  CommercialOperation,
  AddCommercialOperation,
  FinancialCompany,
  AddFinancialCompany,
  FinancialContract,
  AddContract,
  ClientContact,
  City,
  State,
  ContractStatus,
  AddContractStatus,
  ServiceTypes,
  Billing,
  AddBilling,
  IVA,
  AddIVA,
  Currency,
  AddCurrency,
  Retention,
  AddRetention,
  StatusOfCommercialOperation,
  ContractType,
  AddContractType,
  LegalCategoryType,
  AddLegalCategoryType,
  AbsenceType,
  AddAbsenceType, SectorsCompany,CivilityTitle
} from '../pageListAsync';
import addCompany from '../Pages/Companies/addCompany';

function Application(props) {
  const { history } = props;
  const { changeMode, changeTheme } = useContext(ThemeContext);
  return (
    <Dashboard
      history={history}
      changeMode={changeMode}
      changeTheme={changeTheme}
    >
      <Switch>
        <Route exact path="/app" component={BlankPage} />
        <Route exact path="/app/dashboard" component={DashboardPage} />
        <Route exact path="/app/form" component={Form} />
        <Route exact path="/app/table" component={Table} />
        <Route exact path="/app/page-list" component={Parent} />
        <Route exact path="/app/pages/not-found" component={NotFound} />
        <Route exact path="/app/pages/error" component={Error} />
        <Route
          exact
          path="/app/gestion-commercial/clients"
          component={Clients}
        />
        <Route
          exact
          path="/app/gestion-commercial/clients/create-client"
          component={AddClients}
        />
        <Route
          exact
          path="/app/gestion-commercial/contact/addContact"
          component={AddContacts}
        />
        <Route
          exact
          path="/app/gestion-commercial/companies"
          component={Companies}
        />
        <Route
          exact
          path="/app/gestion-commercial/contact-by-Operation"
          component={ContactByOperationStatus}
        />
        <Route
          exact
          path="/app/gestion-commercial/companies/create-company"
          component={addCompany}
        />
        <Route
          exact
          path="/app/gestion-commercial/sectors"
          component={Sectors}
        />
        <Route
          exact
          path="/app/gestion-commercial/sectorsCompany"
          component={SectorsCompany}
        />
        <Route
            exact
            path="/app/gestion-commercial/title-type"
            component={CivilityTitle}
        />
        <Route
          exact
          path="/app/gestion-commercial/sectors/create-sector"
          component={AddSector}
        />
        <Route
          exact
          path="/app/hh-rr/functionalStructure"
          component={FunctionalStructure}
        />
        <Route
          exact
          path="/app/hh-rr/functionalStructure/create-level"
          component={AddLevel}
        />
        <Route exact path="/app/hh-rr/contractType" component={ContractType} />
        <Route
          exact
          path="/app/hh-rr/contractType/create-contract-type"
          component={AddContractType}
        />
        <Route
          exact
          path="/app/hh-rr/legalCategoryType"
          component={LegalCategoryType}
        />
        <Route
          exact
          path="/app/hh-rr/legalCategoryType/create-legal-category-type"
          component={AddLegalCategoryType}
        />
        <Route exact path="/app/hh-rr/absenceType" component={AbsenceType} />
        <Route
          exact
          path="/app/hh-rr/absenceType/create-absence-type"
          component={AddAbsenceType}
        />
        <Route exact path="/app/gestion-commercial/areas" component={Areas} />
        <Route
          exact
          path="/app/gestion-commercial/areas/create-area"
          component={AddArea}
        />
        <Route
          exact
          path="/app/gestion-commercial/clients/assignments"
          component={Assignments}
        />
        <Route
          exact
          path="/app/configurations/countries"
          component={CountryConfig}
        />
        <Route
          exact
          path="/app/configurations/country"
          component={AddCountry}
        />
        <Route
          exact
          path="/app/configurations/assignments/commercial-assignment"
          component={CommercialAssignment}
        />
        <Route exact path="/app/configurations/workers" component={People} />
        <Route
          exact
          path="/app/configurations/workers/create-worker"
          component={AddWorkers}
        />
        <Route exact path="/app/hh-rr/staff" component={Staff} />
        <Route
          exact
          path="/app/hh-rr/staff/create-staff"
          component={AddStaff}
        />
        <Route
          exact
          path="/app/configurations/assignments/workers-assignment"
          component={Operations}
        />
        <Route
          exact
          path="/app/configurations/assignments/workers-assignment/create-assignment"
          component={OperationsAssignment}
        />
        <Route
          exact
          path="/app/gestion-commercial/Commercial-Operations"
          component={CommercialOperation}
        />
        <Route
          exact
          path="/app/gestion-commercial/service-type"
          component={ServiceTypes}
        />
        <Route
          exact
          path="/app/gestion-commercial/Add-Operation"
          component={AddCommercialOperation}
        />
        <Route exact path="/app/gestion-commercial/cities" component={City} />
        <Route exact path="/app/gestion-commercial/states" component={State} />
        <Route
          exact
          path="/app/gestion-commercial/contacts"
          component={ClientContact}
        />
        <Route
          exact
          path="/app/gestion-commercial/status"
          component={StatusOfCommercialOperation}
        />
        <Route
          exact
          path="/app/gestion-financial/Company"
          component={FinancialCompany}
        />
        <Route
          exact
          path="/app/gestion-financial/Company/Add-Company"
          component={AddFinancialCompany}
        />
        <Route
          exact
          path="/app/gestion-financial/Contracts"
          component={FinancialContract}
        />
        <Route
          exact
          path="/app/gestion-financial/Add-Contract"
          component={AddContract}
        />
        <Route
          exact
          path="/app/gestion-financial/Contract-Status"
          component={ContractStatus}
        />
        <Route
          exact
          path="/app/gestion-financial/Contract-Status/Add-Status"
          component={AddContractStatus}
        />
        <Route
          exact
          path="/app/gestion-financial/Billing"
          component={Billing}
        />
        <Route
          exact
          path="/app/gestion-financial/Add-Bill"
          component={AddBilling}
        />
        <Route exact path="/app/gestion-financial/IVA" component={IVA} />
        <Route exact path="/app/gestion-financial/Add-IVA" component={AddIVA} />
        <Route exact path="/app/gestion-financial/Currency-Management" component={Currency} />
        <Route exact path="/app/gestion-financial/Add-Currency" component={AddCurrency} />
        <Route exact path="/app/gestion-financial/Retention" component={Retention} />
        <Route exact path="/app/gestion-financial/Add-Retention" component={AddRetention} />
        <Route exact component={NotFound} />
      </Switch>
    </Dashboard>
  );
}

Application.propTypes = {
  history: PropTypes.object.isRequired
};

export default Application;
