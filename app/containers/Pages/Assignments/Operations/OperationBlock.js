import React from 'react';
import MUIDataTable from 'mui-datatables';
import PeopleService from '../../../Services/PeopleService';
import OperationConfigService  from '../../../Services/OperationConfigService';
import PropTypes from 'prop-types';
import CustomToolbar from '../../../../components/CustomToolbar/CustomToolbar';


class OperationBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [
        {
          name: 'worker',
          label: 'Worker',
          options: {
            filter: true,
          }
        },
        {
          name: 'direction',
          label: 'Direction',
          options: {
            filter: true,
          }
        },
        {
          name: 'area',
          label: 'Area',
          options: {
            filter: true,
          }
        },
        {
          name: 'operationStartDate',
          label: 'Operation Start Date',
          options: {
            filter: true,
          }
        },
        {
          name: 'operationEndDate',
          label: 'Operation end Date',
          options: {
            filter: true,
          }
        },
      ]
    };
  }

  componentDidMount() {
    OperationConfigService.getOperationConfig().then(({ data }) => {
      const operations = [];
      data.forEach(dat => operations.push({
        worker: dat.people.firstName + ' ' + dat.people.lastName,
        direction: dat.direction.directionName,
        area: dat.area.areaName,
        operationStartDate: dat.operationStartDate,
        operationEndDate: dat.operationEndDate
      }));
      this.setState({ data: operations });
    });
  }

  render() {
    const { data, columns } = this.state;
    const options = {
      filter: true,
      selectableRows: false,
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
      customToolbar: () => (
        <CustomToolbar csvData={data} url="/app/configurations/assignments/workers-assignment/create-assignment" tooltip="add new worker assignment" />
      )
    };

    return (
      <div>
        <MUIDataTable title="Workers Assignment" data={data} columns={columns} options={options} />
      </div>
    );
  }
}
OperationBlock.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default OperationBlock;
