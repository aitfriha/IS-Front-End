import React, { useContext } from 'react';
import MUIDataTable from 'mui-datatables';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'dan-components';
import brand from 'dan-api/dummy/brand';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  makeStyles,
  Button
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { isString } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ThemeContext } from '../../App/ThemeWrapper';
import styles from './absenceRequest-jss';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
import {
  getAllAbsenceRequest,
  deleteAbsenceRequest
} from '../../../redux/absenceRequest/actions';
import notification from '../../../components/Notification/Notification';

const useStyles = makeStyles(styles);

class AbsenceRequest extends React.Component {
  editingPromiseResolve = () => {};

  columns = [
    {
      name: 'absenceTypeName',
      label: 'Absence Type',
      options: {
        filter: true
      }
    },
    {
      label: 'Staff',
      name: 'staffName',
      options: {
        filter: true
      }
    },
    {
      label: 'Start Date',
      name: 'startDate',
      options: {
        filter: true
      }
    },
    {
      label: 'End Date',
      name: 'endDate',
      options: {
        filter: true
      }
    },
    {
      label: 'Absence Days',
      name: 'absenceDays',
      options: {
        filter: true
      }
    },
    {
      label: 'Start Hour',
      name: 'startHour',
      options: {
        filter: true
      }
    },
    {
      label: 'End Hour',
      name: 'endHour',
      options: {
        filter: true
      }
    },
    {
      label: 'Absence Hours',
      name: 'absenceHours',
      options: {
        filter: true
      }
    },
    {
      label: ' ',
      name: ' ',
      options: {
        customBodyRender: (value, tableMeta) => (
          <React.Fragment>
            <IconButton onClick={() => this.handleDeleteRequest(tableMeta)}>
              <DeleteIcon color="primary" />
            </IconButton>
          </React.Fragment>
        )
      }
    }
  ];

  componentDidMount() {
    const { changeTheme, getAllAbsenceRequest } = this.props;
    changeTheme('blueCyanTheme');
    getAllAbsenceRequest();
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleDeleteRequest = tableMeta => {
    const {
      allAbsenceRequest,
      getAllAbsenceRequest,
      deleteAbsenceRequest
    } = this.props;
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
      + tableMeta.rowIndex;
    const promise = new Promise(resolve => {
      deleteAbsenceRequest(allAbsenceRequest[index].absenceRequestId);
      this.editingPromiseResolve = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        notification('success', result);
        getAllAbsenceRequest();
      } else {
        notification('danger', result);
      }
    });
  };

  render() {
    const {
      classes,
      allAbsenceRequest,
      isLoadingAbsenceRequest,
      absenceRequestResponse,
      errorAbsenceRequest
    } = this.props;
    const title = brand.name + ' - Staff absence requests';
    const { desc } = brand;
    const options = {
      filter: true,
      selectableRows: 'none',
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
      customToolbar: () => (
        <CustomToolbar
          csvData={allAbsenceRequest}
          url="/app/hh-rr/absenceRequest/create-absence-request"
          tooltip="create new absence request"
        />
      )
    };
    !isLoadingAbsenceRequest
      && absenceRequestResponse
      && this.editingPromiseResolve(absenceRequestResponse);
    !isLoadingAbsenceRequest
      && !absenceRequestResponse
      && this.editingPromiseResolve(errorAbsenceRequest);
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
          title="Staff Absence Requests"
          icon="ios-paper-outline"
          noMargin
        >
          <MUIDataTable
            title=""
            data={allAbsenceRequest}
            columns={this.columns}
            options={options}
          />
        </PapperBlock>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allAbsenceRequest: state.getIn(['absenceRequests']).allAbsenceRequest,
  absenceRequestResponse: state.getIn(['absenceRequests'])
    .absenceRequestResponse,
  isLoadingAbsenceRequest: state.getIn(['absenceRequests']).isLoading,
  errorAbsenceRequest: state.getIn(['absenceRequests']).errors
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getAllAbsenceRequest,
    deleteAbsenceRequest
  },
  dispatch
);

const AbsenceRequestMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(AbsenceRequest);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <AbsenceRequestMapped changeTheme={changeTheme} classes={classes} />;
};
