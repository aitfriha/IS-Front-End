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
import { connect } from 'react-redux';
import interact from 'interactjs';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ThemeContext } from '../../App/ThemeWrapper';
import CommercialActionService from '../../Services/CommercialActionService';
import ActionTypeService from '../../Services/ActionTypeService';
import history from '../../../utils/history';
import AssignmentService from '../../Services/AssignmentService';
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
class CommercialActionsBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staffAssign: [],
      currentAction: [],
      actionTypes: [],
      commercialActions: [],
      nbrActions: ['1'],
      actionDescriptions: [],
      actionDates: [],
      contactsIds: [],
      nbrConclusions: ['1'],
      conclusions: [],
      descriptions: '',
      actionTypeId: '',
      objectifs: '',
      expanded: false,
      display: 'flex',
      openPopUpImport: false,
      openPopUp: false
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { logedUser } = this.props;
    const thelogedUser = JSON.parse(logedUser);
    // eslint-disable-next-line react/prop-types
    const { changeTheme } = this.props;
    changeTheme('redTheme');
    ActionTypeService.getActionType().then(result => {
      result.data.sort((a, b) => a.percentage - b.percentage);
      // eslint-disable-next-line array-callback-return
      result.data.map(row => {
        if (row.percentage === 0) row.color = 'rgb(217,217,217)';
        if (row.percentage > 0 && row.percentage <= 5) row.color = 'rgb(255,185,185)';
        if (row.percentage > 5 && row.percentage <= 10) row.color = 'rgb(255,185,185)';
        if (row.percentage > 10 && row.percentage <= 15) row.color = 'rgb(255,105,105)';
        if (row.percentage > 15 && row.percentage <= 20) row.color = 'rgb(241,183,255)';
        if (row.percentage > 20 && row.percentage <= 25) row.color = 'rgb(234,147,255)';
        if (row.percentage > 25 && row.percentage <= 30) row.color = 'rgb(232,133,255)';
        if (row.percentage > 30 && row.percentage <= 35) row.color = 'rgb(218,59,255)';
        if (row.percentage > 35 && row.percentage <= 40) row.color = 'rgb(255,255,139)';
        if (row.percentage > 45 && row.percentage <= 50) row.color = 'rgb(255,227,139)';
        if (row.percentage > 50 && row.percentage <= 55) row.color = 'rgb(255,214,83)';
        if (row.percentage > 55 && row.percentage <= 60) row.color = 'rgb(255,255,0)';
        if (row.percentage > 60 && row.percentage <= 65) row.color = 'rgb(199,199,241)';
        if (row.percentage > 65 && row.percentage <= 70) row.color = 'rgb(169,169,233)';
        if (row.percentage > 70 && row.percentage <= 75) row.color = 'rgb(139,139,225)';
        if (row.percentage > 75 && row.percentage <= 80) row.color = 'rgb(109,109,217)';
        if (row.percentage > 80 && row.percentage <= 85) row.color = 'rgb(203,227,187)';
        if (row.percentage > 85 && row.percentage <= 90) row.color = 'rgb(178,214,154)';
        if (row.percentage > 90 && row.percentage <= 95) row.color = 'rgb(154,200,122)';
        if (row.percentage > 95 && row.percentage <= 100) row.color = 'rgb(120,182,89)';
      });
      this.setState({ actionTypes: result.data });
    });
    AssignmentService.getAssignments().then(result => {
      const staffAssign = result.data.filter(row => (row.staff.companyEmail === thelogedUser.userEmail));
      this.setState({ staffAssign, connectedStaff: thelogedUser.userFullName });
      CommercialActionService.getCommercialAction2().then(result2 => {
        const tab = [];
        // eslint-disable-next-line array-callback-return
        result2.data.payload.map(row => {
          // eslint-disable-next-line array-callback-return
          staffAssign.map(line => {
            if (row.commercialOperation.client._id === line.client._id) {
              tab.push(row);
            }
          });
        });
        this.setState({ commercialActions: tab });
      });
    });
    interact('.resize-drag')
      .draggable({
        // enable autoScroll
        autoScroll: true,
        listeners: {
          move: this.dragMoveListener,
        }
      })
      .resizable({
        edges: {
          left: true,
          right: true,
          bottom: true,
          top: true
        },
        listeners: {
          move(event) {
            const { target } = event;
            let x = (parseFloat(target.getAttribute('data-x')) || 0);
            let y = (parseFloat(target.getAttribute('data-y')) || 0);
            target.style.width = event.rect.width + 'px';
            target.style.height = event.rect.height + 'px';
            x += event.deltaRect.left;
            y += event.deltaRect.top;

            target.style.webkitTransform = 'translate(' + x + 'px,' + y + 'px)';
            target.style.transform = 'translate(' + x + 'px,' + y + 'px)';
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
          }
        },
      });
  }

  dragMoveListener = (event) => {
    const { target } = event;
    // keep the dragged position in the data-x/data-y attributes
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    // translate the element
    target.style.webkitTransform = 'translate(' + x + 'px, ' + y + 'px)';
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  };

    handleChange = (ev) => {
      this.setState({ [ev.target.name]: ev.target.value });
    }

    handleCheckBox = (event) => {
      const isChecked = event.target.checked;
      const item = event.target.value;
      const newContact = { _id: item, checked: isChecked };
      // eslint-disable-next-line react/destructuring-assignment
      this.state.contactsIds.push(newContact);
    }

    activateLasers = (line) => {
      console.log(line);
      const { commercialOperation } = line;
      this.setState({
        openPopUp: true,
        currentAction: line,
        commercialActionId: line._id,
        objectifs: line.objectifs,
        descriptions: line.descriptions,
        nbrActions: line.nbrActions,
        actionDescriptions: line.actionDescriptions,
        actionDates: line.actionDates,
        nbrConclusions: line.nbrConclusions,
        conclusions: line.conclusions,
        actionTypeId: line.commercialActionType._id,
        commercialOperation
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
        descriptions, objectifs, actionTypeId, contactsIds, commercialActionId, commercialOperation,
        nbrActions, actionDescriptions, actionDates, nbrConclusions, conclusions
      } = this.state;
      const commercialActionType = { _id: actionTypeId };
      const CommercialAction = {
        commercialActionId,
        commercialActionType,
        commercialOperation,
        objectifs,
        descriptions,
        contactsIds,
        nbrActions,
        actionDescriptions,
        actionDates,
        nbrConclusions,
        conclusions
      };
      console.log(CommercialAction);
      CommercialActionService.saveCommercialAction(CommercialAction).then(result => {
        console.log(result);
        this.setState({ openPopUp: false });
      });
    }

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

    handleAdd = () => {
      history.push('/app/commercial-action/Add-Action');
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

    handleDelete = (id) => {
      console.log(id);
      CommercialActionService.deleteCommercialAction(id).then(result => {
        this.setState({ commercialActions: result.data });
      });
    }

    render() {
      console.log(this.state);
      // eslint-disable-next-line react/prop-types
      const { logedUser } = this.props;
      const thelogedUser = JSON.parse(logedUser);
      console.log(thelogedUser);
      const {
        openPopUp, commercialActions, currentAction, nbrConclusions, conclusions, connectedStaff,
        descriptions, objectifs, actionTypes, actionTypeId, nbrActions, actionDescriptions, actionDates
      } = this.state;
      const { classes } = this.props;
      return (
        <div>
          <Grid container spacing={1}>
            <Grid item xs={11} />
            <Grid item xs={1}>
              <IconButton onClick={() => this.handleAdd()}>
                <AddIcon color="secondary" />
              </IconButton>
            </Grid>
          </Grid>
          <br />
          <Grid
            container
            spacing={4}
            direction="row"
          >
            {actionTypes.map((row) => (
              <Grid item xs={12} md={4}>
                <div id={row.actionTypeId} className="drop-zone">
                  <Chip
                    label={row.typeName + ' ' + row.percentage + ' %'}
                    color="default"
                    style={{ backgroundColor: row.color }}
                  />
                  <Divider
                    variant="fullWidth"
                    style={{ marginBottom: '10px', marginTop: '10px' }}
                  />
                </div>
                {commercialActions.map((line) => (
                  <div>
                    {line.commercialActionType._id === row.actionTypeId ? (
                      <div id={line._id} className="resize-drag">
                        {/* eslint-disable-next-line react/jsx-no-bind */}
                        <Card id={line._id} className={classes.root} style={{ cursor: 'pointer', maxWidth: 'fit-content' }}>
                          <CardHeader
                            avatar={(
                              <Avatar aria-label="recipe" className={classes.avatar} style={{ backgroundColor: 'rgb(255.40.0)' }}>
                                {row.description.substr(0, 1)}
                              </Avatar>
                            )}
                            action={(
                              <IconButton aria-label="settings">
                                {line.commercialOperation.estimatedTradeVolumeInEuro}
                                {' '}
                                €
                              </IconButton>
                            )}
                            variant="subtitle1"
                            color="primary"
                            title={connectedStaff}
                          />
                          <CardContent>
                            <Box fontWeight={500}>
                                Action Type :
                              {' '}
                              {line.commercialActionType ? line.commercialActionType.typeName : ''}
                            </Box>
                            <br />
                            <Box fontWeight={300} align="center" fontStyle="italic">
                                Client Name:
                              {' '}
                              {line.commercialOperation.client ? line.commercialOperation.client.name : ''}
                            </Box>
                            <Box fontWeight={300} align="center" fontStyle="italic">
                                Operation Name:
                              {' '}
                              {line.commercialOperation ? line.commercialOperation.name : ''}
                            </Box>
                            <Box fontWeight={300} align="center" fontStyle="italic">
                                General Sector:
                              {' '}
                              {line.commercialOperation.client ? line.commercialOperation.client.sector1 : ''}
                            </Box>
                            <br />
                                Objectives:
                            <br />
                            <Typography variant="body1" color="textSecondary" component="p">
                              {line.objectifs ? line.objectifs : ''}
                            </Typography>
                            <br />
                            Conclusion:
                            <br />
                            <Typography variant="body1" color="textSecondary" component="p">
                              {line.conclusions ? line.conclusions[1] : ''}
                            </Typography>
                            <br />
                            Next Action:
                            {' '}
                            {line.actionDates ? line.actionDates[1] : ''}
                            <br />
                            <Typography variant="body1" color="textSecondary" component="p">
                              {line.actionDescriptions ? line.actionDescriptions[1] : ''}
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            {/* eslint-disable-next-line react/jsx-no-bind */}
                            <IconButton onClick={this.activateLasers.bind(this, line)}>
                              <OpenInNewIcon />
                            </IconButton>
                            <IconButton onClick={() => this.handleDelete(line._id)}>
                              <DeleteIcon color="primary" />
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
              {currentAction.commercialOperation ? currentAction.commercialOperation.name : ''}
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
                                <Avatar style={{ backgroundColor: '#ff0000' }}>
                                  {currentAction.commercialActionType ? currentAction.commercialActionType.description.substr(0, 1) : '' }
                                </Avatar>
                              )}
                            />
                          </Grid>
                          <Grid item xs={11}>
                            <CardHeader
                              variant="subtitle1"
                              color="primary"
                              title={connectedStaff}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={5}>
                        <CardHeader
                          variant="body1"
                          color="textPrimary"
                          title={'Trade Volume : ' + (currentAction.commercialOperation ? (currentAction.commercialOperation.estimatedTradeVolumeInEuro + ' €') : '')}
                          subheader={'Operations Status : ' + (currentAction.commercialOperation ? (currentAction.commercialOperation.state.name) : '')}
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
                          {currentAction.commercialOperation ? currentAction.commercialOperation.client.name : ''}
                        </Box>
                        <Box fontWeight={600} align="center" fontStyle="italic">
                          Operation Name:
                          {' '}
                          {currentAction.commercialOperation ? currentAction.commercialOperation.name : ''}
                        </Box>
                        <Box fontWeight={600} align="center" fontStyle="italic">
                          General Sector:
                          {' '}
                          {currentAction.commercialOperation ? currentAction.commercialOperation.client.sector1 : ''}
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
                              currentAction.contacts ? currentAction.contacts.map((clt) => (
                                // eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for
                                <label>
                                  <input
                                    type="checkbox"
                                    value={clt._id}
                                    onChange={this.handleCheckBox}
                                    checked
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
                          value={currentAction.commercialOperation ? currentAction.commercialOperation.paymentDate.substr(0, 10) : ''}
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
                          value={currentAction.creationDate ? currentAction.creationDate.substr(0, 10) : ''}
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
                    <br />
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
        </div>
      );
    }
}
CommercialActionsBlock.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = () => ({
  logedUser: localStorage.getItem('logedUser')
});

const CommercialActionsBlockMapped = connect(
  mapStateToProps
)(CommercialActionsBlock);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <CommercialActionsBlockMapped changeTheme={changeTheme} classes={classes} />;
};
