import React from 'react';
import MUIDataTable from 'mui-datatables';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from './Contact-jss';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
const columns = [
  {
    name: 'firstName',
    label: 'first Name',
    options: {
      filter: true
    }
  },
  {
    label: 'father Family Name',
    name: 'fatherFamilyName',
    options: {
      filter: true
    }
  },
  {
    label: 'mother Family Name',
    name: 'motherFamilyName',
    options: {
      filter: true
    }
  },
  {
    label: 'department',
    name: 'department',
    options: {
      filter: true
    }
  },
  {
    label: 'position',
    name: 'position',
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
    label: 'company Fix Phone',
    name: 'companyFixPhone',
    options: {
      filter: true
    }
  },
  {
    label: 'company Mobile Phone',
    name: 'companyMobilePhone',
    options: {
      filter: true
    }
  },
  {
    label: 'company Email',
    name: 'companyEmail',
    options: {
      filter: true
    }
  },
  {
    label: 'personal Mobile Phone',
    name: 'personalMobilePhone',
    options: {
      filter: true
    }
  },
  {
    label: 'personal Email',
    name: 'personalEmail',
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
