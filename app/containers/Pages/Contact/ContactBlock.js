import React from 'react';
import MUIDataTable from 'mui-datatables';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './Contact-jss';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
import { getAllClient } from '../../../redux/client/actions';
import { getAllContact } from '../../../redux/contact/actions';
import CountryService from '../../Services/CountryService';
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
  componentDidMount() {
    const { getAllContact } = this.props;
    getAllContact();
  }

  render() {
    const { allContacts } = this.props;
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
          data={allContacts && allContacts}
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
const mapStateToProps = state => ({
  // contacts
  allContacts: state.getIn(['contacts']).allContacts,
  contactResponse: state.getIn(['contacts']).contactResponse,
  isLoading: state.getIn(['contacts']).isLoading,
  errors: state.getIn(['contacts']).errors,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getAllContact
  },
  dispatch
);
export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ContactBlock)
);
