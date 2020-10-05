import React from 'react';
import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
class StatusOfCommercialOperationBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          name: 'statusName',
          label: 'Status Name',
          options: {
            filter: true
          }
        },
        {
          name: 'statusDescription',
          label: 'Status Description',
          options: {
            filter: true
          }
        },
        {
          label: 'Actions',
          name: ' ',
          options: {
            customBodyRender: (value, data) => (
              <React.Fragment>
                <IconButton onClick={() => this.updateStatus(data.rowIndex)}>
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
  updateStatus = (rowIndex) => {
    const { onSelected, status } = this.props;
    onSelected(status[rowIndex]);
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
    const { status } = this.props;
    return (
      <div>
        <MUIDataTable
          title="Status of Commercial Operation"
          data={status}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}
StatusOfCommercialOperationBlock.propTypes = {
  classes: PropTypes.object.isRequired,
  onSelected: PropTypes.func.isRequired,
  status: PropTypes.array.isRequired
};
export default (StatusOfCommercialOperationBlock);
