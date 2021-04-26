import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MUIDataTable from 'mui-datatables';
import { makeStyles } from '@material-ui/core/styles';
import {
  getAllLogs,
} from '../../../../redux/logs/actions';
import { ThemeContext } from '../../../../../app/containers/App/ThemeWrapper';
import PapperBlock from '../../../../../app/components/PapperBlock/PapperBlock';

const useStyles = makeStyles();
class Role extends React.Component {
  constructor(props) {
    super(props);

    this.editingPromiseResolve = () => {
    };
    this.state = {
      columns: [
        {
          label: 'Action Date',
          name: 'actionDate'
        },
        {
          name: 'userName',
          label: 'user Email'
        },
        {
          name: 'classType',
          label: 'Entity'
        },
        {
          name: 'logType',
          label: 'action Name',
        },
        {
          name: 'description',
          label: 'description',
        },
      ]
    };
  }

  componentDidMount() {
    const { getAllLogs, changeTheme } = this.props;
    changeTheme('purpleRedTheme');
    getAllLogs();
  }


  render() {
    const { logedUser } = this.props;
    const thelogedUser = JSON.parse(logedUser);
    let exportButton = false;
    if (thelogedUser.userRoles[0].actionsNames.admin_roles_management_export) {
      exportButton = true;
    }
    const {
      allLogs, errors, isLoading, logResponse,
    } = this.props;

    const options = {
      filter: true,
      selectableRows: false,
      filterType: 'dropdown',
      responsive: 'stacked',
      download: false,
      print: exportButton,
      rowsPerPage: 10,
    };
    const { columns } = this.state;
    // Sent resolve to editing promises
    (!isLoading && logResponse) && this.editingPromiseResolve(logResponse);
    (!isLoading && !logResponse) && this.editingPromiseResolve(errors);
    return (
      <PapperBlock title="System Log" desc="">
        <MUIDataTable
          title=""
          data={allLogs && allLogs}
          columns={columns}
          options={options}
        />
      </PapperBlock>
    );
  }
}


Role.propTypes = {
  /** Classes */
  classes: PropTypes.object.isRequired,
  /** Location */
  /*  location: PropTypes.object.isRequired, */
  /** Errors */
  errors: PropTypes.object.isRequired,
  /** isLoading */
  isLoading: PropTypes.bool.isRequired,
  /** getAllLogs */
  getAllLogs: PropTypes.func.isRequired,
  /** allActions */
  allLogs: PropTypes.array.isRequired,
  /** Role Response */
  logResponse: PropTypes.string.isRequired,
};


const mapStateToProps = state => ({
  allLogs: state.getIn(['log']).allLogs,
  logResponse: state.getIn(['log']).logResponse,
  isLoading: state.getIn(['log']).isLoading,
  errors: state.getIn(['log']).errors,
  logedUser: localStorage.getItem('logedUser')
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllLogs,
}, dispatch);


const RoleMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Role);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <RoleMapped changeTheme={changeTheme} classes={classes} />;
};
