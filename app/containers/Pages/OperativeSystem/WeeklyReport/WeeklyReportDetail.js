import React, { useContext } from 'react';
import {
  Grid,
  Chip,
  Card,
  CardContent,
  CardActions,
  Divider,
  Typography,
  TextField,
  Fab,
  Tooltip,
  Select,
  MenuItem,
  Button
} from '@material-ui/core';
import MaterialTable from 'material-table';
import CachedIcon from '@material-ui/icons/Cached';

import { isString } from 'lodash';

import notification from '../../../../components/Notification/Notification';

let self = null;


export class WeeklyReportDetail extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => { };
    self = this;
    this.state = {

      updatedSelectFields: [],

      selected: {
        customer: '',
        operation: '',
        assignmentType: ''
      },

      options: {
        customer: [],
        operation: [],
        assignmentType: []
      },

      workTable: {
        columns: [
          {
            title: 'Customer Name', // intl.formatMessage({ id: 'connection.id' }),
            field: 'customerId',
            searchable: true,
            render: rowData => rowData.customerName,
            validate: rowData => (this.state.selected.customer !== '' ? this.state.selected.customer !== 'none' : (typeof (rowData.customerId) !== 'undefined' && rowData.customerId !== '' && rowData.customerId !== 'none')),
            editComponent: props => (
              <Select
                id="customer-select"
                name="customer"
                value={this.state.selected.customer || props.value || 'none'}
                onChange={(e) => this.changeValue(e)}
                error={this.state.selected.customer !== '' ? this.state.selected.customer === 'none' : (typeof (props.value) === 'undefined' || props.value === '' || props.value === 'none')}
              >
                <MenuItem value="none">
                  <em>Empty</em>
                </MenuItem>
                {this.state.options.customer.map(customer => <MenuItem key={customer.id} value={customer.id}>{customer.name}</MenuItem>)}
              </Select>
            ),
            minWidth: 150,
            export: true
          },
          {
            title: 'Operation Name', // intl.formatMessage({ id: 'connection.id' }),
            field: 'operationId',
            searchable: true,
            render: rowData => rowData.operationName,
            validate: rowData => (this.state.selected.operation !== '' ? this.state.selected.operation !== 'none' : (typeof (rowData.operationId) !== 'undefined' && rowData.operationId !== '' && rowData.operationId !== 'none')),
            editComponent: props => (
              <Select
                id="operation-select"
                name="operation"
                value={this.state.selected.operation || props.value || 'none'}
                onChange={(e) => this.changeValue(e)}
                error={this.state.selected.operation !== '' ? this.state.selected.operation === 'none' : (typeof (props.value) === 'undefined' || props.value === '' || props.value === 'none')}
              >
                <MenuItem value="none">
                  <em>Empty</em>
                </MenuItem>
                {this.state.options.operation.map(operation => <MenuItem key={operation.id} value={operation.id}>{operation.name}</MenuItem>)}
              </Select>
            ),
            minWidth: 150,
            export: true
          },
          {
            title: 'Deliverable', // intl.formatMessage({ id: 'connection.id' }),
            field: 'deliverable',
            validate: rowData => typeof (rowData.deliverable) !== 'undefined' && rowData.deliverable !== '',
            editComponent: props => (
              <TextField
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                placeholder="Deliverable"
                error={typeof (props.value) === 'undefined' || props.value === ''}
              />
            ),
            searchable: true,
            minWidth: 150,
            export: true
          },
          {
            title: 'Assignment Type', // intl.formatMessage({ id: 'connection.id' }),
            field: 'assignmentTypeId',
            searchable: true,
            render: rowData => rowData.assignmentTypeName,
            validate: rowData => (this.state.selected.assignmentType !== '' ? this.state.selected.assignmentType !== 'none' : (typeof (rowData.assignmentType) !== 'undefined' && rowData.assignmentTypeId !== '' && rowData.assignmentTypeId !== 'none')),
            editComponent: props => (
              <Select
                id="assignment-type-select"
                name="assignmentType"
                value={this.state.selected.assignmentType || props.value || 'none'}
                onChange={(e) => this.changeValue(e)}
                error={this.state.selected.assignmentType !== '' ? this.state.selected.assignmentType === 'none' : (typeof (props.value) === 'undefined' || props.value === '' || props.value === 'none')}
              >
                <MenuItem value="none">
                  <em>Empty</em>
                </MenuItem>
                {this.state.options.assignmentType.map(assignmentType => <MenuItem key={assignmentType.id} value={assignmentType.id}>{assignmentType.name}</MenuItem>)}
              </Select>
            ),
            minWidth: 120,
            export: true
          },
          {
            title: 'M', // intl.formatMessage({ id: 'connection.id' }),
            field: 'monday',
            searchable: true,
            render: rowData => parseFloat(rowData.monday).toFixed(1),
            initialEditValue: (0).toFixed(1),
            editComponent: props => (
              <TextField
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                placeholder="M"
                error={isNaN(props.value) || props.value === '' || (parseFloat(props.value) < 0 || parseFloat(props.value) > 1)}
              />
            ),
            validate: rowData => !isNaN(rowData.monday) && rowData.monday !== '' && (parseFloat(rowData.monday) >= 0 && parseFloat(rowData.monday) <= 1),
            maxWidth: 55,
            width: 55,
            export: true
          },
          {
            title: 'T', // intl.formatMessage({ id: 'connection.id' }),
            field: 'tuesday',
            searchable: true,
            render: rowData => parseFloat(rowData.tuesday).toFixed(1),
            initialEditValue: (0).toFixed(1),
            editComponent: props => (
              <TextField
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                placeholder="T"
                error={isNaN(props.value) || props.value === '' || (parseFloat(props.value) < 0 || parseFloat(props.value) > 1)}
              />
            ),
            validate: rowData => !isNaN(rowData.tuesday) && rowData.tuesday !== '' && (parseFloat(rowData.tuesday) >= 0 && parseFloat(rowData.tuesday) <= 1),
            maxWidth: 55,
            width: 55,
            export: true
          },
          {
            title: 'W', // intl.formatMessage({ id: 'connection.id' }),
            field: 'wednesday',
            searchable: true,
            render: rowData => parseFloat(rowData.wednesday).toFixed(1),
            initialEditValue: (0).toFixed(1),
            editComponent: props => (
              <TextField
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                placeholder="W"
                error={isNaN(props.value) || props.value === '' || (parseFloat(props.value) < 0 || parseFloat(props.value) > 1)}
              />
            ),
            validate: rowData => !isNaN(rowData.wednesday) && rowData.wednesday !== '' && (parseFloat(rowData.wednesday) >= 0 && parseFloat(rowData.wednesday) <= 1),
            maxWidth: 55,
            width: 55,
            export: true
          },
          {
            title: 'X', // intl.formatMessage({ id: 'connection.id' }),
            field: 'thursday',
            searchable: true,
            render: rowData => parseFloat(rowData.thursday).toFixed(1),
            initialEditValue: (0).toFixed(1),
            editComponent: props => (
              <TextField
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                placeholder="X"
                error={isNaN(props.value) || props.value === '' || (parseFloat(props.value) < 0 || parseFloat(props.value) > 1)}
              />
            ),
            validate: rowData => !isNaN(rowData.thursday) && rowData.thursday !== '' && (parseFloat(rowData.thursday) >= 0 && parseFloat(rowData.thursday) <= 1),
            maxWidth: 55,
            width: 55,
            export: true
          },
          {
            title: 'F', // intl.formatMessage({ id: 'connection.id' }),
            field: 'friday',
            searchable: true,
            render: rowData => parseFloat(rowData.friday).toFixed(1),
            initialEditValue: (0).toFixed(1),
            editComponent: props => (
              <TextField
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                placeholder="F"
                error={isNaN(props.value) || props.value === '' || (parseFloat(props.value) < 0 || parseFloat(props.value) > 1)}
              />
            ),
            validate: rowData => !isNaN(rowData.friday) && rowData.friday !== '' && (parseFloat(rowData.friday) >= 0 && parseFloat(rowData.friday) <= 1),
            maxWidth: 55,
            width: 55,
            export: true
          }
        ],
        data: []
      },
      absencesTable: {
        columns: [
          {
            title: 'Absence Type', // intl.formatMessage({ id: 'connection.id' }),
            field: 'absenceTypeName',
            searchable: true,
            export: true
          },
          {
            title: 'M', // intl.formatMessage({ id: 'connection.id' }),
            field: 'date',
            searchable: true,
            render: rowData => (new Date(String(rowData.date)).getDay() === 1 ? parseFloat(rowData.value).toFixed(1) : 0.0.toFixed(1)),
            maxWidth: 55,
            width: 55,
            export: true
          },
          {
            title: 'T', // intl.formatMessage({ id: 'connection.id' }),
            field: 'date',
            searchable: true,
            render: rowData => (new Date(String(rowData.date)).getDay() === 2 ? parseFloat(rowData.value).toFixed(1) : 0.0.toFixed(1)),
            maxWidth: 55,
            width: 55,
            export: true
          },
          {
            title: 'W', // intl.formatMessage({ id: 'connection.id' }),
            field: 'date',
            searchable: true,
            render: rowData => (new Date(String(rowData.date)).getDay() === 3 ? parseFloat(rowData.value).toFixed(1) : 0.0.toFixed(1)),
            maxWidth: 55,
            width: 55,
            export: true
          },
          {
            title: 'X', // intl.formatMessage({ id: 'connection.id' }),
            field: 'date',
            searchable: true,
            render: rowData => (new Date(String(rowData.date)).getDay() === 4 ? parseFloat(rowData.value).toFixed(1) : 0.0.toFixed(1)),
            maxWidth: 55,
            width: 55,
            export: true
          },
          {
            title: 'F', // intl.formatMessage({ id: 'connection.id' }),
            field: 'date',
            searchable: true,
            render: rowData => (new Date(String(rowData.date)).getDay() === 5 ? parseFloat(rowData.value).toFixed(1) : 0.0.toFixed(1)),
            maxWidth: 55,
            width: 55,
            export: true
          }
        ],
        data: []
      },
      localBankHolidaysTable: {
        columns: [
          {
            title: 'Country', // intl.formatMessage({ id: 'connection.id' }),
            field: 'country',
            searchable: true,
            export: true
          },
          {
            title: 'M', // intl.formatMessage({ id: 'connection.id' }),
            field: 'date',
            searchable: true,
            render: rowData => (new Date(String(rowData.date)).getDay() === 1 ? rowData.value : 0),
            maxWidth: 55,
            width: 55,
            export: true
          },
          {
            title: 'T', // intl.formatMessage({ id: 'connection.id' }),
            field: 'date',
            searchable: true,
            render: rowData => (new Date(String(rowData.date)).getDay() === 2 ? rowData.value : 0),
            maxWidth: 55,
            width: 55,
            export: true
          },
          {
            title: 'W', // intl.formatMessage({ id: 'connection.id' }),
            field: 'date',
            searchable: true,
            render: rowData => (new Date(String(rowData.date)).getDay() === 3 ? rowData.value : 0),
            maxWidth: 55,
            width: 55,
            export: true
          },
          {
            title: 'X', // intl.formatMessage({ id: 'connection.id' }),
            field: 'date',
            searchable: true,
            render: rowData => (new Date(String(rowData.date)).getDay() === 4 ? rowData.value : 0),
            maxWidth: 55,
            width: 55,
            export: true
          },
          {
            title: 'F', // intl.formatMessage({ id: 'connection.id' }),
            field: 'date',
            searchable: true,
            render: rowData => (new Date(String(rowData.date)).getDay() === 5 ? rowData.value : 0),
            maxWidth: 55,
            width: 55,
            export: true
          }
        ],
        data: []
      }
    };
  }

  componentDidMount() {
    this.fillData();
  }

  componentWillUnmount() {
  }


  fillData() {
    const { extendedWeeklyReport, allAssignmentTypes, customerContracts } = this.props;
    const customers = [];
    customerContracts.forEach(c => {
      const index = customers.findIndex(obj => obj.id === c.customerId);
      if (index === -1) {
        customers.push({
          id: c.customerId,
          code: c.customerCode,
          name: c.customerName
        });
      }
    });
    this.setState({
      options: {
        customer: customers,
        operation: [],
        assignmentType: allAssignmentTypes
      },
      workTable: {
        columns: this.state.workTable.columns,
        data: Object.keys(extendedWeeklyReport).length > 0 ? extendedWeeklyReport.works : []
      },
      absencesTable: {
        columns: this.state.absencesTable.columns,
        data: Object.keys(extendedWeeklyReport).length > 0 ? extendedWeeklyReport.absences : []
      },
      localBankHolidaysTable: {
        columns: this.state.localBankHolidaysTable.columns,
        data: Object.keys(extendedWeeklyReport).length > 0 ? extendedWeeklyReport.localBankHolidays : []
      }
    });
  }

  //----------------------------------------------------------------------------------------------

  // HANDLE ACTIONS

  changeValue = (event) => {
    const { value } = event.target;
    const customerId = event.target.name === 'customer' ? value : this.state.selected.customer;
    const operationId = event.target.name === 'operation' ? value : customerId !== 'none' ? this.state.selected.operation : 'none';
    const selectedList = this.state.updatedSelectFields;

    if (!selectedList.includes(event.target.name)) {
      selectedList.push(event.target.name);
    }

    const operationList = this.getOperationOptions(customerId);

    this.setState({
      updatedSelectFields: selectedList,
      selected: {
        customer: customerId,
        operation: operationId,
        assignmentType: event.target.name === 'assignmentType' ? value : this.state.selected.assignmentType
      },
      options: {
        customer: this.state.options.customer,
        operation: operationList,
        assignmentType: this.state.options.assignmentType
      }
    });
  }

  getOperationOptions(customerId) {
    const { customerContracts } = this.props;
    const operationList = [];
    customerContracts.forEach(c => {
      if (customerId && c.customerId === customerId) {
        operationList.push({
          id: c.operationId,
          code: c.operationCode,
          name: c.operationName
        });
      }
    });
    return operationList;
  }

  reloadState() {
    this.setState({
      updatedSelectFields: [],
      selected: {
        customer: '',
        operation: '',
        assignmentType: ''
      },
      options: {
        customer: this.state.options.customer,
        operation: [],
        assignmentType: this.state.options.assignmentType
      }
    });
  }

  validateRowData(newData) {
    let valid = true;
    if ((!newData.hasOwnProperty('customerId') || newData.customerId === '')
      || (!newData.hasOwnProperty('operationId') || newData.operationId === '')
      || (!newData.hasOwnProperty('assignmentTypeId') || newData.assignmentTypeId === '')
      || (!newData.hasOwnProperty('deliverable') || newData.deliverable === '')
      || (newData.monday === '' || parseInt(newData.monday) < 0 || parseInt(newData.monday) > 1)
      || (newData.tuesday === '' || parseInt(newData.tuesday) < 0 || parseInt(newData.tuesday) > 1)
      || (newData.wednesday === '' || parseInt(newData.wednesday) < 0 || parseInt(newData.wednesday) > 1)
      || (newData.thursday === '' || parseInt(newData.thursday) < 0 || parseInt(newData.thursday) > 1)
      || (newData.friday === '' || parseInt(newData.friday) < 0 || parseInt(newData.friday) > 1)) {
      valid = false;
    }
    return valid;
  }

  handleSave(e) {
    const {
      handleClose, saveWeeklyReport, getSummarizedWeeklyReport, obj
    } = self.props;

    const promise = new Promise((resolve) => {
      const data = {
        year: obj.year,
        week: obj.week,
        employeeId: obj.employeeId,
        works: self.state.workTable.data
      };
      saveWeeklyReport(data);
      self.editingPromiseResolve = resolve;
    });
    promise.then((result) => {
      if (isString(result)) {
        const params = {
          employeeId: obj.employeeId,
          period: 'month',
          startDate: null,
          endDate: null
        };
        handleClose(true);
        getSummarizedWeeklyReport(params);
        notification('success', result);
      } else {
        notification('danger', result);
      }
    });
  }

  render() {
    const {
      isLoading, errors, weeklyReportResponse, extendedWeeklyReport
    } = this.props;

    (!isLoading && weeklyReportResponse) && this.editingPromiseResolve(weeklyReportResponse);
    (!isLoading && !weeklyReportResponse) && this.editingPromiseResolve(errors);

    return (
      <div>
        <Card>
          <CardContent>
            <div id="employee-info">
              <Chip label="Employee information" color="secondary" style={{ marginTop: '10px', marginBottom: '10px' }} />
              <Grid item>
                <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                  Personal Number:
                </Typography>
                <Typography component="span" color="textSecondary">
                  {extendedWeeklyReport.personalNumber}
                </Typography>
              </Grid>
              <Grid item>
                <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                  Name:
                </Typography>
                <Typography component="span" color="textSecondary">
                  {extendedWeeklyReport.name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                  Father Family Name:
                </Typography>
                <Typography component="span" color="textSecondary">
                  {extendedWeeklyReport.fatherFamilyName}
                </Typography>
              </Grid>
              <Grid item>
                <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                  Mother Family Name:
                </Typography>
                <Typography component="span" color="textSecondary">
                  {extendedWeeklyReport.motherFamilyName}
                </Typography>
              </Grid>
              <Grid item>
                <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                  Company Name:
                </Typography>
                <Typography component="span" color="textSecondary">
                  {extendedWeeklyReport.company}
                </Typography>
              </Grid>
            </div>

            <Divider style={{ marginTop: '5px', marginBottom: '15px' }} />
            <div id="weekOfYear" style={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Year/Week:
                {' '}
                {extendedWeeklyReport.weekOfYear}
              </Typography>
              <Tooltip title="Reload data">
                <Fab size="small" color="primary" aria-label="add" style={{ marginBottom: '20px' }}>
                  <CachedIcon onClick={(e) => this.fillData()} />
                </Fab>
              </Tooltip>
            </div>

            <div id="works" style={{}}>
              <Chip label="Worked up" color="secondary" style={{ marginBottom: '10px' }} />
              <MaterialTable
                title=""
                columns={this.state.workTable.columns}
                data={this.state.workTable.data}
                options={{
                  actionsColumnIndex: -1
                }}
                /* components={{
                                  EditRow: props => {
                                      return (
                                          <MTableEditRow
                                              {...props}
                                              data={props.mode === 'add' ? {} : this.state.workTable.data[0]}
                                          />
                                      )
                                  }
                              }} */
                editable={{
                  onRowAddCancelled: rowData => this.reloadState(),
                  onRowUpdateCancelled: rowData => this.reloadState(),
                  onRowAdd: newData => new Promise((resolve, reject) => {
                    setTimeout(() => {
                      const dataUpdate = [...this.state.workTable.data];
                      console.log(this.state.updatedSelectFields);
                      this.state.updatedSelectFields.forEach(el => {
                        switch (el) {
                          case 'customer': {
                            const customerObject = this.state.options.customer[this.state.options.customer.findIndex(obj => obj.id === this.state.selected.customer)];
                            newData.customerId = customerObject.id;
                            newData.customerCode = customerObject.code;
                            newData.customerName = customerObject.name;
                            break;
                          }
                          case 'operation': {
                            const operationObject = this.state.options.operation[this.state.options.operation.findIndex(obj => obj.id === this.state.selected.operation)];
                            newData.operationId = operationObject.id;
                            newData.operationCode = operationObject.code;
                            newData.operationName = operationObject.name;
                            break;
                          }
                          case 'assignmentType': {
                            const assignmentTypeObject = this.state.options.assignmentType[this.state.options.assignmentType.findIndex(obj => obj.id === this.state.selected.assignmentType)];
                            newData.assignmentTypeId = assignmentTypeObject.id;
                            newData.assignmentTypeCode = assignmentTypeObject.code;
                            newData.assignmentTypeName = assignmentTypeObject.name;
                            break;
                          }
                          default: {
                            break;
                          }
                        }
                      });
                      dataUpdate.push(newData);
                      this.setState({
                        workTable: {
                          columns: this.state.workTable.columns,
                          data: dataUpdate
                        }
                      });
                      resolve();
                    }, 1000);
                  }),
                  onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
                    setTimeout(() => {
                      const dataUpdate = [...this.state.workTable.data];
                      const index = oldData.tableData.id;
                      this.state.updatedSelectFields.forEach(el => {
                        switch (el) {
                          case 'customer': {
                            const id = this.state.selected.customer ? this.state.selected.customer : oldData.customerId;
                            const customerObject = this.state.options.customer[this.state.options.customer.findIndex(obj => obj.id === id)];
                            if (customerObject) {
                              newData.customerId = customerObject.id;
                              newData.customerCode = customerObject.code;
                              newData.customerName = customerObject.name;
                            }
                            break;
                          }
                          case 'operation': {
                            const id = this.state.selected.operation ? this.state.selected.operation : oldData.operationId;
                            const operationObject = this.state.options.operation[this.state.options.operation.findIndex(obj => obj.id === id)];
                            if (operationObject) {
                              newData.operationId = operationObject.id;
                              newData.operationCode = operationObject.code;
                              newData.operationName = operationObject.name;
                            }
                            break;
                          }
                          case 'assignmentType': {
                            const id = this.state.selected.assignmentType ? this.state.selected.assignmentType : oldData.assignmentTypeId;
                            const assignmentTypeObject = this.state.options.assignmentType[this.state.options.assignmentType.findIndex(obj => obj.id === id)];
                            if (assignmentTypeObject) {
                              newData.assignmentTypeId = assignmentTypeObject.id;
                              newData.assignmentTypeCode = assignmentTypeObject.code;
                              newData.assignmentTypeName = assignmentTypeObject.name;
                            }
                            break;
                          }
                          default: {
                            break;
                          }
                        }
                      });
                      dataUpdate[index] = newData;
                      this.setState({
                        workTable: {
                          columns: this.state.workTable.columns,
                          data: dataUpdate
                        }
                      });
                      resolve();
                    }, 1000);
                  }),
                  onRowDelete: oldData => new Promise((resolve, reject) => {
                    setTimeout(() => {
                      const dataDelete = [...this.state.workTable.data];
                      const index = oldData.tableData.id;
                      dataDelete.splice(index, 1);
                      this.setState({
                        workTable: {
                          columns: this.state.workTable.columns,
                          data: dataDelete
                        }
                      });
                      resolve();
                    }, 1000);
                  }),
                }}
              />
            </div>

            <div id="other-data">
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Chip label="Absences" color="secondary" style={{ marginBottom: '10px' }} />
                  <MaterialTable
                    title=""
                    columns={this.state.absencesTable.columns}
                    data={this.state.absencesTable.data}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Chip label="Local bank holidays" color="secondary" style={{ marginBottom: '10px' }} />
                  <MaterialTable
                    title=""
                    columns={this.state.localBankHolidaysTable.columns}
                    data={this.state.localBankHolidaysTable.data}
                  />
                </Grid>
              </Grid>
            </div>
          </CardContent>
          <CardActions style={{ marginLeft: '10px' }}>
            <Button variant="contained" size="small" onClick={(e) => this.props.handleClose(false)} color="default">
              Cancel
              {/* {intl.formatMessage({ id: 'connection.row.body.no' })} */}
            </Button>
            <Button variant="contained" size="small" disabled={this.state.workTable.data && this.state.workTable.data.length === 0} onClick={(e) => this.handleSave(e)} color="primary">
              Save Report
              {/* } {intl.formatMessage({ id: 'connection.row.body.yes' })} */}
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}
