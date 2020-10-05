import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './assignment-jss';
import AddressService from '../../Services/AddressService';
import AssignmentService from  '../../Services/AssignmentService';
import CommercialService from  '../../Services/CommercialService';
import { addClient } from '../../../redux/actions/clientActions';
import {
  withStyles,
  Typography,
  IconButton,
  TableBody,
  TableRow,
  TableHead,
  Table,
  TableCell, TextField,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddressDialog from './addressDialog';
import AssignBlock from './assignBlock';


class Assignments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: [],
      startDate: '',
      endDate: '',
      commercials: [],
      responsibleAssignments: [],
      assistantAssignments: [],
      responsibleAssignment: {},
      commercial: {}
    }
  }


  componentDidMount() {
    this.getClientAddresses();
    this.getClientAssignment();
    this.getCommercials();
  }

  getClientAddresses = () => {
    const { client } = this.props;
    AddressService.getClientAddresses(client.clientId).then(({ data }) => {
      this.setState({ addresses: data ? data : [] });
    });
  };

  getClientAssignment = () => {
    const { client } = this.props;
    AssignmentService.getClientAssignment(client.clientId).then(({ data }) => {
      const assignments = data;
      const responsibleAssignments = [];
      const assistantAssignments = [];
      assignments.forEach((assignment) => {
        if (assignment.type === 'Responsible Commercial') {
          responsibleAssignments.push(assignment);
        } else {
          assistantAssignments.push(assignment);
        }
      });
      this.setState({ responsibleAssignments, assistantAssignments });
    });
  };

  getCommercials = () => {
    CommercialService.getCommercials().then(({ data }) => {
      console.log(data);
      this.setState({ commercials: data });
    })
  };

  handleSubmitAddress = (address) => {
    const { client } = this.props;
    address.client = client;
    console.log(address);
    AddressService.saveAddress(address).then(({ data }) => {
      console.log(data);
      this.getClientAddresses();
    });
  };

  handleSubmitAssign = (assign) => {
    const { client } = this.props;
    assign.client = client;
    AssignmentService.saveAssignment(assign).then(({ data }) => {
      this.getClientAssignment();
    });
  };

  render() {
    const title = brand.name + ' - Assignments';
    const description = brand.desc;
    const { client, classes } = this.props;
    const {
      addresses,
      responsibleAssignments,
      assistantAssignments,
      commercials,
    } = this.state;
    console.log('client => ', client);
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock title="Assignment" desc="" icon="ios-more">
         <div className={classes.divCenter}>
           <Typography variant="subtitle1" component="h2" className={classes.title} color="primary">
             {client.name}
           </Typography>
         </div>
          <div className={classes.assignmentContent}>
            <div className={classes.divHeader}>
              <Typography variant="subtitle2" component="h2" color="primary">
                Client address management
              </Typography>
              <AddressDialog addressFunc={this.handleSubmitAddress} />
              <div className={classes.tableContent}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell align="right">address 1</TableCell>
                      <TableCell align="right">address 2</TableCell>
                      <TableCell align="right">email</TableCell>
                      <TableCell align="right">phone</TableCell>
                      <TableCell align="right">country</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {addresses.map((row) => (
                      <TableRow key={row.addressId}>
                        <TableCell component="th" scope="row">
                          {row.city}
                        </TableCell>
                        <TableCell align="right">{row.address1}</TableCell>
                        <TableCell align="right">{row.address2}</TableCell>
                        <TableCell align="right">{row.email}</TableCell>
                        <TableCell align="right">{row.phone}</TableCell>
                        <TableCell align="right">{row.country}</TableCell>
                        <TableCell align="right">
                          <IconButton size="small">
                            <DeleteIcon fontSize="small" color="primary"/>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px' }}>
                <Typography color="primary" variant="subtitle2" style={{ margin: '10px' }}> Primary Sector : {client.sector1}</Typography>
                <Typography color="secondary" variant="subtitle2" style={{ margin: '10px' }}> Secondary Sector : {client.sector2}</Typography>
                <Typography color="primary" variant="subtitle2" style={{ margin: '10px' }}> Third Sector : {client.sector3}</Typography>
                <IconButton size="small">
                  <EditIcon color="primary" />
                </IconButton>
              </div>
              <Typography variant="subtitle2" component="h2" color="primary">
                add Tax Identification Number
              </Typography>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px' }}>
                <TextField
                  id="outlined-basic"
                  label="Tax Number"
                  variant="outlined"
                  name="city"
                  fullWidth
                  required
                  type="number"
                  style={{ width: '20%' }}
                  className={classes.textField}
                  onChange={this.handleChange}
                />
                <IconButton size="small">
                  <EditIcon color="primary" />
                </IconButton>
              </div>
              <AssignBlock
                data={responsibleAssignments}
                commercials={commercials}
                title="commercial Responsible assignment"
                type="Responsible Commercial"
                submitAssign={this.handleSubmitAssign}
              />
              <AssignBlock
                data={assistantAssignments}
                commercials={commercials}
                title=" commercial assistant assignment"
                type="Assistant Commercial"
                submitAssign={this.handleSubmitAssign}
              />
            </div>
          </div>
        </PapperBlock>
      </div>
    );
  }
}
Assignments.propTypes = {
  classes: PropTypes.object.isRequired,
  add: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired
};
const mapDispatchToProps = dispatch => ({
  add: bindActionCreators(addClient, dispatch),
});
const mapStateToProps = state => ({
  client: state.get('ClientModule').toJS().client,
});
const AssignmentsMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Assignments);

export default withStyles(styles)(AssignmentsMapped);
