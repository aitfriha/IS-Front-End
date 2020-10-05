import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  withStyles,
  Typography,
  IconButton,
  Grid, DialogTitle, DialogContent, Dialog, DialogActions, InputLabel, Select, MenuItem, FormControl
} from '@material-ui/core';
import interact from 'interactjs';
import EditIcon from '@material-ui/icons/Edit';
import { format } from 'date-fns';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import './app.css';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Tooltip from '@material-ui/core/Tooltip';
import Notification from '../../../../components/Notification/Notification';
import Transition from '../../../../components/Transition/transition';
import AssignBlock from '../assignBlock';
import AddressDialog from '../addressDialog';
import PeopleService from '../../../Services/PeopleService';
import CommercialService from '../../../Services/CommercialService';
import AssignmentService from '../../../Services/AssignmentService';
import AddressService from '../../../Services/AddressService';
import styles from '../assignment-jss';

class AssignmentBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: {},
      endDate: '',
      commercials: [],
      responsibleAssignments: [],
      assistantAssignments: [],
      responsibleAssignment: {},
      commercial: {},
      details: false,
      assistant: false,
      workers: false,
      peoples: [],
      open: false,
      openAssign: false,
      nbrRes: 0,
      nbrAss: 0,
      notifMessage: '',
      lastId: null,
      type: 'Responsible Commercial',
      startDate: new Date()
    };
  }


  componentDidMount() {
    interact('#dropzone').dropzone(
      {
        accept: '[id^=element]',
        overlap: 0.75,
        ondropactivate(event) {
          // add active dropzone feedback
          event.target.classList.add('drop-active');
        },
        ondropdeactivate(event) {
          const item = event.relatedTarget;
        },
        ondragenter(event) {
          const draggableElement = event.relatedTarget;
          const dropzoneElement = event.target;

          // feedback the possibility of a drop
        },
        ondragleave: this.dragLeave,
        ondrop: this.handleOpenAssign
      }
    );
    interact('[id^=element]')
      .draggable({
        inertia: true,
        modifiers: [
          interact.modifiers.restrictRect({
            endOnly: true,
          })
        ],
        autoScroll: true,
        // dragMoveListener from the dragging demo above
        listeners: { move: this.dragMoveListener }
      });
  }

  dragMoveListener = event => {
    const { target } = event;
    // keep the dragged position in the data-x/data-y attributes
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  };


  dragLeave = (ev) => {
    this.setState({ lastId: null });
  };

  getClientAddresses = () => {
    const { client } = this.props;
    AddressService.getClientAddresses(client.clientId).then(({ data }) => {
      this.setState({ address: data });
    });
    PeopleService.getPeopleByCountry(client.address.country.countryId).then(({ data }) => {
      data.forEach(people => {
        AssignmentService.getAssignmentByPeople(people.peopleId).then(res => {
          const assigns = res.data;
          let nbrRes = 0;
          let nbrAss = 0;
          if (assigns.length > 0) {
            assigns.forEach(elm => {
              if (elm.type === 'Responsible Commercial') {
                nbrRes += 1;
              } else {
                nbrAss += 1;
              }
            });
          }
          people.nbrRes = nbrRes;
          people.nbrAss = nbrAss;
        });
      });
      this.setState({ peoples: data });
    });
  };

  handleOpenAssign = (event) => {
    const { lastId } = this.state;
    console.log(lastId);
    if (lastId !== null) {
      this.setState({ notifMessage: 'please remove the last drag!!' });
    } else {
      this.setState({ lastId: event.relatedTarget.id, openAssign: true });
    }
  };

  handleAssignClose = () => {
    this.setState({ openAssign: false });
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
    });
  };

  handleSubmitAddress = (addressA) => {
    const { address } = this.state;
    const { client } = this.props;
    addressA.client = client;
    if (address.addressId) {
      AddressService.updateAddress(addressA, address.addressId).then(({ data }) => {
        console.log(data);
        this.getClientAddresses();
      });
    } else {
      AddressService.saveAddress(addressA).then(({ data }) => {
        console.log(data);
        this.getClientAddresses();
      });
    }
  };

  handleBack = (type) => {
    const { back } = this.props;
    back(type);
  };

  handleOpen = (type) => {
    if (type === 'details') {
      this.setState(({ details }) => ({
        details: !details,
        assistant: false,
        workers: false
      }));
    } else if (type === 'assistant') {
      this.setState(({ assistant }) => ({
        assistant: !assistant,
        details: false,
        workers: false
      }));
    } else if (type === 'workers') {
      this.setState(({ workers }) => ({
        workers: !workers,
        assistant: false,
        details: false
      }));
    }
  };

  handleChange = (ev) => {
    console.log(ev.target.name);
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleDateChange = (date) => {
    this.setState({ startDate: date });
  };

  handleSubmitAssignNew = () => {
    const {
      lastId, type, peoples, startDate
    } = this.state;
    const { client } = this.props;
    const id = lastId.split('-')[1];
    const people = peoples.find((pe) => pe.peopleId === id);
    const assignment = {
      type,
      startDate: format(new Date(startDate), 'yyyy-MM-dd'),
      endDate: '',
      people,
      client
    };
    AssignmentService.saveAssignment(assignment).then(() => {
      this.getClientAssignment();
      this.handleAssignClose();
      this.setState({ notifMessage: 'Assignment saved!!' });
    });
  };


  handleClose = () => {
    this.setState({ open: false });
  };

  closeNotif = () => {
    this.setState({
      notifMessage: ''
    });
  };

  handleTooltip = (people) => {
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
    return (
      <React.Fragment>
        <Typography variant="subtitle2" component="h6">
          {' '}
          {people.salutation}
          {' '}
          {bull}
          {' '}
          {people.lastName}
          {' '}
          {people.firstName}
          {' '}
        </Typography>
        <Typography variant="subtitle2">
          Responsible:
          {people.nbrRes}
        </Typography>
        <Typography variant="subtitle2">
          Assistant:
          {people.nbrAss}
        </Typography>
      </React.Fragment>
    );
  };

  render() {
    const { client, classes } = this.props;
    const {
      address,
      responsibleAssignments,
      assistantAssignments,
      commercials,
      details,
      assistant,
      peoples,
      openAssign,
      notifMessage,
      type,
      startDate,
      workers
    } = this.state;
    return (
      <div>
        <div className={classes.divCenter}>
          <Typography variant="subtitle1" component="h2" className={classes.title} color="primary">
            {client.name}
          </Typography>
        </div>
        <div>
          <div className={classes.divSpace}>
            <Button color="primary" size="small" className={classes.buttonLink} variant="text" startIcon={<KeyboardBackspaceIcon color="secondary" />} onClick={() => this.handleBack('clients')}>
              Back
            </Button>
            <div>
              <Button color="primary" size="small" className={classes.buttonLink} variant="text" startIcon={<VisibilityIcon color="primary" />} onClick={this.handleBack}>
                details
              </Button>
              <Button color="primary" size="small" className={classes.buttonLink} variant="text" startIcon={<ListAltIcon color="primary" />} onClick={() => this.handleBack('all')}>
                all
              </Button>
            </div>
          </div>
          <div className={classes.assignmentContent}>
            <Grid container spacing={3} justify="center">
              <Grid item sm={12} lg={4} xs={12} md={6} xl={4}>
                <Typography variant="h6" component="h6" color="textPrimary" align="center">General</Typography>
                <div className={classes.divSpace}>
                  <Typography variant="subtitle1" component="h4" color="textSecondary">Client Code:</Typography>
                  <Typography variant="subtitle1" component="h4" color="primary">{client.codeClient}</Typography>
                </div>
                <div className={classes.divSpace}>
                  <Typography variant="subtitle1" component="h4" color="textSecondary">Name:</Typography>
                  <Typography variant="subtitle1" component="h4" color="primary">{client.name}</Typography>
                </div>
                <div className={classes.divSpace}>
                  <Typography variant="subtitle1" component="h4" color="textSecondary">Type:</Typography>
                  <Typography variant="subtitle1" component="h4" color="primary">{client.type}</Typography>
                </div>
                <div className={classes.divSpace}>
                  <Typography variant="subtitle1" component="h4" color="textSecondary">Sector Leader:</Typography>
                  <Typography variant="subtitle1" component="h4" color="primary">{client.sectorLeader}</Typography>
                </div>
                <div className={classes.divSpace}>
                  <Typography variant="subtitle1" component="h4" color="textSecondary">Country Leader:</Typography>
                  <Typography variant="subtitle1" component="h4" color="primary">{client.countryLeader}</Typography>
                </div>
                <div className={classes.divSpace}>
                  <Typography variant="subtitle1" component="h4" color="textSecondary">Country:</Typography>
                  <Typography variant="subtitle1" component="h4" color="primary">{client.country}</Typography>
                </div>
                <div className={classes.divSpace}>
                  <Typography variant="subtitle1" component="h4" color="textSecondary">City:</Typography>
                  <Typography variant="subtitle1" component="h4" color="primary">{client.city}</Typography>
                </div>
                <div className={classes.divSpace}>
                  <Typography variant="subtitle1" component="h4" color="textSecondary">Multinational:</Typography>
                  <Typography variant="subtitle1" component="h4" color="primary">{client.multinational}</Typography>
                </div>
                <div className={classes.divSpace}>
                  <Typography variant="subtitle1" component="h4" color="textSecondary">Active:</Typography>
                  <Typography variant="subtitle1" component="h4" color="primary">{client.isActive}</Typography>
                </div>
              </Grid>
              <Grid item sm={12} lg={4} xs={12} md={6} xl={4}>
                <Typography variant="h6" component="h6" color="textPrimary" align="center">
                  Sectors
                  <IconButton size="small">
                    <EditIcon color="primary" />
                  </IconButton>
                </Typography>
                <div className={classes.divSpace}>
                  <Typography variant="subtitle1" component="h4" color="textSecondary">Sector 1:</Typography>
                  <Typography variant="subtitle1" component="h4" color="primary">{client.sector1}</Typography>
                </div>
                <div className={classes.divSpace}>
                  <Typography variant="subtitle1" component="h4" color="textSecondary">Sector 2:</Typography>
                  <Typography variant="subtitle1" component="h4" color="primary">{client.sector2}</Typography>
                </div>
                <div className={classes.divSpace}>
                  <Typography variant="subtitle1" component="h4" color="textSecondary">Sector 3:</Typography>
                  <Typography variant="subtitle1" component="h4" color="primary">{client.sector3}</Typography>
                </div>
                <Typography variant="h6" component="h6" color="textPrimary" align="center">
                  Address
                  <AddressDialog addressA={address} addressFunc={this.handleSubmitAddress} />
                </Typography>
                <div className={classes.divSpace}>
                  <Typography variant="subtitle1" component="h4" color="textSecondary">Address:</Typography>
                  <Typography variant="subtitle1" component="h4" color="primary">{client.address.address}</Typography>
                </div>
                <div className={classes.divSpace}>
                  <Typography variant="subtitle1" component="h4" color="textSecondary">Email:</Typography>
                  <Typography variant="subtitle1" component="h4" color="primary">{client.email}</Typography>
                </div>
                <div className={classes.divSpace}>
                  <Typography variant="subtitle1" component="h4" color="textSecondary">General Phone:</Typography>
                  <Typography variant="subtitle1" component="h4" color="primary">{client.phone}</Typography>
                </div>
              </Grid>
              <Grid item sm={12} lg={4} xs={12} md={6} xl={4}>
                <Typography variant="h6" component="h6" color="textPrimary" align="center">Logo</Typography>
                <Avatar alt="User Name" src={client.logo} className={classes.large} />
              </Grid>
            </Grid>
            <div className={workers ? classes.assignDivNone : classes.assignDiv}>
              <div className={classes.divAssignCenter}>
                <Typography variant="subtitle1" component="h2" color="primary">
                  Country Commercials
                </Typography>
              </div>
              <div className={classes.divRight} onClick={() => this.handleOpen('workers')}>
                {workers ? <RemoveIcon color="primary" /> : <AddIcon color="primary" />}
              </div>
            </div>
            <Collapse in={workers} timeout="auto" unmountOnExit>
              <div className={classes.assignDivCollapse}>
                <Grid container spacing={3} justify="center" style={{ display: 'flex' }}>
                  {
                    peoples.map((people) => (
                      <Tooltip title={this.handleTooltip(people)} enterDelay={500} leaveDelay={200} key={people.peopleId} placement="right" arrow>
                        <Card className={classes.root} id={'element-' + people.peopleId} variant="elevation">
                          <CardContent>
                            <Avatar alt="User Name" src={people.photo} className={classes.medium} />
                          </CardContent>
                        </Card>
                      </Tooltip>
                    ))
                  }
                </Grid>
                <Grid className={classes.dropzone}  style={{ marginTop: '100px' }} container spacing={3} justify="center">
                  <Grid
                    id="dropzone"
                    item
                    sm={12}
                    lg={4}
                    xs={12}
                    md={6}
                    xl={4}
                    className={classes.dropZone}
                  />
                </Grid>
              </div>
            </Collapse>
            <div className={details ? classes.assignDivNone : classes.assignDiv}>
              <div className={classes.divAssignCenter}>
                <Typography variant="subtitle1" component="h2" color="primary">
                  Commercial Responsible Assignment
                </Typography>
              </div>
              <div className={classes.divRight} onClick={() => this.handleOpen('details')}>
                {details ? <RemoveIcon color="primary" /> : <AddIcon color="primary" />}
              </div>
            </div>
            <Collapse in={details} timeout="auto" unmountOnExit>
              <div className={classes.assignDivCollapse}>
                <AssignBlock
                  data={responsibleAssignments}
                  commercials={commercials}
                  title="Commercial  Responsible Assignment"
                  type="Responsible Commercial"
                />
              </div>
            </Collapse>
            <div className={assistant ? classes.assignDivNone : classes.assignDiv}>
              <div className={classes.divAssignCenter}>
                <Typography variant="subtitle1" component="h2" color="primary">
                  Commercial Assistant Assignment
                </Typography>
              </div>
              <div className={classes.divRight} onClick={() => this.handleOpen('assistant')}>
                {assistant ? <RemoveIcon color="primary" /> : <AddIcon color="primary" />}
              </div>
            </div>
            <Collapse in={assistant} timeout="auto" unmountOnExit>
              <div className={classes.assignDivCollapse}>
                <AssignBlock
                  data={assistantAssignments}
                  commercials={commercials}
                  title="Commercial Assistant Assignment"
                  type="Assistant Commercial"
                />
              </div>
            </Collapse>
          </div>
        </div>
        <Dialog
          open={openAssign}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleAssignClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          fullWidth="xs"
          maxWidth="xs"
          className={classes.container}
        >
          <DialogTitle id="alert-dialog-slide-title">Assign</DialogTitle>
          <DialogContent>
            <FormControl fullWidth required>
              <InputLabel>Type of assignment</InputLabel>
              <Select
                name="type"
                value={type}
                onChange={this.handleChange}
              >
                <MenuItem key="new" value="Responsible Commercial">
                  Responsible Commercial
                </MenuItem>
                <MenuItem key="old" value="Assistant Commercial">
                  Assistant Commercial
                </MenuItem>
              </Select>
            </FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Start Date"
                name="startDate"
                value={startDate}
                onChange={this.handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
                fullWidth
              />
            </MuiPickersUtilsProvider>
          </DialogContent>
          <DialogActions>
            <Button color="primary" variant="contained" onClick={this.handleSubmitAssignNew}>
              Assign
            </Button>
            <Button color="primary" onClick={this.handleAssignClose}>
              close
            </Button>
          </DialogActions>
        </Dialog>
        <Notification message={notifMessage} close={this.closeNotif} />
      </div>
    );
  }
}
AssignmentBlock.propTypes = {
  classes: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  back: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  client: state.get('ClientModule').toJS().client,
});
const CommercialAssignmentsMapped = connect(
  mapStateToProps,
  null
)(AssignmentBlock);

export default withStyles(styles)(CommercialAssignmentsMapped);
