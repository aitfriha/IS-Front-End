import React from 'react';
import MUIDataTable from 'mui-datatables';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { TableCell } from '@material-ui/core';
import styles from './sectors-jss';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
const columns = [
  {
    name: 'primarySector',
    label: 'Primary Sector',
    options: {
      filter: true
    }
  },
  {
    label: 'Secondary Sector',
    name: 'secondarySector',
    options: {
      filter: true
    }
  },
  {
    label: 'Third Sector',
    name: 'thirdSector',
    options: {
      filter: true
    }
  },
  {
    label: 'Leader',
    name: 'leader',
    options: {
      customBodyRender: (value) => (
        <React.Fragment>
          <TableCell align="right">{value.name}</TableCell>
        </React.Fragment>
      )
    }
  },
  {
    label: ' ',
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
class SectorsBlock extends React.Component {
  render() {
    const { sectorsConfig } = this.props;
    const options = {
      filter: true,
      selectableRows: false,
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
      customToolbar: () => (
        <CustomToolbar
          csvData={sectorsConfig}
          url="/app/gestion-commercial/sectors/create-sector"
          tooltip="add new Sector"
        />
      )
    };

    return (
      <div>
        <MUIDataTable
          title="The Sectors List"
          data={sectorsConfig}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}
SectorsBlock.propTypes = {
  classes: PropTypes.object.isRequired,
  sectorsConfig: PropTypes.array.isRequired
};

export default withStyles(styles)(SectorsBlock);
