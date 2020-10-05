import React from 'react';
import MUIDataTable from 'mui-datatables';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { TableCell } from '@material-ui/core';
import styles from './serviceType-jss';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
const columns = [
  {
    name: 'serviceTypeName',
    label: 'Service Type Name',
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
    label: 'Actions',
    name: ' ',
    options: {
      customBodyRender: (value) => (
        <React.Fragment>
          <IconButton onClick={() => console.log(value)}>
            <EditIcon color="secondary" />
          </IconButton>
          <IconButton onClick={() => console.log(value)}>
            <DeleteIcon color="primary" />
          </IconButton>
        </React.Fragment>
      )
    }
  }
];
const data = [
  {
    description: 'Desc 1',
    serviceTypeName: 'Implementation',
  },
  {
    description: 'Desc 1',
    serviceTypeName: 'Support L1',
  },
  {
    description: 'Desc 1',
    serviceTypeName: 'Support L2',
  },
  {
    description: 'Desc 1',
    serviceTypeName: 'Support L3',
  },
  {
    description: 'Desc 1',
    serviceTypeName: 'Functionality Support',
  },
  {
    description: 'Desc 1',
    serviceTypeName: 'Licencies',
  },
  {
    description: 'Desc 1',
    serviceTypeName: 'Consultory Assitans',
  },
  {
    description: 'Desc 1',
    serviceTypeName: 'PMO Services',
  },
  {
    description: 'Desc 1',
    serviceTypeName: 'Training',
  },
  {
    description: 'Desc 1',
    serviceTypeName: 'Administration',
  }
];
class ServiceTypeBlock extends React.Component {
  render() {
    const options = {
      filter: true,
      selectableRows: false,
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
    };

    return (
      <div>
        <MUIDataTable
          title="Service Types"
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}
ServiceTypeBlock.propTypes = {
  classes: PropTypes.object.isRequired,
  sectorsConfig: PropTypes.array.isRequired
};

export default withStyles(styles)(ServiceTypeBlock);
