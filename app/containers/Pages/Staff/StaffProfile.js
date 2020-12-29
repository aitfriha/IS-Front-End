import React, { Component } from 'react';
import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Avatar,
  withStyles,
  Typography,
  Paper,
  Tab,
  Tabs,
  Badge,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import ProfilePicture from 'profile-picture';
import 'profile-picture/build/ProfilePicture.css';
import '../Configurations/map/app.css';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import VisibilityIcon from '@material-ui/icons/Visibility';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './staff-jss';
import FunctionalStructureService from '../../Services/FunctionalStructureService';
import AdministrativeStructureService from '../../Services/AdministrativeStructureService';
import avatarApi from '../../../api/images/avatars';
import StaffProfileEconomicContractInformation from './StaffProfileEconomicContractInformation';
import StaffProfileContractInformation from './StaffProfileContractInformation';
import StaffProfileGeneralInformation from './StaffProfileGeneralInformation';
import StaffService from '../../Services/StaffService';
import {
  setStaff,
  getAllStaff,
  updateStaff,
  setEdit
} from '../../../redux/staff/actions';

const SmallAvatar = withStyles(theme => ({
  root: {
    width: 40,
    height: 40,
    border: `2px solid ${theme.palette.background.paper}`
  }
}))(Avatar);

export class StaffProfile extends Component {
  state = {
    value: 0,
    documentType: '',
    docExtension: '',
    numPages: null,
    pageNumber: 1,
    functionalStructureTree: {},
    administrativeStructureTree: {},
    isChangeProfilePic: false,
    photo: '',
    isOpenFunctionalLevelsDialog: false,
    isOpenAdministrativeLevelsDialog: false,
    functionalLevelsTreesList: [],
    administrativeLevelsTreesList: []
  };

  profilePictureRef = React.createRef();

  componentDidMount() {
    const { staff } = this.props;
    if (
      staff.isFunctionalLeader === 'no'
      && staff.functionalStructureLevels.length > 0
    ) {
      const { type } = staff.functionalStructureLevels[0];
      let tree = {};
      FunctionalStructureService.getLevelTree(
        staff.functionalStructureLevels[0]._id
      ).then(({ data }) => {
        if (type === 'Level 1') {
          tree = {
            level1: data[0].name
          };
        } else if (type === 'Level 2') {
          tree = {
            level1: data[0].name,
            level2: data[1].name
          };
        } else if (type === 'Level 3') {
          tree = {
            level1: data[0].name,
            level2: data[1].name,
            level3: data[2].name
          };
        }
        this.setState({
          functionalStructureTree: tree
        });
      });
    } else if (staff.isFunctionalLeader === 'yes') {
      const functionalLevelsTreesList = [];
      let tree = {};
      staff.functionalStructureLevels.forEach(level => {
        const { type } = level;
        FunctionalStructureService.getLevelTree(level._id).then(({ data }) => {
          if (type === 'Level 1') {
            tree = {
              level1: data[0].name
            };
          } else if (type === 'Level 2') {
            tree = {
              level1: data[0].name,
              level2: data[1].name
            };
          } else if (type === 'Level 3') {
            tree = {
              level1: data[0].name,
              level2: data[1].name,
              level3: data[2].name
            };
          }
          functionalLevelsTreesList.push(tree);
        });
      });
      this.setState({
        functionalLevelsTreesList
      });
    }
    if (
      staff.isAdministrativeLeader === 'no'
      && staff.administrativeStructureLevels.length > 0
    ) {
      const { type } = staff.administrativeStructureLevels[0];
      let tree = {};
      AdministrativeStructureService.getLevelTree(
        staff.administrativeStructureLevels[0]._id
      ).then(({ data }) => {
        if (type === 'Level 1') {
          tree = {
            level1: data[0].name
          };
        } else if (type === 'Level 2') {
          tree = {
            level1: data[0].name,
            level2: data[1].name
          };
        } else if (type === 'Level 3') {
          tree = {
            level1: data[0].name,
            level2: data[1].name,
            level3: data[2].name
          };
        }
        this.setState({
          administrativeStructureTree: tree
        });
      });
    } else if (staff.isAdministrativeLeader === 'yes') {
      const administrativeLevelsTreesList = [];
      let tree = {};
      staff.administrativeStructureLevels.forEach(level => {
        const { type } = level;
        AdministrativeStructureService.getLevelTree(level._id).then(
          ({ data }) => {
            if (type === 'Level 1') {
              tree = {
                level1: data[0].name
              };
            } else if (type === 'Level 2') {
              tree = {
                level1: data[0].name,
                level2: data[1].name
              };
            } else if (type === 'Level 3') {
              tree = {
                level1: data[0].name,
                level2: data[1].name,
                level3: data[2].name
              };
            }
            administrativeLevelsTreesList.push(tree);
          }
        );
      });
      this.setState({
        administrativeLevelsTreesList
      });
    }
    this.setState({
      photo: staff.photo
    });
  }

