import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import {
  FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography
} from '@material-ui/core';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { bindActionCreators } from 'redux';
import history from '../../../../utils/history';
import SuppliersTypeService from '../../../Services/SuppliersTypeService';
import { getAllCommercialOperation } from '../../../../redux/commercialOperation/actions';
import CommercialOperationService from '../../../Services/CommercialOperationService';
import FinancialCompanyService from '../../../Services/FinancialCompanyService';
import {
  getAllClient
} from '../../../../redux/client/actions';
import { ThemeContext } from '../../../App/ThemeWrapper';

const useStyles = makeStyles();

class AddSuppliersType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: '',
      companyId: '',
      name: '',
      description: '',
      operationAssociated: false,
      internalOrder: false,
      operations: [],
      companies: [],
      open: false,
      open2: false,
    };
  }

  componentDidMount() {
    const {
      // eslint-disable-next-line react/prop-types
      changeTheme
    } = this.props;
    changeTheme('greyTheme');
    // eslint-disable-next-line no-shadow,react/prop-types
    const { getAllClient } = this.props;
    getAllClient();
    CommercialOperationService.getCommercialOperation().then(result => {
      console.log(result.data.payload);
      this.setState({ operations: result.data.payload });
    });
    FinancialCompanyService.getCompany().then(result => {
      console.log(result);
      this.setState({ companies: result.data });
    });
  }

    handleSubmit = () => {
      const {
        currencyName, currencyCode
      } = this.state;
      const TypeOfCurrency = {
        currencyName, currencyCode
      };
      SuppliersTypeService.saveSuppliersType(TypeOfCurrency).then(result => {
        console.log(result);
        history.push('/app/gestion-financial/Suppliers-Type');
      });
    }

    handleGoBack = () => {
      history.push('/app/gestion-financial/Suppliers-Type');
    }

    handleChange = (ev) => {
      this.setState({ [ev.target.name]: ev.target.value });
    };

    handleCheck = () => {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const ok = !this.state.open;
      this.setState({ open: ok });
    }

    handleCheck2 = () => {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const ok = !this.state.open2;
      this.setState({ open2: ok });
    }

    render() {
      console.log(this.state);
      const title = brand.name + ' - Add New Supplier Type';
      const { desc } = brand;
      const {
        // eslint-disable-next-line react/prop-types
        allClients
      } = this.props;
      // eslint-disable-next-line react/prop-types
      const {
        name, description, operationAssociated, internalOrder, open, open2, clientId, operationId, operations, companies, companyId
      } = this.state;
      return (
        <div>
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={desc} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={desc} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={desc} />
          </Helmet>
          <PapperBlock
            title="Supplier Type "
            desc="Please, Fill in the fields"
            icon="ios-add-circle"
          >
            <Grid container spacing={1}>
              <Grid item xs={11} />
              <Grid item xs={1}>
                <IconButton onClick={() => this.handleGoBack()}>
                  <KeyboardBackspaceIcon color="secondary" />
                </IconButton>
              </Grid>
            </Grid>
            <br />
            <Typography variant="subtitle2" component="h2" color="primary" align="center" />
            <br />
            <Grid
                container
                spacing={6}
                alignItems="flex-start"
                direction="row"
                justify="center"
            >
              <Grid item xs={10} md={6}>
                <TextField
                    id="outlined-name"
                    label="Supplier Name"
                    variant="outlined"
                    name="name"
                    value={name}
                    required
                    fullWidth
                    onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={10} md={6}>
                <TextField
                    id="outlined-description"
                    label="Description"
                    variant="outlined"
                    name="description"
                    value={description}
                    required
                    fullWidth
                    onChange={this.handleChange}
                />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={6}
              alignItems="flex-start"
              direction="row"
              justify="center"
            >
              <Grid item xs={10} md={6}>
                <FormControlLabel
                  id="operationAssociated"
                  name="operationAssociated"
                  value={operationAssociated}
                  control={<Checkbox color="primary" onChange={this.handleCheck} />}
                  label="● Associate with Commercial Operation "
                  labelPlacement="start"
                />
                {open === false ? (
                  <div />
                ) : (
                  <Grid
                    container
                    spacing={6}
                    alignItems="flex-start"
                    direction="row"
                    justify="center"
                  >
                    <Grid item xs={8}>
                      <FormControl fullWidth required>
                        <InputLabel>Select Client</InputLabel>
                        <Select
                          name="clientId"
                          value={clientId}
                          onChange={this.handleChange}
                        >
                          {
                            allClients.map((clt) => (
                              <MenuItem key={clt.clientId} value={clt.clientId}>
                                {clt.name}
                              </MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={8}>
                      <FormControl fullWidth required>
                        <InputLabel>Select Operation</InputLabel>
                        <Select
                          name="operationId"
                          value={operationId}
                          onChange={this.handleChange}
                        >
                          {
                            operations.map((clt) => (
                              <MenuItem key={clt.commercialOperationId} value={clt.commercialOperationId}>
                                {clt.name}
                              </MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                ) }
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  id="internalOrder"
                  name="internalOrder"
                  value={internalOrder}
                  control={<Checkbox color="primary" onChange={this.handleCheck2} />}
                  label="● Add Internal Order "
                  labelPlacement="start"
                />
                {open2 === false ? (
                  <div />
                ) : (
                  <Grid
                    container
                    spacing={6}
                    alignItems="flex-start"
                    direction="row"
                    justify="center"
                  >
                    <Grid item xs={8}>
                      <FormControl fullWidth required>
                        <InputLabel>Select Company</InputLabel>
                        <Select
                          name="companyId"
                          value={companyId}
                          onChange={this.handleChange}
                        >
                          {
                            companies.map((clt) => (
                              <MenuItem key={clt.financialCompanyId} value={clt.financialCompanyId}>
                                {clt.name}
                              </MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                ) }
              </Grid>
            </Grid>
            <div align="center">
              <br />
              <br />
              <Button size="small" color="inherit" onClick={this.handleGoBack}>Cancel</Button>
              <Button variant="contained" color="primary" type="button" onClick={this.handleSubmit}>
                            Save
              </Button>
            </div>
          </PapperBlock>
        </div>
      );
    }
}

const mapStateToProps = state => ({
  allClients: state.getIn(['clients']).allClients,
  allCommercialOperations: state.getIn(['commercialOperation']).allCommercialOperations,
  clientResponse: state.getIn(['clients']).clientResponse,
  isLoading: state.getIn(['clients']).isLoading,
  errors: state.getIn(['clients']).errors,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getAllClient,
  getAllCommercialOperation,
}, dispatch);

const AddSuppliersTypeMapped = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddSuppliersType);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <AddSuppliersTypeMapped changeTheme={changeTheme} classes={classes} />;
};
