import React, { useContext } from 'react';
import {
  Grid,
  TextField,
  Button,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  makeStyles
} from '@material-ui/core';
import { PapperBlock } from 'dan-components';
import { isString } from 'lodash';
import { ThemeContext } from '../../App/ThemeWrapper';
import history from '../../../utils/history';
import styles from './selectionTypes-jss';
import '../Configurations/map/app.css';
import AutoComplete from '../../../components/AutoComplete';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
import MUIDataTable from 'mui-datatables';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getAllSelectionTypeEvaluation,
  saveSelectionTypeEvaluation
} from '../../../redux/selectionTypeEvaluation/actions';
import notification from '../../../components/Notification/Notification';

const columns = [
  {
    name: 'name',
    label: 'Name',
    options: {
      filter: true
    }
  },
  {
    label: 'Description',
    name: 'description',
    options: {
      filter: true
    }
  },
  {
    label: 'Type',
    name: 'type',
    options: {
      filter: true
    }
  }
];

const useStyles = makeStyles(styles);

class AddSelectionType extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => {};
    this.state = {
      description1: '',
      description2: '',
      mainTypeName: '',
      subTypeName: '',
      mainTypes: [],
      subTypes: [],
      data: [],
      mainTypeExist: false,
      subTypeExist: false
    };
  }

  componentDidMount() {
    const {
      changeTheme,
      allSelectionTypeEvaluation,
      getAllSelectionTypeEvaluation
    } = this.props;
    changeTheme('blueCyanTheme');
    getAllSelectionTypeEvaluation();
    const mainTypes = allSelectionTypeEvaluation.filter(
      type => type.type === 'Main Type'
    );
    const subTypes = allSelectionTypeEvaluation.filter(
      type => type.type === 'Sub Type'
    );
    this.setState({
      subTypes,
      mainTypes
    });
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleSubmitType = () => {
    const {
      saveSelectionTypeEvaluation,
      getAllSelectionTypeEvaluation
    } = this.props;
    const {
      mainTypeName,
      subTypeName,
      description1,
      description2
    } = this.state;
    const types = [];
    if (mainTypeName) {
      const mainType = {
        name: mainTypeName,
        description: description1,
        type: 'Main Type'
      };
      types.push(mainType);
    }
    if (subTypeName) {
      const subType = {
        name: subTypeName,
        description: description2,
        type: 'Sub Type'
      };
      types.push(subType);
    }

    const promise = new Promise(resolve => {
      saveSelectionTypeEvaluation(types);
      this.editingPromiseResolve = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        notification('success', result);
        getAllSelectionTypeEvaluation();
        history.push('/app/hh-rr/selectionTypeEvaluation');
      } else {
        notification('danger', result);
      }
    });
  };

  handleValueChange = (value, type) => {
    if (type === 'mainTypeName') {
      this.setState({
        mainTypeExist: false
      });
    } else if (type === 'subTypeName') {
      this.setState({
        subTypeExist: false
      });
    }
    this.setState({ [type]: value });
  };

  check = () => {
    const {
      mainTypeName,
      subTypeName,
      mainTypeExist,
      subTypeExist
    } = this.state;
    if (mainTypeName || mainTypeExist || (mainTypeName && subTypeName)) {
      return false;
    }
    return true;
  };

  choosedSuggestion = selectionType => {
    if (selectionType.type === 'Main Type') {
      this.setState({
        mainTypeExist: true
      });
    } else if (selectionType.type === 'Sub Type') {
      this.setState({
        subTypeExist: true
      });
    }
  };

  render() {
    const {
      classes,
      allSelectionTypeEvaluation,
      isLoadingselectionTypeEvaluation,
      selectionTypeEvaluationResponse,
      errorselectionTypeEvaluation,
      logedUser
    } = this.props;
    const thelogedUser = JSON.parse(logedUser);
    const {
      description1,
      mainTypes,
      subTypes,
      description2,
      mainTypeExist,
      subTypeExist
    } = this.state;
    let exportButton = false;
    if (thelogedUser.userRoles[0].actionsNames.hh_selectionTypesEvaluation_export) {
      exportButton = true;
    }
    const options = {
      filter: true,
      selectableRows: false,
      filterType: 'dropdown',
      responsive: 'stacked',
      download: exportButton,
      print: exportButton,
      rowsPerPage: 10,
      customToolbar: () => (
        <CustomToolbar
          csvData={allSelectionTypeEvaluation}
          url="/app/hh-rr/selectionTypeEvaluation/create-type"
          tooltip="add new selection type"
          hasAddRole={thelogedUser.userRoles[0].actionsNames.hh_selectionTypesEvaluation_create}
          hasExportRole={thelogedUser.userRoles[0].actionsNames.hh_selectionTypesEvaluation_export}
        />
      )
    };
    !isLoadingselectionTypeEvaluation
      && selectionTypeEvaluationResponse
      && this.editingPromiseResolve(selectionTypeEvaluationResponse);
    !isLoadingselectionTypeEvaluation
      && !selectionTypeEvaluationResponse
      && this.editingPromiseResolve(errorselectionTypeEvaluation);
    return (
      <div>
        <PapperBlock
          title="Selection Type Evaluation"
          icon="ios-person"
          noMargin
          whiteBg
        >
          {thelogedUser.userRoles[0].actionsNames.hh_selectionTypesEvaluation_create
            ? (
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
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                  justify="center"
                  alignContent="center"
                  alignItems="center"
                >
                  <Typography
                    variant="subtitle2"
                    color="primary"
                    style={{ width: '15%' }}
                  >
                Main Type
                  </Typography>
                  <div style={{ width: '30%' }}>
                    <AutoComplete
                      value={this.handleValueChange}
                      placeholder="Main Type Name"
                      data={mainTypes}
                      type="mainTypeName"
                      attribute="name"
                      choosedSuggestion={this.choosedSuggestion}
                    />
                  </div>
                  <TextField
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                    name="description1"
                    value={description1}
                    style={{ width: '30%', marginRight: 10 }}
                    className={classes.textField}
                    onChange={this.handleChange}
                    disabled={mainTypeExist}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={8}
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                  justify="center"
                  alignContent="center"
                  alignItems="center"
                >
                  <Typography
                    variant="subtitle2"
                    color="primary"
                    style={{ width: '15%' }}
                  >
                Sub Type
                  </Typography>
                  <div style={{ width: '30%' }}>
                    <AutoComplete
                      value={this.handleValueChange}
                      placeholder="Sub Type Name"
                      data={subTypes}
                      type="subTypeName"
                      attribute="name"
                      choosedSuggestion={this.choosedSuggestion}
                    />
                  </div>
                  <TextField
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                    name="description2"
                    value={description2}
                    style={{ width: '30%', marginRight: 10 }}
                    className={classes.textField}
                    onChange={this.handleChange}
                    disabled={subTypeExist}
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
                    onClick={this.handleSubmitType}
                    disabled={this.check()}
                  >
                Save Type
                  </Button>
                </Grid>
              </Grid>
            ) : null}
        </PapperBlock>
        <div style={{ marginTop: 20 }}>
          <MUIDataTable
            title="The Selection Type Evaluation List"
            data={allSelectionTypeEvaluation}
            columns={columns}
            options={options}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allSelectionTypeEvaluation: state.getIn(['selectionTypeEvaluations'])
    .allSelectionTypeEvaluation,
  selectionTypeEvaluationResponse: state.getIn(['selectionTypeEvaluations'])
    .selectionTypeEvaluationResponse,
  isLoadingselectionTypeEvaluation: state.getIn(['selectionTypeEvaluations'])
    .isLoading,
  errorselectionTypeEvaluation: state.getIn(['selectionTypeEvaluations']).errors,
  logedUser: localStorage.getItem('logedUser')
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    saveSelectionTypeEvaluation,
    getAllSelectionTypeEvaluation
  },
  dispatch
);

const AddSelectionTypeMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSelectionType);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <AddSelectionTypeMapped changeTheme={changeTheme} classes={classes} />;
};
