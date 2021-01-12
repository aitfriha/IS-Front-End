import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  Avatar, Chip, DialogContent, Divider, Grid, TextField
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Autocomplete from '@material-ui/lab/Autocomplete/Autocomplete';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addClient } from '../../../redux/actions/clientActions';
import {
  getAllClient,
  getAllClientByCountry,
  importClientCommercial,
  updateClient
} from '../../../redux/client/actions';
import { allStaffAssignedToFunctionalLevel, getAllStaff } from '../../../redux/staff/actions';
import { addAssignment, deleteAssignment } from '../../../redux/assignment/actions';
import history from '../../../utils/history';
import CountryService from '../../Services/CountryService';
import InputBase from "@material-ui/core/InputBase";
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

class CommercialAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      display: 'flex',
      openPopUpImport: false,
    };
  }

  componentDidMount() {
    const { allStaffAssignedToFunctionalLevel } = this.props;
    allStaffAssignedToFunctionalLevel();
  }

   handleExpandClick = () => {
     const { expanded } = this.state;
     this.setState({ expanded: !expanded });
   };


    handleChangeStaff = (ev, value) => {
      // this.setState({ civilityId: value.civilityTitleId });
      console.log(value.staffId);
    };

    render() {
      const {
        classes, allStaffs
      } = this.props;
      console.log(allStaffs);
      const {
        expanded
      } = this.state;
      const title = brand.name + ' - Clients';
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
            title="Actions"
            desc="commercial summary"
            icon="ios-people-outline"
            noMargin
            overflowX
          >
            <Autocomplete
              id="combo-box-demo"
              options={allStaffs && allStaffs}
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
              <InputBase
                  className={classes.margin}
                  defaultValue="7"
                  inputProps={{ 'aria-label': 'naked' }}
              />
              <br />
              <InputBase
                  className={classes.root}
                  defaultValue="№ Client Assistant "
                  inputProps={{ 'aria-label': 'naked' }}
              />
              <InputBase
                  className={classes.margin}
                  defaultValue="8"
                  inputProps={{ 'aria-label': 'naked' }}
              />
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
              <br /> <br />
            <Grid
              container
              spacing={4}
              direction="row"
            >
              <Grid item xs={12} md={4}>
                <Chip
                  label="Status 1"
                  avatar={<Avatar>1</Avatar>}
                  color="default"
                  style={{ backgroundColor: '#ffb74d' }}
                />
                <Divider
                  variant="fullWidth"
                  style={{ marginBottom: '10px', marginTop: '10px' }}
                />
                <Card className={classes.root}>
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
                <br />
                <Card className={classes.root}>
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
              <Grid item xs={12} md={4}>
                <Chip
                  label="Status 2"
                  avatar={<Avatar>2</Avatar>}
                  style={{ backgroundColor: '#64b5f6' }}
                />
                <Divider
                  variant="fullWidth"
                  style={{ marginBottom: '10px', marginTop: '10px' }}
                />
                <Card className={classes.root}>
                  <CardHeader
                    avatar={(
                      <Avatar aria-label="recipe" className={classes.avatar} style={{ backgroundColor: '#64b5f6' }}>
                                    R
                      </Avatar>
                    )}
                    action={(
                      <IconButton aria-label="settings">
                         2500 €
                      </IconButton>
                    )}
                    title="Rafael Dona"
                    subheader="September 14, 2016"
                  />
                  <CardContent>
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
                <br />
                <Card className={classes.root}>
                  <CardHeader
                    avatar={(
                      <Avatar aria-label="recipe" className={classes.avatar} style={{ backgroundColor: '#64b5f6' }}>
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
              <Grid item xs={12} md={4}>
                <Chip
                  label="Status 3"
                  avatar={<Avatar>3</Avatar>}
                  style={{ backgroundColor: '#81c784' }}
                />
                <Divider
                  variant="fullWidth"
                  style={{ marginBottom: '10px', marginTop: '10px' }}
                />
                <Card className={classes.root}>
                  <CardHeader
                    avatar={(
                      <Avatar aria-label="recipe" className={classes.avatar} style={{ backgroundColor: '#81c784' }}>
                                 R
                      </Avatar>
                    )}
                    action={(
                      <IconButton aria-label="settings">
                                 2500 €
                      </IconButton>
                    )}
                    title="Alberto H"
                    subheader="September 14, 2016"
                  />
                  <CardContent>
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
                <br />
                <Card className={classes.root}>
                  <CardHeader
                    avatar={(
                      <Avatar aria-label="recipe" className={classes.avatar} style={{ backgroundColor: '#81c784' }}>
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
            </Grid>
          </PapperBlock>
        </div>
      );
    }
}
CommercialAction.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  allClients: state.getIn(['clients']).allClients,
  clientResponse: state.getIn(['clients']).clientResponse,
  isLoading: state.getIn(['clients']).isLoading,
  errors: state.getIn(['clients']).errors,
  // all staff
  allStaffs: state.getIn(['staffs']).allStaff,
  staffResponse: state.getIn(['staffs']).staffResponse,
  isLoadingStaff: state.getIn(['staffs']).isLoading,
  errorsStaff: state.getIn(['staffs']).errors,
  // assignment
  allAssignments: state.getIn(['assignments']).allAssignments,
  assignmentResponse: state.getIn(['assignments']).assignmentResponse,
  isLoadingAssignment: state.getIn(['assignments']).isLoading,
  errorsAssignment: state.getIn(['assignments']).errors,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  addClient,
  updateClient,
  getAllClient,
  getAllClientByCountry,
  getAllStaff,
  addAssignment,
  importClientCommercial,
  deleteAssignment,
  allStaffAssignedToFunctionalLevel
}, dispatch);

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(CommercialAction));
