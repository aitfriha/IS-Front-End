import React from 'react';
import MUIDataTable from 'mui-datatables';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import StateService from '../../Services/StateCountryService';
import StateCountry from './index';

class StateBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          name: 'stateName',
          label: 'State Name',
          options: {
            filter: true
          }
        },
        {
          name: 'country',
          label: 'Country',
          options: {
            filter: true,
            customBodyRender: (value) => (
              <React.Fragment>
                <div>{value.countryName}</div>
              </React.Fragment>
            )
          }
        },
        {
          label: 'Actions',
          name: ' ',
          options: {
            customBodyRender: (value, data) => (
              <React.Fragment>
                <IconButton onClick={() => this.updateState(data.rowIndex)}>
                  <EditIcon color="secondary" />
                </IconButton>
                <IconButton onClick={() => console.log(value)}>
                  <DeleteIcon color="primary" />
                </IconButton>
              </React.Fragment>
            )
          }
        }
      ]
    }
  }
  updateState = (rowIndex) => {
    const { onSelected, states } = this.props;
    onSelected(states[rowIndex]);
  };


  render() {
    const options = {
      filter: true,
      selectableRows: false,
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
    };
    const { columns } = this.state;
    const { states } = this.props;
    return (
      <div>
        <MUIDataTable
          title="States"
          data={states}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}
StateBlock.propTypes = {
  classes: PropTypes.object.isRequired,
  onSelected: PropTypes.func.isRequired,
  states: PropTypes.array.isRequired
};
export default (StateBlock);
