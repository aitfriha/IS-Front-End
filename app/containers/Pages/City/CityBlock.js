import React from 'react';
import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
class CityBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          name: 'cityName',
          label: 'City Name',
          options: {
            filter: true
          }
        },
        {
          name: 'stateCountry',
          label: 'State',
          options: {
            customBodyRender: (value) => (
              <React.Fragment>
                <div>{value.stateName}</div>
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
                <IconButton onClick={() => this.updateCity(data.rowIndex)}>
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
  updateCity = (rowIndex) => {
    const { onSelected, cities } = this.props;
    onSelected(cities[rowIndex]);
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
    const { cities } = this.props;
    return (
      <div>
        <MUIDataTable
          title="Cities"
          data={cities}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}
CityBlock.propTypes = {
  classes: PropTypes.object.isRequired,
  onSelected: PropTypes.func.isRequired,
  cities: PropTypes.array.isRequired
};
export default (CityBlock);