  componentWillUnmount() {
    const { setEdit } = this.props;
    setEdit(false);
  }

  handleChange = (event, newValue) => {
    this.setState({
      value: newValue
    });
  };

  handleBack = () => {
    const { showProfile, staff } = this.props;
    showProfile(false, staff);
  };

  handleClosePictureDialog = () => {
    this.setState({
      isChangeProfilePic: false
    });
  };

  handleOpenPictureDialog = () => {
    this.setState({
      isChangeProfilePic: true
    });
  };

  handleUpload = () => {
    const {
      setStaff, staff, updateStaff, getAllStaff
    } = this.props;
    // const PP = this.profilePicture.current;
    /* const imageData = PP.getData();
        const file = imageData.file; */
    const PP = this.profilePictureRef.current;
    const photo = PP.getImageAsDataUrl();

    const newStaff = {
      ...staff,
      photo
    };

    const promise = new Promise(resolve => {
      updateStaff(newStaff);
      this.editingPromiseResolve = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        notification('success', result);
        getAllStaff();
        setEdit(false);
        StaffService.getStaffById(staff.staffId).then(({ data }) => {
          setStaff(data);
          this.setState({
            isEditData: false
          });
        });
      } else {
        notification('danger', result);
      }
    });
  };

  handleOpenFunctionalLevelsDialog = () => {
    this.setState({
      isOpenFunctionalLevelsDialog: true
    });
  };

  handleCloseFunctionalLevelsDialog = () => {
    this.setState({
      isOpenFunctionalLevelsDialog: false
    });
  };

  handleOpenAdministrativeLevelsDialog = () => {
    this.setState({
      isOpenAdministrativeLevelsDialog: true
    });
  };

  handleCloseAdministrativeLevelsDialog = () => {
    this.setState({
      isOpenAdministrativeLevelsDialog: false
    });
  };

  render() {
    const {
      classes, staff, isEdit, isShowSpinner
    } = this.props;
    const {
      value,
      isOpenFunctionalLevelsDialog,
      isOpenAdministrativeLevelsDialog,
      functionalStructureTree,
      functionalLevelsTreesList,
      administrativeStructureTree,
      administrativeLevelsTreesList,
      isChangeProfilePic,
      photo
    } = this.state;
    return (
      <div>
        {isShowSpinner ? (
          <div>
            <img
              src="/images/spinner.gif"
              alt="spinner"
              className={classes.circularProgress}
            />
          </div>
        ) : (
          <div />
        )}

        <div
          style={isShowSpinner ? { pointerEvents: 'none', opacity: '0.4' } : {}}
        >
          <Dialog
            maxWidth="lg"
            fullWidth
            scroll="paper"
            aria-labelledby="levelsDialog"
            open={isOpenFunctionalLevelsDialog}
            classes={{
              paper: classes.paper
            }}
          >
            <DialogTitle id="SaveFormula">Levels</DialogTitle>
            <DialogContent>
              <Table className={classes.table} aria-label="">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Level 1</TableCell>
                    <TableCell align="right">Level 2</TableCell>
                    <TableCell align="right">Level 3</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {functionalLevelsTreesList.map((row, index) => (
                    <TableRow key="row">
                      <TableCell align="right">
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px',
                            marginTop: 10
                          }}
                          color={
                            Object.keys(row).length === 1 ? 'secondary' : '#000'
                          }
                        >
                          {row.level1}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px',
                            marginTop: 10
                          }}
                          color={
                            Object.keys(row).length === 2 ? 'secondary' : '#000'
                          }
                        >
                          {row.level2}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px',
                            marginTop: 10
                          }}
                          color={
                            Object.keys(row).length === 3 ? 'secondary' : '#000'
                          }
                        >
                          {row.level3}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                onClick={this.handleCloseFunctionalLevelsDialog}
                color="primary"
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            maxWidth="lg"
            fullWidth
            scroll="paper"
            aria-labelledby="levelsDialog"
            open={isOpenAdministrativeLevelsDialog}
            classes={{
              paper: classes.paper
            }}
          >
            <DialogTitle id="SaveFormula">Levels</DialogTitle>
            <DialogContent>
              <Table className={classes.table} aria-label="">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Level 1</TableCell>
                    <TableCell align="right">Level 2</TableCell>
                    <TableCell align="right">Level 3</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {administrativeLevelsTreesList.map((row, index) => (
                    <TableRow key="row">
                      <TableCell align="right">
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px',
                            marginTop: 10
                          }}
                          color={
                            Object.keys(row).length === 1 ? 'secondary' : '#000'
                          }
                        >
                          {row.level1}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px',
                            marginTop: 10
                          }}
                          color={
                            Object.keys(row).length === 2 ? 'secondary' : '#000'
                          }
                        >
                          {row.level2}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px',
                            marginTop: 10
                          }}
                          color={
                            Object.keys(row).length === 3 ? 'secondary' : '#000'
                          }
                        >
                          {row.level3}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                onClick={this.handleCloseAdministrativeLevelsDialog}
                color="primary"
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="xs"
            fullWidth
            aria-labelledby="changeProfilePic"
            open={isChangeProfilePic}
            classes={{
              paper: classes.paper
            }}
          >
            <DialogTitle id="SaveFormula">Change profile picture</DialogTitle>
            <DialogContent>
              <ProfilePicture
                ref={this.profilePictureRef}
                frameSize={1}
                frameFormat="circle"
                useHelper
                debug
              />
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                onClick={this.handleClosePictureDialog}
                color="primary"
              >
                Cancel
              </Button>
              <Button onClick={this.handleUpload} color="primary">
                Update
              </Button>
            </DialogActions>
          </Dialog>
          <div>
            <IconButton onClick={() => this.handleBack()}>
              <KeyboardBackspaceIcon color="secondary" />
            </IconButton>
          </div>
          <Grid
            container
            spacing={4}
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            <Grid
              item
              xs={4}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'start'
              }}
            >
              {' '}
              {isEdit ? (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Badge
                    overlap="circle"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    badgeContent={(
                      <Tooltip title="Change profile picture">
                        <SmallAvatar>
                          <Button
                            variant="contained"
                            onClick={this.handleOpenPictureDialog}
                            className={classes.badgeButton}
                          >
                            <EditRoundedIcon color="secondary" />
                          </Button>
                        </SmallAvatar>
                      </Tooltip>
                    )}
                  >
                    <Avatar
                      alt="User Name"
                      src={photo}
                      className={classes.large}
                    />
                  </Badge>
                </div>
              ) : (
                <Avatar
                  alt="User Name"
                  src={staff.photo ? staff.photo : avatarApi[6]}
                  className={classes.large}
                />
              )}
              <div
                className={classes.divCenter}
                style={{ width: '100%', marginTop: 20 }}
              >
                <Typography
                  variant="subtitle1"
                  style={{
                    color: '#000',
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '25px',
                    fontWeight: 'bold',
                    opacity: 0.6
                  }}
                >
                  {`${staff.firstName} ${staff.fatherFamilyName} ${
                    staff.motherFamilyName
                  }`}
                </Typography>
              </div>
              <Paper
                elevation={2}
                style={{
                  padding: 20,
                  width: '100%',
                  marginTop: 30
                }}
              >
                <Typography
                  variant="subtitle1"
                  style={{
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '20px',

                    fontWeight: 'bold'
                  }}
                  color="primary"
                >
                  Contact Data :
                </Typography>
                <div className={classes.divContactInline}>
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px',
                      marginTop: 10
                    }}
                    color="secondary"
                  >
                    {'Personal phone :  '}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    style={{
                      color: '#000',
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px',
                      opacity: 0.7,
                      marginTop: 20
                    }}
                  >
                    {staff.personalPhone}
                  </Typography>
                </div>
                <div className={classes.divContactInline}>
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px'
                    }}
                    color="secondary"
                  >
                    {'Company phone :  '}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    style={{
                      color: '#000',
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px',
                      opacity: 0.7
                    }}
                  >
                    {staff.companyPhone}
                  </Typography>
                </div>
                <div className={classes.divContactInline}>
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px'
                    }}
                    color="secondary"
                  >
                    {'Personal email :  '}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    style={{
                      color: '#000',
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px',
                      opacity: 0.7
                    }}
                  >
                    {staff.personalEmail}
                  </Typography>
                </div>
                <div className={classes.divContactInline}>
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px'
                    }}
                    color="secondary"
                  >
                    {'Company email :  '}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    style={{
                      color: '#000',
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px',
                      opacity: 0.7
                    }}
                  >
                    {staff.companyEmail}
                  </Typography>
                </div>
                <div className={classes.divContactInline}>
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px'
                    }}
                    color="secondary"
                  >
                    {'Skype :  '}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    style={{
                      color: '#000',
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px',
                      opacity: 0.7
                    }}
                  >
                    {staff.skype}
                  </Typography>
                </div>
              </Paper>
              <Paper
                elevation={2}
                style={{
                  padding: 20,
                  width: '100%',
                  marginTop: 15
                }}
              >
                <Typography
                  variant="subtitle1"
                  style={{
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '20px',
                    fontWeight: 'bold'
                  }}
                  color="primary"
                >
                  Administrative Structure :
                </Typography>
                <div className={classes.divContactInline}>
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px',
                      marginTop: 10
                    }}
                    color="secondary"
                  >
                    {`is Administrative Leader ? : ${
                      staff.isAdministrativeLeader
                    }`}
                  </Typography>
                </div>
                {staff.isAdministrativeLeader === 'no' ? (
                  <div>
                    <div className={classes.divContactInline}>
                      <Typography
                        variant="subtitle1"
                        style={{
                          fontFamily: 'sans-serif , Arial',
                          fontSize: '17px',
                          marginTop: 10
                        }}
                        color="secondary"
                      >
                        {staff.administrativeStructureLevels[0]
                          ? `Current Level : ${
                            staff.administrativeStructureLevels[0].type
                          }`
                          : 'Level : none '}
                      </Typography>
                    </div>

                    <Typography
                      variant="subtitle1"
                      style={{
                        color: '#000',
                        fontFamily: 'sans-serif , Arial',
                        fontSize: '17px',
                        marginTop: 30
                      }}
                    >
                      {administrativeStructureTree.level1
                        ? `Level 1 : ${administrativeStructureTree.level1}`
                        : 'Level 1 : none '}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      style={{
                        color: '#000',
                        fontFamily: 'sans-serif , Arial',
                        fontSize: '17px',
                        marginTop: 20,
                        marginLeft: 40
                      }}
                    >
                      {administrativeStructureTree.level2
                        ? `Level 2 : ${administrativeStructureTree.level2}`
                        : 'Level 2 : none '}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      style={{
                        color: '#000',
                        fontFamily: 'sans-serif , Arial',
                        fontSize: '17px',
                        marginTop: 20,
                        marginLeft: 80
                      }}
                    >
                      {administrativeStructureTree.level3
                        ? `Level 3 : ${administrativeStructureTree.level3}`
                        : 'Level 3 : none '}
                    </Typography>
                  </div>
                ) : (
                  <div>
                    <div className={classes.divContactInline}>
                      <Typography
                        variant="subtitle1"
                        style={{
                          fontFamily: 'sans-serif , Arial',
                          fontSize: '17px',
                          marginTop: 10
                        }}
                        color="secondary"
                      >
                        {'Levels : '}
                      </Typography>
                      <IconButton
                        onClick={this.handleOpenAdministrativeLevelsDialog}
                      >
                        <VisibilityIcon color="gray" />
                      </IconButton>
                    </div>
                  </div>
                )}
              </Paper>
              <Paper
                elevation={2}
                style={{
                  padding: 20,
                  width: '100%',
                  marginTop: 15
                }}
              >
                <Typography
                  variant="subtitle1"
                  style={{
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '20px',
                    fontWeight: 'bold'
                  }}
                  color="primary"
                >
                  Functional Structure :
                </Typography>
                <div className={classes.divContactInline}>
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px',
                      marginTop: 10
                    }}
                    color="secondary"
                  >
                    {`is Functional Leader ? : ${staff.isFunctionalLeader}`}
                  </Typography>
                </div>
                {staff.isFunctionalLeader === 'no' ? (
                  <div>
                    <div className={classes.divContactInline}>
                      <Typography
                        variant="subtitle1"
                        style={{
                          fontFamily: 'sans-serif , Arial',
                          fontSize: '17px',
                          marginTop: 10
                        }}
                        color="secondary"
                      >
                        {staff.functionalStructureLevels[0]
                          ? `Current Level : ${
                            staff.functionalStructureLevels[0].type
                          }`
                          : 'Level : none '}
                      </Typography>
                    </div>

                    <Typography
                      variant="subtitle1"
                      style={{
                        color: '#000',
                        fontFamily: 'sans-serif , Arial',
                        fontSize: '17px',
                        marginTop: 30
                      }}
                    >
                      {functionalStructureTree.level1
                        ? `Level 1 : ${functionalStructureTree.level1}`
                        : 'Level 1 : none '}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      style={{
                        color: '#000',
                        fontFamily: 'sans-serif , Arial',
                        fontSize: '17px',
                        marginTop: 20,
                        marginLeft: 40
                      }}
                    >
                      {functionalStructureTree.level2
                        ? `Level 2 : ${functionalStructureTree.level2}`
                        : 'Level 2 : none '}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      style={{
                        color: '#000',
                        fontFamily: 'sans-serif , Arial',
                        fontSize: '17px',
                        marginTop: 20,
                        marginLeft: 80
                      }}
                    >
                      {functionalStructureTree.level3
                        ? `Level 3 : ${functionalStructureTree.level3}`
                        : 'Level 3 : none '}
                    </Typography>
                  </div>
                ) : (
                  <div>
                    <div className={classes.divContactInline}>
                      <Typography
                        variant="subtitle1"
                        style={{
                          fontFamily: 'sans-serif , Arial',
                          fontSize: '17px',
                          marginTop: 10
                        }}
                        color="secondary"
                      >
                        {'Levels : '}
                      </Typography>
                      <IconButton
                        onClick={this.handleOpenFunctionalLevelsDialog}
                      >
                        <VisibilityIcon color="gray" />
                      </IconButton>
                    </div>
                  </div>
                )}
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <div style={{ display: 'table', height: '100%', width: '100%' }}>
                <div style={{ display: 'table-row', height: 0 }}>
                  <Paper elevation={2}>
                    <Tabs
                      value={value}
                      onChange={this.handleChange}
                      indicatorColor="primary"
                      textColor="primary"
                      centered
                    >
                      <Tab label="General Information" />
                      <Tab label="General Contract Information" />
                      <Tab label="Economic Contract Information" />
                    </Tabs>
                  </Paper>
                </div>
                <div style={{ display: 'table-row', height: 15 }} />
                <div style={{ display: 'table-row' }}>
                  <Paper
                    elevation={2}
                    style={{
                      padding: 50,
                      width: '100%',
                      height: '100%'
                    }}
                    id="1"
                    hidden={value !== 0}
                  >
                    <StaffProfileGeneralInformation />
                  </Paper>
                  <Paper
                    elevation={2}
                    style={{
                      padding: 50,
                      width: '100%',
                      height: '100%'
                    }}
                    id="1"
                    hidden={value !== 1}
                  >
                    <StaffProfileContractInformation />
                  </Paper>

                  <Paper
                    elevation={2}
                    style={{
                      padding: 50,
                      width: '100%',
                      height: '100%'
                    }}
                    id="2"
                    hidden={value !== 2}
                  >
                    <StaffProfileEconomicContractInformation />
                  </Paper>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  staff: state.getIn(['staffs']).selectedStaff,
  isEdit: state.getIn(['staffs']).isEditStaff,
  isShowSpinner: state.getIn(['ui', 'showSpinner'])
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    updateStaff,
    getAllStaff,
    setStaff,
    setEdit
  },
  dispatch
);

const StaffProfileMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(StaffProfile);

export default withStyles(styles)(StaffProfileMapped);
