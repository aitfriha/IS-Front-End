import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel, MenuItem, Select,
  TextField
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Autocomplete from '@material-ui/lab/Autocomplete/Autocomplete';
import { connect } from 'react-redux';
import InputBase from '@material-ui/core/InputBase';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import Tooltip from '@material-ui/core/Tooltip';
import { ThemeContext } from '../../App/ThemeWrapper';
import CommercialOperationStatusService from '../../Services/CommercialOperationStatusService';
import StaffService from '../../Services/StaffService';
import CommercialOperationService from '../../Services/CommercialOperationService';
import CommercialActionService from '../../Services/CommercialActionService';
import AssignmentService from '../../Services/AssignmentService';
import ActionTypeService from '../../Services/ActionTypeService';
import HistoryActionService from '../../Services/HistoryActionService';
import history from '../../../utils/history';
import PapperBlock from '../../../components/PapperBlock/PapperBlock';
const styles = theme => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});
const useStyles = makeStyles(styles);
class AddCommercialAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: [],
      actionTypes: [],
      operations: [],
      staffs: [],
      staffAssign: [],
      assignments: [],
      operationsAssign: [],
      numberClientResponsible: 0,
      numberClientAssistant: 0,
      staffId: '',
      currentOperation: [],
      nbrActions: ['1'],
      actionDescriptions: [],
      actionDates: [],
      contactsIds: [],
      nbrConclusions: ['1'],
      conclusions: [],
      clientId: '',
      clientName: '',
      expanded: false,
      display: 'flex',
      openPopUpImport: false,
      openPopUp: false
    };
  }

  componentDidMount() {
    let respoNumber = 0;
    let respoAssistance = 0;
    const newTab = [];
    // eslint-disable-next-line react/prop-types
    const { logedUser } = this.props;
    const thelogedUser = JSON.parse(logedUser);
    console.log(thelogedUser);
    // eslint-disable-next-line react/prop-types
    const { changeTheme } = this.props;
    changeTheme('redTheme');
    CommercialOperationStatusService.getCommercialOperationStatus().then(result => {
      this.setState({ status: result.data.payload });
    });
    StaffService.getStaffs2().then(result => {
      this.setState({ staffs: result.data.payload });
    });
    CommercialOperationService.getCommercialOperation().then(result => {
      this.setState({ operations: result.data.payload });
    });
    AssignmentService.getAssignments().then(result => {
      const staffAssign = result.data.filter(row => (row.staff.companyEmail === thelogedUser.userEmail));
      // eslint-disable-next-line array-callback-return
      staffAssign.map(row => {
        // eslint-disable-next-line no-plusplus
        if (row.typeStaff === 'Responsible Commercial') respoNumber++;
        // eslint-disable-next-line no-plusplus
        if (row.typeStaff === 'Assistant Commercial') respoAssistance++;
        if (newTab.find(column => column.client._id === row.client._id)) console.log('assign exist');
        else newTab.push(row);
      });
      this.setState({
        assignments: result.data, staffName: staffAssign[0].staff.fullName, staffId: staffAssign[0].staff.staffId, staffAssign: newTab, numberClientResponsible: respoNumber, numberClientAssistant: respoAssistance
      });
    });
    ActionTypeService.getActionType().then(result => {
      this.setState({ actionTypes: result.data });
    });
  }

  handleChange = (ev) => {
    let actionTypeName = '';
    if (ev.target.name === 'actionTypeId') {
      // eslint-disable-next-line array-callback-return,react/destructuring-assignment
      this.state.actionTypes.map(row => {
        if (row.actionTypeId === ev.target.value) {
          actionTypeName = row.typeName;
          this.setState({ actionTypeName });
        }
      });
    }
    this.setState({ [ev.target.name]: ev.target.value });
  }

  handleCheckBox = (event) => {
    const isChecked = event.target.checked;
    const item = event.target.value;
    const newContact = { _id: item, checked: isChecked };
    // eslint-disable-next-line react/destructuring-assignment
    this.state.contactsIds.push(newContact);
  }

  handleChangeClient = (ev, value) => {
    // eslint-disable-next-line react/destructuring-assignment
    const operatAssign = this.state.operations;
    const operationsAssign = operatAssign.filter(row => (row.clientName === value.client.name));
    this.setState({ clientId: value.client._id, clientName: value.client.name, operationsAssign });
  }

  activateLasers = (commercialOperation) => {
    this.setState({
      openPopUp: true, currentOperation: commercialOperation, objectifs: commercialOperation.objectif, descriptions: commercialOperation.description
    });
  };

  handleOpenDialog = (currentOperation) => {
    this.setState({ currentOperation });
  };

  handleClose = () => {
    this.setState({ openPopUp: false });
  };

  handleSave = () => {
    const {
      descriptions, objectifs, currentOperation, actionTypeId, contactsIds, staffName, actionTypeName,
      nbrActions, actionDescriptions, actionDates, nbrConclusions, conclusions, clientName
    } = this.state;
    const commercialOperation = currentOperation;
    const operationName = currentOperation.name;
    const { stateName, paymentDate, estimatedTradeVolumeInEuro } = currentOperation;
    const sector = currentOperation.client.sector1;
    commercialOperation._id = currentOperation.commercialOperationId;
    const commercialActionType = { _id: actionTypeId };
    const CommercialAction = {
      commercialOperation,
      commercialActionType,
      objectifs,
      descriptions,
      contactsIds,
      nbrConclusions,
      conclusions,
      nbrActions,
      actionDescriptions,
      actionDates
    };
    const ActionHistory = {
      staffName,
      clientName,
      operationName,
      stateName,
      actionTypeName,
      sector,
      paymentDate,
      estimatedTradeVolumeInEuro,
      objectifs,
      descriptions,
      contactsIds,
      nbrConclusions,
      conclusions,
      nbrActions,
      actionDescriptions,
      actionDates
    };
    // eslint-disable-next-line no-unused-vars
    CommercialActionService.saveCommercialAction(CommercialAction).then(result => {
      this.setState({ openPopUp: false });
    });
    // eslint-disable-next-line no-unused-vars
    HistoryActionService.saveActionHistory(ActionHistory).then(result => {
      this.setState({ openPopUp: false });
    });
  }

  generateRandomColor = () => {
    const r = Math.round((Math.random() * 255)); // red 0 to 255
    const g = Math.round((Math.random() * 255)); // green 0 to 255
    const b = Math.round((Math.random() * 255)); // blue 0 to 255
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  };

  handleAction = (event, row) => {
    if (event.target.name === 'actionDescriptions') {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const tab = this.state.actionDescriptions;
      tab[0] = 0;
      tab[row] = event.target.value;
      this.setState({ actionDescriptions: tab });
    }
    if (event.target.name === 'actionDates') {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const tab = this.state.actionDates;
      tab[0] = 0;
      tab[row] = event.target.value;
      this.setState({ actionDates: tab });
    }
  }

  handleAddAction = () => {
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const newElement = this.state.nbrActions.length + 1;
    // eslint-disable-next-line react/destructuring-assignment
    this.state.nbrActions.push(newElement);
    this.setState({ openDoc: true });
  }

  handleDeleteAction = (row) => {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.nbrActions.length > 1) {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const newDocs = this.state.nbrActions.filter(rows => rows !== row);
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const newDocs2 = this.state.actionDescriptions.filter((e, i) => i !== (row));
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const newDocs3 = this.state.actionDates.filter((e, i) => i !== (row));
      this.setState({ nbrActions: newDocs, actionDescriptions: newDocs2, actionDates: newDocs3 });
    }
  }

  handleGoBack = () => {
    history.push('/app/commercial-action');
  }

  handleConclusion = (event, row) => {
    if (event.target.name === 'conclusions') {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const tab = this.state.conclusions;
      tab[0] = 0;
      tab[row] = event.target.value;
      this.setState({ conclusions: tab });
    }
  }

  handleAddConclusion = () => {
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const newElement = this.state.nbrConclusions.length + 1;
    // eslint-disable-next-line react/destructuring-assignment
    this.state.nbrConclusions.push(newElement);
    this.setState({ openDoc: true });
  }

  handleDeleteConclusion = (row) => {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.nbrConclusions.length > 1) {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const newDocs = this.state.nbrConclusions.filter(rows => rows !== row);
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const newDocs2 = this.state.conclusions.filter((e, i) => i !== (row));
      this.setState({ nbrConclusions: newDocs, conclusions: newDocs2 });
    }
  }

  render() {
    console.log(this.state);
    // eslint-disable-next-line react/prop-types
    const { logedUser } = this.props;
    const thelogedUser = JSON.parse(logedUser);
    console.log(thelogedUser);
    const {
      numberClientResponsible, numberClientAssistant, openPopUp, nbrConclusions, conclusions,
      status, staffAssign, operationsAssign, staffName, clientId, currentOperation,
      descriptions, objectifs, actionTypes, actionTypeId, nbrActions, actionDescriptions, actionDates
    } = this.state;
    const { classes } = this.props;
    const title = brand.name + ' - Commercial Actions';
    const description = brand.desc;
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
        <PapperBlock
          title="Add Commercial Actions"
          desc="commercial actions"
          icon="ios-people-outline"
          noMargin
          overflowX
        >
          <Grid container spacing={1}>
            <Grid item xs={11} />
            <Grid item xs={1}>
              <Tooltip title="Back to List">
                <IconButton onClick={() => this.handleGoBack()}>
                  <KeyboardBackspaceIcon color="secondary" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <br />
          <Grid
            container
            spacing={2}
            alignItems="flex-start"
            direction="row"
            justify="center"
          >
            <Grid item xs={12} md={4} sm={4}>
              <InputBase
                className={classes.root}
                defaultValue="№ Client Responsible :"
                inputProps={{ 'aria-label': 'naked' }}
              />
              {numberClientResponsible}
            </Grid>
            <Grid item xs={12} md={4} sm={4}>
              <InputBase
                className={classes.root}
                defaultValue="№ Client Assistant :"
                inputProps={{ 'aria-label': 'naked' }}
              />
              {numberClientAssistant}
            </Grid>
            <Grid item xs={12} md={4} sm={4}>
              <InputBase
                className={classes.root}
                defaultValue="Potential Volume :"
                inputProps={{ 'aria-label': 'naked' }}
              />
              {0}
            </Grid>
          </Grid>
          <br />
          <Grid
            container
            spacing={2}
            alignItems="flex-start"
            direction="row"
            justify="center"
          >
            <Grid item xs={12} md={6} sm={6}>
              <Autocomplete
                id="combo-box-demo"
                options={staffAssign}
                getOptionLabel={option => (option ? option.client.name : '')}
                onChange={this.handleChangeClient}
                renderInput={params => (
                  <TextField
                    fullWidth
                    {...params}
                    label="Select the Client *"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
          </Grid>
          <br />
          {clientId !== '' ? (
            <Grid
              container
              spacing={4}
              direction="row"
            >
              {status.map((row) => (
                <Grid item xs={12} md={4}>
                  <div id={row.commercialOperationStatusId}>
                    <Chip
                      label={row.name + ' ' + row.percentage + ' %'}
                      avatar={<Avatar>{row.code}</Avatar>}
                      color="default"
                      style={{ backgroundColor: this.generateRandomColor() }}
                    />
                    <Divider
                      variant="fullWidth"
                      style={{ marginBottom: '10px', marginTop: '10px' }}
                    />
                  </div>
                  {operationsAssign.map((line) => (
                    <div>
                      {line.stateName === row.name ? (
                        <div id={line.commercialOperationId}>
                          {/* eslint-disable-next-line react/jsx-no-bind */}
                          <Card id={line.commercialOperationId} onClick={this.activateLasers.bind(this, line)} className={classes.root} style={{ cursor: 'pointer', maxWidth: 'fit-content' }}>
                            <CardHeader
                              avatar={(
                                <Avatar aria-label="recipe" className={classes.avatar} style={{ backgroundColor: 'rgb(255.40.0)' }}>
                                  {staffName.substr(0, 1)}
                                </Avatar>
                              )}
                              action={(
                                <IconButton aria-label="settings">
                                  {line.estimatedTradeVolumeInEuro}
                                  {' '}
                                                €
                                </IconButton>
                              )}
                              title={staffName}
                            />
                            <CardContent>
                              <Box fontWeight={500}>
                                          Action Type :
                                {' '}
                                {line.name ? line.name : ''}
                              </Box>
                              <br />
                              <Box fontWeight={300} align="center" fontStyle="italic">
                                          Client Name:
                                {' '}
                                {line.clientName ? line.clientName : ''}
                              </Box>
                              <Box fontWeight={300} align="center" fontStyle="italic">
                                          Operation Name:
                                {' '}
                                {line.name ? line.name : ''}
                              </Box>
                              <Box fontWeight={300} align="center" fontStyle="italic">
                                          General Sector:
                                {' '}
                                {line.sector1 ? line.sector1 : ''}
                              </Box>
                              <br />
                                        Objectives :
                              <br />
                              <Typography variant="body2" color="textSecondary" component="p">
                                {line.objectif ? line.objectif : ''}
                              </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                              <IconButton
                                aria-label="show more"
                              >
                                <OpenInNewIcon />
                              </IconButton>
                            </CardActions>
                          </Card>
                          <br />
                        </div>
                      ) : <div />}
                    </div>
                  ))}
                </Grid>
              ))}
            </Grid>
          ) : <div /> }
          <Dialog
            open={openPopUp}
            keepMounted
            scroll="body"
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth="md"
            maxWidth="md"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {' '}
              {currentOperation.name ? currentOperation.name : ''}
              {' '}
            </DialogTitle>
            <DialogContent dividers>
              <Grid
                container
                spacing={2}
                alignItems="flex-start"
                direction="row"
              >
                <Grid item xs={12}>
                  <Card>
                    <Grid
                      container
                      spacing={2}
                      alignItems="flex-start"
                      direction="row"
                      justify="center"
                    >
                      <Grid item xs={7}>
                        <Grid
                          container
                          spacing={4}
                          alignItems="flex-start"
                          direction="row"
                        >
                          <Grid item xs={1}>
                            <CardHeader
                              avatar={(
                                <Avatar style={{ backgroundColor: '#FF0000' }}>
                                  {staffName ? staffName.substr(0, 1) : ''}
                                </Avatar>
                              )}
                            />
                          </Grid>
                          <Grid item xs={11}>
                            <CardHeader
                              variant="subtitle1"
                              color="primary"
                              title={staffName}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={5}>
                        <CardHeader
                          variant="body1"
                          color="textPrimary"
                          title={'Trade Volume : ' + currentOperation.estimatedTradeVolumeInEuro + ' €'}
                          subheader={'Operations Status : ' + currentOperation.stateName}
                        />
                      </Grid>
                      <Grid item xs={0} />
                      <Grid item xs={4}>
                        <FormControl fullWidth required>
                          <InputLabel>Commercial Action Type</InputLabel>
                          <Select
                            name="actionTypeId"
                            value={actionTypeId}
                            onChange={this.handleChange}
                          >
                            {
                              actionTypes.map((clt) => (
                                <MenuItem key={clt.actionTypeId} value={clt.actionTypeId}>
                                  {clt.typeName}
                                </MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={7} />
                      <Grid item xs={3} />
                      <Grid item xs={6}>
                        <Box fontWeight={600} align="center" fontStyle="italic">
                            Client Name:
                          {' '}
                          {currentOperation.clientName ? currentOperation.clientName : ''}
                        </Box>
                        <Box fontWeight={600} align="center" fontStyle="italic">
                            Operation Name:
                          {' '}
                          {currentOperation.name ? currentOperation.name : ''}
                        </Box>
                        <Box fontWeight={600} align="center" fontStyle="italic">
                            General Sector:
                          {' '}
                          {currentOperation.sector1 ? currentOperation.sector1 : ''}
                        </Box>
                      </Grid>
                      <Grid item xs={3} />
                      <Grid item xs={0} />
                      <Grid item xs={4}>
                        <ExpansionPanel>
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography className={classes.heading}>Select Client Contacts</Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            {
                              currentOperation.contactDtos ? currentOperation.contactDtos.map((clt) => (
                                // eslint-disable-next-line jsx-a11y/label-has-for,jsx-a11y/label-has-associated-control
                                <label>
                                  <input
                                    type="checkbox"
                                    value={clt.contactId}
                                    onChange={this.handleCheckBox}
                                  />
                                  {clt.firstName + ' ' + clt.fatherFamilyName + ' ' + clt.motherFamilyName}
                                </label>
                              )) : (<div />)
                            }
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                      </Grid>
                      <Grid item xs={3} />
                      <Grid item xs={2}>
                        <TextField
                          id="operaDate"
                          label="Operation Date"
                          value={currentOperation.paymentDate ? currentOperation.paymentDate.substr(0, 10) : ''}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          id="actionDate"
                          label="Action Date"
                          value={currentOperation.paymentDate ? currentOperation.paymentDate.substr(0, 10) : ''}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={11}>
                        <Typography variant="body1" color="textPrimary" component="p">
                          <br />
                          <TextField
                            id="objectifs"
                            label="Objectives"
                            name="objectifs"
                            value={objectifs}
                            onChange={this.handleChange}
                            fullWidth
                            multiline
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Typography>
                      </Grid>
                      <Grid item xs={11}>
                        <Typography variant="body1" color="textPrimary" component="p">
                          <TextField
                            id="descriptions"
                            label="Description"
                            name="descriptions"
                            value={descriptions}
                            onChange={this.handleChange}
                            fullWidth
                            multiline
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Typography>
                      </Grid>
                    </Grid>
                    <br />
                    {nbrConclusions.map((row) => (
                      <Grid
                        container
                        spacing={2}
                        alignItems="flex-start"
                        direction="row"
                        align="center"
                      >
                        <Grid item xs={0} />
                        <Grid item xs={2} align="center">
                          <Typography variant="subtitle2" component="h3" color="grey">
                            <br />
                                Conclusion
                            {' '}
                            { row }
                          </Typography>
                        </Grid>
                        <Grid item xs={7}>
                          <TextField
                            id="conclusions"
                            label="Description"
                            name="conclusions"
                            value={conclusions[row]}
                            multiline
                            onChange={event => this.handleConclusion(event, row)}
                            fullWidth
                            required
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid xs={2}>
                          <br />
                          <IconButton size="medium" color="primary" onClick={() => this.handleAddConclusion()}>
                            <AddIcon />
                          </IconButton>
                          <IconButton size="small" color="primary" onClick={() => this.handleDeleteConclusion(row)}>
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))}
                    <br />
                    {nbrActions.map((row) => (
                      <Grid
                        container
                        spacing={2}
                        alignItems="flex-start"
                        direction="row"
                        align="center"
                      >
                        <Grid item xs={0} />
                        <Grid item xs={2} align="center">
                          <Typography variant="subtitle2" component="h3" color="grey">
                            <br />
                                Next Action
                            {' '}
                            { row }
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            id="actionDescriptions"
                            label="Description"
                            name="actionDescriptions"
                            value={actionDescriptions[row]}
                            multiline
                            onChange={event => this.handleAction(event, row)}
                            fullWidth
                            required
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            id="actionDates"
                            label="Action Date"
                            name="actionDates"
                            value={actionDates[row]}
                            type="date"
                            onChange={event => this.handleAction(event, row)}
                            fullWidth
                            required
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid xs={2}>
                          <br />
                          <IconButton size="medium" color="primary" onClick={() => this.handleAddAction()}>
                            <AddIcon />
                          </IconButton>
                          <IconButton size="small" color="primary" onClick={() => this.handleDeleteAction(row)}>
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))}
                  </Card>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={this.handleClose}>
                  Close
              </Button>
              <Button variant="contained" color="primary" type="button" onClick={this.handleSave}>
                  Save
              </Button>
            </DialogActions>
          </Dialog>
        </PapperBlock>
      </div>
    );
  }
}
AddCommercialAction.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = () => ({
  logedUser: localStorage.getItem('logedUser')
});

const AddCommercialActionMapped = connect(
  mapStateToProps
)(AddCommercialAction);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <AddCommercialActionMapped changeTheme={changeTheme} classes={classes} />;
};
