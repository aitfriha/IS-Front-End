import React from 'react';
import MUIDataTable from 'mui-datatables';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addArea } from '../../../redux/actions/areaActions';
import styles from './areas-jss';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';

class AreasBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [
        {
          name: 'CodeArea',
          label: 'Code area',
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
          label: 'Type',
          name: 'Type',
          options: {
            filter: true
          }
        },
        {
          label: 'Parent',
          name: 'Parent',
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
          url="/app/gestion-commercial/areas/create-area"
          tooltip="add new area"
        />
      )
    };

    return (
      <div>
        <MUIDataTable
          title="The Areas List"
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}
AreasBlock.propTypes = {
  classes: PropTypes.object.isRequired,
  add: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  add: bindActionCreators(addArea, dispatch)
});
const AreasBlockMapped = connect(
  null,
  mapDispatchToProps
)(AreasBlock);

export default withStyles(styles)(AreasBlockMapped);
