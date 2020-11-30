import React, { useContext } from 'react';
import {
  Grid,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  withStyles,
  makeStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { PapperBlock } from 'dan-components';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { isString } from 'lodash';
import AutoComplete from '../../../components/AutoComplete';
import styles from './legalCategoryType-jss';
import { ThemeContext } from '../../App/ThemeWrapper';
import history from '../../../utils/history';
import '../Configurations/map/app.css';
import FinancialCompanyService from '../../Services/FinancialCompanyService';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getAllLegalCategoryType,
  getAllLegalCategoryTypeByCompany,
  saveLegalCategoryType
} from '../../../redux/legalCategoryType/actions';
import notification from '../../../components/Notification/Notification';

const useStyles = makeStyles(styles);

class AddLegalCategoryType extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => {};
    this.state = {
      name: '',
      functions: '',
      company: null,
      companies: []
    };
  }

  componentDidMount() {
    const { changeTheme } = this.props;
    changeTheme('blueCyanTheme');
    FinancialCompanyService.getCompany().then(({ data }) => {
      console.log(data);
      this.setState({ companies: data });
    });
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleChangeCompany = (ev, value) => {
    const { getAllLegalCategoryTypeByCompany } = this.props;
    this.setState({
      company: value
    });
    getAllLegalCategoryTypeByCompany(value.financialCompanyId);
  };

  handleSubmitLegalCategoryType = () => {
    const { saveLegalCategoryType, getAllLegalCategoryType } = this.props;
    const { name, functions, company } = this.state;
    const legalCategoryType = {
      name,
      functions,
      financialCompanyId: company.financialCompanyId
    };

    const promise = new Promise(resolve => {
      saveLegalCategoryType(legalCategoryType);
      this.editingPromiseResolve = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        notification('success', result);
        getAllLegalCategoryType();
        console.log(result);
        history.push('/app/hh-rr/LegalCategoryType');
      } else {
        console.log(result);
        notification('danger', result);
      }
    });
  };

  handleValueChange = (value, type) => {
    console.log(value, type);
    this.setState({ [type]: value });
  };

  render() {
    const {
      classes,
      isLoadingLegalCategoryType,
      legalCategoryTypeResponse,
      errorLegalCategoryType,
      allLegalCategoryTypeByCompany
    } = this.props;
    const {
      name, functions, company, companies
    } = this.state;
    !isLoadingLegalCategoryType
      && legalCategoryTypeResponse
      && this.editingPromiseResolve(legalCategoryTypeResponse);
    !isLoadingLegalCategoryType
      && !legalCategoryTypeResponse
      && this.editingPromiseResolve(errorLegalCategoryType);
    return (
      <div>
        <PapperBlock
          title="Add legal category type"
          icon="ios-paper-outline"
          noMargin
          whiteBg
        >
          <Grid
            container
            spacing={6}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid
              item
              xs={12}
              md={8}
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 6
              }}
            >
              <Autocomplete
                id="combo-box-demo"
                value={company}
                options={companies}
                getOptionLabel={option => option.name}
                onChange={this.handleChangeCompany}
                style={{ width: '40%', marginTop: 7 }}
                clearOnEscape
                renderInput={params => (
                  <TextField
                    fullWidth
                    {...params}
                    label="Company"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={8}
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                marginBottom: 6
              }}
            >
              <div style={{ width: '40%' }}>
                <AutoComplete
                  value={this.handleValueChange}
                  placeholder="Name"
                  data={allLegalCategoryTypeByCompany}
                  type="name"
                  attribute="name"
                />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              md={8}
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 6
              }}
            >
              <TextField
                id="outlined-basic"
                label="Functions"
                variant="outlined"
                name="functions"
                value={functions}
                style={{ width: '40%' }}
                required
                multiline
                className={classes.textField}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={8}
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 12
              }}
            >
              <Button
                color="primary"
                variant="contained"
                size="medium"
                onClick={this.handleSubmitLegalCategoryType}
                disabled={!functions || !name || !company}
              >
                Save Type
              </Button>
            </Grid>
          </Grid>
        </PapperBlock>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allLegalCategoryType: state.getIn(['legalCategoryTypes'])
    .allLegalCategoryType,
  allLegalCategoryTypeByCompany: state.getIn(['legalCategoryTypes'])
    .allLegalCategoryTypeByCompany,
  legalCategoryTypeResponse: state.getIn(['legalCategoryTypes'])
    .legalCategoryTypeResponse,
  isLoadingLegalCategoryType: state.getIn(['legalCategoryTypes']).isLoading,
  errorLegalCategoryType: state.getIn(['legalCategoryTypes']).errors
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    saveLegalCategoryType,
    getAllLegalCategoryType,
    getAllLegalCategoryTypeByCompany
  },
  dispatch
);

const AddLegalCategoryTypeMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddLegalCategoryType);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return (
    <AddLegalCategoryTypeMapped changeTheme={changeTheme} classes={classes} />
  );
};
