import React, { useContext } from 'react';
import {
  Grid,
  TextField,
  Button,
  Typography,
  makeStyles
} from '@material-ui/core';
import { PapperBlock } from 'dan-components';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AutoComplete from '../../../components/AutoComplete';
import styles from './contractModel-jss';
import history from '../../../utils/history';
import '../Configurations/map/app.css';
import { ThemeContext } from '../../App/ThemeWrapper';
import { isString } from 'lodash';
import CountryService from '../../Services/CountryService';
import StateCountryService from '../../Services/StateCountryService';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getAllContractModel,
  saveContractModel
} from '../../../redux/contractModel/actions';
import notification from '../../../components/Notification/Notification';

const useStyles = makeStyles(styles);

class AddContractModel extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => {};
    this.state = {
      code: '',
      name: '',
      description: ''
    };
  }

  componentDidMount() {
    const { changeTheme } = this.props;
    changeTheme('blueCyanTheme');
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleSubmitContractModel = () => {
    const { saveContractModel, getAllContractModel } = this.props;
    const { code, name, description } = this.state;
    const contractModel = {
      code,
      name,
      description
    };

    console.log('submit');
    const promise = new Promise(resolve => {
      saveContractModel(contractModel);
      console.log('saveContract');
      this.editingPromiseResolve = resolve;
    });
    promise.then(result => {
      console.log(result);
      if (isString(result)) {
        notification('success', result);
        getAllContractModel();
        console.log(result);
        history.push('/app/hh-rr/contractModel');
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
      isLoadingContractModel,
      contractModelResponse,
      errorContractModel,
      allContractModel
    } = this.props;
    const { code, name, description } = this.state;
    !isLoadingContractModel
      && contractModelResponse
      && this.editingPromiseResolve(contractModelResponse);
    !isLoadingContractModel
      && !contractModelResponse
      && this.editingPromiseResolve(errorContractModel);
    return (
      <div>
        <PapperBlock
          title="Add contract model"
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
              md={7}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 12
              }}
            >
              <div style={{ width: '40%' }}>
                <AutoComplete
                  value={this.handleValueChange}
                  placeholder="Code"
                  data={allContractModel}
                  type="code"
                  attribute="code"
                  lenghtCode="10"
                />
              </div>
              <div style={{ width: '40%' }}>
                <AutoComplete
                  value={this.handleValueChange}
                  placeholder="Name"
                  data={allContractModel}
                  type="name"
                  attribute="name"
                />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              md={7}
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 12
              }}
            >
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                name="description"
                value={description}
                style={{ width: '100%' }}
                className={classes.textField}
                onChange={this.handleChange}
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={7}
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
                onClick={this.handleSubmitContractModel}
                disabled={!code || !name}
              >
                Save Model
              </Button>
            </Grid>
          </Grid>
        </PapperBlock>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allContractModel: state.getIn(['contractModels']).allContractModel,
  contractModelResponse: state.getIn(['contractModels']).contractModelResponse,
  isLoadingContractModel: state.getIn(['contractModels']).isLoading,
  errorContractModel: state.getIn(['contractModels']).errors
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    saveContractModel,
    getAllContractModel
  },
  dispatch
);

const AddContractModelMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddContractModel);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <AddContractModelMapped changeTheme={changeTheme} classes={classes} />;
};
