import React from 'react';
import MUIDataTable from 'mui-datatables';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { addClient } from '../../../redux/actions/clientActions';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
import styles from './clients-jss';
import ClientService from '../../Services/ClientService';

class ClientBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [
        {
          label: ' ',
          name: 'isActive',
          options: {
            customBodyRender: (value) => (
              <React.Fragment>
                <IconButton size="small">
                  <RadioButtonUncheckedIcon style={{
                    backgroundColor: value === 'Yes' ? 'green' : 'red',
                    color: value === 'Yes' ? 'green' : 'red',
                    borderRadius: '100%',
                    width: '15px',
                    height: '15px'
                  }}
                  />
                </IconButton>
              </React.Fragment>
            )
          }
        },
        {
          label: ' ',
          name: 'logo',
          options: {
            customBodyRender: (value) => {
              const { classes } = this.props;
              return (
                <React.Fragment>
                  <Avatar alt="User Name" src={value} className={classes.medium} />
                </React.Fragment>
              );
            }
          }
        },
        {
          label: 'Code Client',
          name: 'codeClient',
          options: {
            filter: true,
          }
        },
        {
          name: 'name',
          label: 'Name',
          options: {
            filter: true,
          }
        },
        {
          label: 'Sector Leader',
          name: 'sectorLeader',
          options: {
            filter: true,
          }
        },
        {
          label: 'Country Leader',
          name: 'countryLeader',
          options: {
            filter: true,
          }
        },
        {
          label: 'Responsible Commercial',
          name: 'responsibleCommercial',
          options: {
            filter: true,
          }
        },
        {
          label: 'Assistant Commercial',
          name: 'assistantCommercial',
          options: {
            filter: true,
          }
        },
        {
          name: 'sector1',
          label: 'Sector 1',
          options: {
            filter: true,
          }
        },
        {
          name: 'sector2',
          label: 'Sector 2',
          options: {
            filter: true,
          }
        },
        {
          name: 'sector3',
          label: 'Sector 3',
          options: {
            filter: true,
          }
        },
        {
          name: 'city',
          label: 'City',
          options: {
            filter: true,
            sort: true,
          }
        },
        {
          name: 'country',
          label: 'Country',
          options: {
            filter: true,
            sort: true,
          }
        },
        {
          name: 'multinational',
          label: 'Multinational',
          options: {
            filter: true,
            sort: true,
          }
        },
        {
          name: 'type',
          label: 'Type',
          options: {
            filter: true,
            sort: true,
          }
        },
      ]
    };
  }

  componentDidMount() {
    ClientService.getClients().then(({ data }) => {
      this.setState({ data });
    });
  }

  handleAssignment = (tableMeta) => {
    const { data } = this.state;
    const { add, back } = this.props;
    const row = data[tableMeta.rowIndex];
    add(row);
    back('assignment');
  };

  render() {
    const { data, columns } = this.state;
    const options = {
      filter: true,
      selectableRows: false,
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
      customToolbar: () => (
        <CustomToolbar csvData={data} url="/app/gestion-commercial/clients/create-client" tooltip="add new Client" />
      )
    };

    return (
      <div>
        <MUIDataTable title="The Clients List" data={data} columns={columns} options={options} />
      </div>
    );
  }
}
ClientBlock.propTypes = {
  classes: PropTypes.object.isRequired,
  add: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
};
const mapDispatchToProps = dispatch => ({
  add: bindActionCreators(addClient, dispatch),
});
const ClientBlockMapped = connect(
  null,
  mapDispatchToProps
)(ClientBlock);

export default withStyles(styles)(ClientBlockMapped);
