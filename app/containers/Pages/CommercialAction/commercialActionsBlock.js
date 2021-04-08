import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  Avatar, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField
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
import interact from 'interactjs';
import { ThemeContext } from '../../App/ThemeWrapper';
import CommercialOperationStatusService from '../../Services/CommercialOperationStatusService';
import StaffService from '../../Services/StaffService';
import CommercialOperationService from '../../Services/CommercialOperationService';
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
      status: [],
      operations: [],
      staffs: [],
      staffAssign: [],
      assignments: [],
      operationsAssign: [],
      numberClientResponsible: 0,
      numberClientAssistant: 0,
      staffId: '',
      currentOperation: [],
      clientId: '',
      clientName: '',
      expanded: false,
      display: 'flex',
      openPopUpImport: false,
      openPopUp: false
    };
  }

  componentDidMount() {
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
      console.log(result);
      this.setState({ assignments: result.data });
    });

    interact('.resize-drag')
      .draggable({
        // enable autoScroll
        autoScroll: true,

        listeners: {
          // call this function on every dragmove event
          move: this.dragMoveListener,
          // call this function on every dragend event
          /* end(event) {
                console.log('Your her => ', event);
              } */
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

    handleChange = (ev) => {
      this.setState({ [ev.target.name]: ev.target.value });
    }

    handleChangeStaff = (ev, value) => {
      // eslint-disable-next-line react/destructuring-assignment
      const assig = this.state.assignments;
      let respoNumber = 0;
      let respoAssistance = 0;
      const staffAssign = assig.filter(row => (row.staff.staffId === value.staffId));
      console.log(staffAssign);
      // eslint-disable-next-line array-callback-return
      staffAssign.map(row => {
        console.log(row.typeStaff);
        // eslint-disable-next-line no-plusplus
        if (row.typeStaff === 'Responsible Commercial') respoNumber++;
        // eslint-disable-next-line no-plusplus
        if (row.typeStaff === 'Assistant Commercial') respoAssistance++;
      });
      console.log(respoNumber);
      console.log(respoAssistance);
      this.setState({
        staffAssign, staffName: value.firstName + ' ' + value.fatherFamilyName + ' ' + value.motherFamilyName, staffId: value.staffId, numberClientResponsible: respoNumber, numberClientAssistant: respoAssistance
      });
    }

    handleChangeClient = (ev, value) => {
      // eslint-disable-next-line react/destructuring-assignment
      const operatAssign = this.state.operations;
      const operationsAssign = operatAssign.filter(row => (row.clientName === value.client.name));
      this.setState({ clientId: value.client._id, clientName: value.client.name, operationsAssign });
    }

    activateLasers = (commercialOperation) => {
      console.log(commercialOperation);
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
      const { descriptions, objectifs, currentOperation } = this.state;
      const newOperation = currentOperation;
      newOperation.description = descriptions;
      newOperation.objectif = objectifs;
      CommercialOperationService.updateCommercialOperation(newOperation).then(result => {
        console.log(result);
        this.setState({ openPopUp: false });
      });
    }

    generateRandomColor = () => {
      const r = Math.round((Math.random() * 255)); // red 0 to 255
      const g = Math.round((Math.random() * 255)); // green 0 to 255
      const b = Math.round((Math.random() * 255)); // blue 0 to 255
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    };

    render() {
      console.log(this.state);
      const {
        numberClientResponsible, numberClientAssistant, openPopUp,
        staffs, status, staffId, staffAssign, operationsAssign, staffName, clientId, currentOperation, descriptions, objectifs
      } = this.state;
      const { classes } = this.props;
      return (
        <div>
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
                options={staffs}
                getOptionLabel={option => (option ? option.firstName + ' ' + option.fatherFamilyName + ' ' + option.motherFamilyName : '')}
                onChange={this.handleChangeStaff}
                renderInput={params => (
                  <TextField
                    fullWidth
                    {...params}
                    label="Select the staff*"
                    variant="outlined"
                  />
                )}
              />
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
          {
            staffId !== '' ? (
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
            ) : (<div />)
          }
          <br />
          {clientId !== '' ? (
            <Grid
              container
              spacing={4}
              direction="row"
            >
              {status.map((row) => (
                <Grid item xs={12} md={4}>
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
                  {operationsAssign.map((line) => (
                    <div>
                      {line.stateName === row.name ? (
                        <div id={line.commercialOperationId} className="resize-drag">
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
                              <Typography variant="subtitle1" color="textSecondary" align="center">
                                        Operation :
                                {' '}
                                {line.name ? line.name : ''}
                              </Typography>
                              <Typography variant="subtitle1" color="textSecondary" align="center">
                                        Client :
                                {' '}
                                {line.clientName ? line.clientName : ''}
                              </Typography>
                                      Objectif
                              <Typography variant="body2" color="textSecondary" component="p">
                                {line.objectif ? line.objectif : ''}
                              </Typography>
                            </CardContent>
                            <CardContent>
                                      Description
                              <Typography variant="body2" color="textSecondary" component="p">
                                {line.description ? line.description : ''}
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
                      <Grid item xs={6}>
                        <Typography variant="subtitle1" color="textPrimary" align="center">
                          Operation Name:
                          {' '}
                          {currentOperation.name ? currentOperation.name : ''}
                        </Typography>
                        <Typography variant="subtitle1" color="textPrimary" align="center">
                          Client Name:
                          {' '}
                          {currentOperation.clientName ? currentOperation.clientName : ''}
                        </Typography>
                      </Grid>
                      <Grid item xs={10}>
                        <Typography variant="body1" color="textPrimary" component="p">
                          <br />
                          <TextField
                            id="objectifs"
                            label="Objectifs"
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
                      <Grid item xs={10}>
                        <Typography variant="body1" color="textPrimary" component="p">
                          <br />
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

const CommercialActionsBlockMapped = connect(
)(CommercialActionsBlock);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <CommercialActionsBlockMapped changeTheme={changeTheme} classes={classes} />;
};
