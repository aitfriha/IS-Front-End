import React from 'react';
import MUIDataTable from 'mui-datatables';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from './Contact-jss';
import CustomToolbar from "../../../components/CustomToolbar/CustomToolbar";
const columns = [
  {
    name: 'client',
    label: 'Client',
    options: {
      filter: true
    }
  },
  {
    label: 'Operation',
    name: 'op',
    options: {
      filter: true
    }
  },
  {
    label: 'Responsible Commercial',
    name: 'resp',
    options: {
      filter: true
    }
  },
  {
    label: 'Assistant Commercial',
    name: 'assis',
    options: {
      filter: true
    }
  },
  {
    label: 'Operation',
    name: 'op',
    options: {
      filter: true
    }
  },
  {
    label: 'Name',
    name: 'name',
    options: {
      filter: true
    }
  },
  {
    label: 'First Name',
    name: 'firstName',
    options: {
      filter: true
    }
  },
  {
    label: 'Department',
    name: 'department',
    options: {
      filter: true
    }
  },
  {
    label: 'Position',
    name: 'position',
    options: {
      filter: true
    }
  },
  {
    label: 'Email',
    name: 'email',
    options: {
      filter: true
    }
  },
  {
    label: 'Phone',
    name: 'phone',
    options: {
      filter: true
    }
  },
  {
    label: 'Skype',
    name: 'skype',
    options: {
      filter: true
    }
  },
];
class ContactBlock extends React.Component {
  render() {
    const { sectorsConfig } = this.props;
    const options = {
      filter: true,
      selectableRows: false,
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
      customToolbar: () => (
          <CustomToolbar url="/app/gestion-commercial/contact/addContact" tooltip="Add contact" />
      )
    };

    return (
      <div>
        <MUIDataTable
          title="Contacts"
          data={sectorsConfig}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}
ContactBlock.propTypes = {
  classes: PropTypes.object.isRequired,
  sectorsConfig: PropTypes.array.isRequired
};

export default withStyles(styles)(ContactBlock);
