import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  Avatar, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField
} from '@material-ui/core';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Autocomplete from '@material-ui/lab/Autocomplete/Autocomplete';
import { connect } from 'react-redux';
import InputBase from '@material-ui/core/InputBase';
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
      assignments: [],
      numberClientResponsible: 0,
      numberClientAssistant: 0,
      staffId: '',
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
  }

  /*  componentDidUpdate(prevProps) {
          const { staffId } = this.state;
          const {
              getAssignmentByStaff, errorsAssignment, isLoadingAssignment, assignmentResponse, allAssignments
          } = this.props;
          if (prevProps.allAssignments === allAssignments && staffId != '') {
              getAssignmentByStaff(staffId);
              this.setState({ numberClientAssistant: 5 });
              this.setState({ numberClientResponsible: 3 });
          }
      } */

    handleChange = (ev) => {
      this.setState({ [ev.target.name]: ev.target.value });
    }

    handleChangeStaff = (ev, value) => {
      this.setState({ staffId: value.staffId });
    }

    handleExpandClick = () => {
      const { expanded } = this.state;
      this.setState({ expanded: !expanded });
    };

    activateLasers = () => {
      this.setState({ openPopUp: true });
    };

    handleClose = () => {
      this.setState({ openPopUp: false });
    };

    generateRandomColor = () => {
      const r = Math.round((Math.random() * 255)); // red 0 to 255
      const g = Math.round((Math.random() * 255)); // green 0 to 255
      const b = Math.round((Math.random() * 255)); // blue 0 to 255
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    };

    render() {
      console.log(this.state);
      const {
        expanded, numberClientResponsible, numberClientAssistant, openPopUp,
        staffs, status
      } = this.state;
      const { classes } = this.props;
      return (
        <div>
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
          <br />
          <InputBase
            className={classes.root}
            defaultValue="№ Client Responsible "
            inputProps={{ 'aria-label': 'naked' }}
          />
          {numberClientResponsible}
          <br />
          <InputBase
            className={classes.root}
            defaultValue="№ Client Assistant "
            inputProps={{ 'aria-label': 'naked' }}
          />
          {numberClientAssistant}
          <br />
          <InputBase
            className={classes.root}
            defaultValue="Potential Volume "
            inputProps={{ 'aria-label': 'naked' }}
          />
          <InputBase
            className={classes.margin}
            defaultValue="10"
            inputProps={{ 'aria-label': 'naked' }}
          />
          <br />
          {' '}
          <br />
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
                <Card className={classes.root} onClick={this.activateLasers} style={{ cursor: 'pointer' }}>
                  <CardHeader
                    avatar={(
                      <Avatar aria-label="recipe" className={classes.avatar} style={{ backgroundColor: 'rgb(255.40.0)' }}>
                                      C
                      </Avatar>
                    )}
                    action={(
                      <IconButton aria-label="settings">
                                      2500 €
                      </IconButton>
                    )}
                    title="Nikolai Albarran"
                    subheader="September 14, 2016"
                  />
                  <CardContent>
                    <Typography variant="subtitle1" color="textSecondary" align="center">
                                  Operation Name
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" align="center">
                                  Client : Maroc Telecom
                    </Typography>
                              Objectif
                    <Typography variant="body2" color="textSecondary" component="p">
                                  This impressive paella is a perfect party dish and a fun meal to cook together with your
                                  guests. Add 1 cup of frozen peas along with the mussels, if you like.
                    </Typography>
                  </CardContent>
                  <CardContent>
                              Description
                    <Typography variant="body2" color="textSecondary" component="p">
                                  This impressive paella is a perfect party dish and a fun meal to cook together with your
                                  guests. Add 1 cup of frozen peas along with the mussels, if you like.
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                              September 14, 2016
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                    <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                      })}
                      onClick={this.handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>Method:</Typography>
                      <Typography paragraph>
                                      Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                                      minutes.
                      </Typography>
                      <Typography paragraph>
                                      Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                                      heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                                      browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                                      and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                                      pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                                      saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                      </Typography>
                      <Typography paragraph>
                                      Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                                      without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                                      medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                                      again without stirring, until mussels have opened and rice is just tender, 5 to 7
                                      minutes more. (Discard any mussels that don’t open.)
                      </Typography>
                      <Typography>
                                      Set aside off of the heat to let rest for 10 minutes, and then serve.
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>
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
            <DialogTitle id="alert-dialog-slide-title"> Operation Name, Morocco,Tanger-Tétouan-Al Hoceïma,Tanger</DialogTitle>
            <DialogContent dividers>
              <Card className={classes.root} onClick={this.activateLasers} style={{ cursor: 'pointer', maxWidth: 'fit-content' }}>
                <CardHeader
                  avatar={(
                    <Avatar aria-label="recipe" className={classes.avatar} style={{ backgroundColor: '#ffb74d' }}>
                                        R
                    </Avatar>
                  )}
                  action={(
                    <IconButton aria-label="settings">
                                        2500 €
                    </IconButton>
                  )}
                  title="Nikolai Albarran"
                  subheader="September 14, 2016"
                />
                <CardContent>
                  <Typography variant="subtitle1" color="textSecondary" align="center">
                                    Operation Name
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" align="center">
                                    Client : Maroc Telecom
                  </Typography>
                                Objectif
                  <Typography variant="body2" color="textSecondary" component="p">
                                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                                    guests. Add 1 cup of frozen peas along with the mussels, if you like.
                  </Typography>
                </CardContent>
                <CardContent>
                                Description
                  <Typography variant="body2" color="textSecondary" component="p">
                                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                                    guests. Add 1 cup of frozen peas along with the mussels, if you like.
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                                September 14, 2016
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                    })}
                    onClick={this.handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                                        minutes.
                    </Typography>
                    <Typography paragraph>
                                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                                        heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                                        browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                                        and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                                        pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                                        saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                    </Typography>
                    <Typography paragraph>
                                        Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                                        without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                                        medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                                        again without stirring, until mussels have opened and rice is just tender, 5 to 7
                                        minutes more. (Discard any mussels that don’t open.)
                    </Typography>
                    <Typography>
                                        Set aside off of the heat to let rest for 10 minutes, and then serve.
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={this.handleClose}>
                            Close
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
