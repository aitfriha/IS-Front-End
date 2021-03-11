import React from 'react';
import MUIDataTable from 'mui-datatables';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addCompany } from '../../../redux/actions/companyActions';
import styles from './companies-jss';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';

class CompaniesBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [
        {
          name: 'Logo',
          label: 'Logo',
          options: {
            filter: true
          }
        },
        {
          name: 'Name',
          label: 'Name',
          options: {
            filter: true
          }
        },
        {
          label: 'Email',
          name: 'Email',
          options: {
            filter: true
          }
        },
        {
          label: 'Phone',
          name: 'Phone',
          options: {
            filter: true
          }
        },
        {
          label: 'Address',
          name: 'Address',
          options: {
            filter: true
          }
        },
        {
          label: 'Post code',
          name: 'post',
          options: {
            filter: true
          }
        },
        {
          name: 'City ',
          label: 'City',
          options: {
            filter: true
          }
        },
        {
          name: 'State',
          label: 'State',
          options: {
            filter: true
          }
        }
      ]
    };
  }

  componentDidMount() {}

  render() {
    const { data, columns } = this.state;
    const options = {
      filter: true,
      selectableRows: false,
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
      customToolbar: () => (
        <CustomToolbar
          csvData={data}
          url="/app/gestion-commercial/companies/create-company"
          tooltip="add new Company"
        />
      )
    };

    return (
      <div>
        <MUIDataTable
          title="The Companies List b"
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}
CompaniesBlock.propTypes = {
  classes: PropTypes.object.isRequired,
  add: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  add: bindActionCreators(addCompany, dispatch)
});
const CompaniesBlockMapped = connect(
  null,
  mapDispatchToProps
)(CompaniesBlock);

export default withStyles(styles)(CompaniesBlockMapped);
