import React, { useContext } from 'react';
import MUIDataTable from 'mui-datatables';
import { PapperBlock } from 'dan-components';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Slide from '@material-ui/core/Slide';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import {
  Button,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Tooltip,
  Avatar,
  Divider,
  Paper,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  makeStyles,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow, Grid
} from '@material-ui/core';
import interact from 'interactjs';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { isString } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HistoryIcon from '@material-ui/icons/History';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Transition from '../../../components/Transition/transition';
import { ThemeContext } from '../../App/ThemeWrapper';
import styles from './levels-jss';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
import AutoComplete from '../../../components/AutoComplete';
import AdministrativeStructureService from '../../Services/AdministrativeStructureService';
import StaffService from '../../Services/StaffService';
import {
  getAllAdministrativeStructureLevel,
  updateAdministrativeStructureLevel,
  deleteAdministrativeStructureLevel
} from '../../../redux/administrativeStructure/actions';
import { getAllAdministrativeStructureAssignationHistoryByLevel } from '../../../redux/administrativeStructureAssignationHistory/actions';
import notification from '../../../components/Notification/Notification';
import FinancialCompanyService from '../../Services/FinancialCompanyService';

const useStyles = makeStyles(styles);
let staffList=[];
class LevelsBlock extends React.Component {
  constructor(props) {
    super(props);
    const thelogedUser = JSON.parse(this.props.logedUser);
    this.state = {
      level: {},
      levels: [],
      index1: -1,
      index2: -1,
      staffs: [],
      staffAssigned: [],
      staffNotAssigned: [],
      originalLevelStaffs: [],
      levelStaffs: [],
      isStaffAssignation: false,
      isLevelEdit: false,
      isLevelDelete: false,
      leader: null,
      oldLeader: null,
      newLeader: null,
      description: '',
      levelName: '',
      isViewHistory: false,
      companies: [],
      company: null,
      columns: [
        {
          name: 'levelId',
          label: 'Level Id',
          options: {
            display: false,
            filter: false
          }
        },
        {
          name: 'name',
          label: 'Name',
          options: {
            filter: true
          }
        },
        {
          label: 'Description',
          name: 'description',
          options: {
            filter: true
          }
        },
        {
          label: 'Type',
          name: 'type',
          options: {
            filter: true
          }
        },
        {
          label: 'Company',
          name: 'companyName',
          options: {
            filter: true
          }
        },
        {
          label: ' ',
          name: ' ',
          options: {
            customBodyRender: (value, tableMeta) => (
              <React.Fragment>
                {thelogedUser.userRoles[0].actionsNames.hh_administrativeStructureDefinition_modify
                  ? (
                    <IconButton onClick={() => this.handleOpenEdit(tableMeta)}>
                      <EditIcon color="secondary" />
                    </IconButton>
                  ) : null}
                {thelogedUser.userRoles[0].actionsNames.hh_administrativeStructureDefinition_delete
                  ? (
                    <IconButton onClick={() => this.handleOpenDelete(tableMeta)}>
                      <DeleteIcon color="primary" />
                    </IconButton>
                  ) : null}
              </React.Fragment>
            )
          }
        }
      ]
    };

    this.editingPromiseResolve = () => {
    };
  }

  componentDidMount() {
    const { changeTheme } = this.props;
    changeTheme('blueCyanTheme');
    this.updateData();
    interact('[id^=staffDropzone]').dropzone({
      accept: '[id^=levelElement]',
      overlap: 0.75,
      ondrop: this.removeStaffFromLevel,
      ondropactivate(event) {
        const item = event.relatedTarget;
        item.classList.add('dragging');
      },
      ondragenter(event) {
        const item = event.relatedTarget;
        item.classList.remove('cannot-drop');
        item.classList.add('can-drop');
      },
      ondragleave(event) {
        const item = event.relatedTarget;
        item.classList.remove('can-drop');
        item.classList.add('cannot-drop');
      }
    });
    interact('[id^=levelDropzone]').dropzone({
      accept: '[id^=staffElement]',
      overlap: 0.75,
      ondrop: this.addStaffToLevel,
      ondropactivate(event) {
        const item = event.relatedTarget;
        item.classList.add('dragging');
      },
      ondragenter(event) {
        const item = event.relatedTarget;
        item.classList.remove('cannot-drop');
        item.classList.add('can-drop');
      },
      ondragleave(event) {
        const item = event.relatedTarget;
        item.classList.remove('can-drop');
        item.classList.add('cannot-drop');
      }
    });
    interact('[id^=levelElement]').draggable({
      inertia: true,
      // enable autoScroll
      autoScroll: true,
      restrict: {
        restriction: '#staffDropzone',
        drag: document.getElementById('staffDropzone'),
        endOnly: true,
        elementRect: {
          top: 0,
          left: 0,
          bottom: 1,
          right: 1
        }
      },
      listeners: {
        // call this function on every dragmove event
        move: this.dragMoveListener,
        // call this function on every dragend event
        end: this.dragMoveEnd
      }
    });
    interact('[id^=staffElement]').draggable({
      inertia: true,
      // enable autoScroll
      autoScroll: true,
      restrict: {
        restriction: '#levelDropzone',
        drag: document.getElementById('levelDropzone'),
        endOnly: true,
        elementRect: {
          top: 0,
          left: 0,
          bottom: 1,
          right: 1
        }
      },
      listeners: {
        // call this function on every dragmove event
        move: this.dragMoveListener,
        // call this function on every dragend event
        end: this.dragMoveEnd
      }
    });
    FinancialCompanyService.getCompany().then(({ data }) => {
      this.setState({ companies: data });
    });
    let notAssignedStaffs = [];
    StaffService.getAdministrativeNotAssignedStaffs().then(({ data }) => {
      notAssignedStaffs = data;
      StaffService.getStaffsByIsAdministrativeLeader('yes').then(({ data }) => {
        notAssignedStaffs = notAssignedStaffs.concat(data);
        notAssignedStaffs.sort((a, b) => {
          const textA = a.firstName.toUpperCase();
          const textB = b.firstName.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        console.log(notAssignedStaffs);
        this.setState({
          staffs: notAssignedStaffs,
        });
      });
    });
    console.log(notAssignedStaffs);
  }

  handleChangeCompany = (ev, value) => {
    console.log(value);
    /*    this.setState({
      company: value.name
    }); */
    this.setState({
      oldCompany: value.financialCompanyId
    });
  };

  handleChangeLevelType = (ev, value) => {
    this.setState({
      oldType: value.type
    });
  };

  dragMoveListener = event => {
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

  dragMoveEnd = event => {
    const { target } = event;
    const initialX = 0;
    const initialY = 0;
    target.style.webkitTransform = 'translate(' + initialX + 'px, ' + initialY + 'px)';
    target.style.transform = 'translate(' + initialX + 'px, ' + initialY + 'px)';
    // update the posiion attributes
    target.setAttribute('data-x', initialX);
    target.setAttribute('data-y', initialY);
  };

  addStaffToLevel = event => {
    console.log('addStaffToLevel');
    const {
      staffs,
      staffAssigned,
      levelStaffs,
      staffNotAssigned,
      originalLevelStaffs
    } = this.state;
    const item = event.relatedTarget;
    item.classList.remove('dragging', 'cannot-drop');
    const draggedId = parseInt(event.relatedTarget.id.substr(12));
    const staffNotAssigned2 = staffNotAssigned.filter(
      value => value.staffId !== staffs[draggedId].staffId
    );
    console.log(originalLevelStaffs);
    const exist = originalLevelStaffs.some(
      staff => staff.staffId === staffs[draggedId].staffId
    );
    if (!exist) {
      staffAssigned.push(staffs[draggedId]);
    }
    levelStaffs.push(staffs[draggedId]);
    staffs.splice(draggedId, 1);
    this.setState({
      staffs,
      staffAssigned,
      levelStaffs,
      staffNotAssigned: staffNotAssigned2
    });
  };

  removeStaffFromLevel = event => {
    console.log('removeStaffFromLevel');
    const {
      staffs, staffAssigned, levelStaffs, staffNotAssigned
    } = this.state;
    const item = event.relatedTarget;
    item.classList.remove('dragging', 'cannot-drop');
    console.log('event');
    console.log(event);
    console.log(
      'the item: '
        + event.relatedTarget.id
        + ' is dropped in: '
        + event.currentTarget.id
    );
    const draggedId = parseInt(event.relatedTarget.id.substr(12));
    staffs.push(levelStaffs[draggedId]);
    staffNotAssigned.push(levelStaffs[draggedId]);
    const staffAssigned2 = staffAssigned.filter(
      staff => staff.staffId !== levelStaffs[draggedId].staffId
    );
    levelStaffs.splice(draggedId, 1);
    this.setState({
      staffs,
      levelStaffs,
      staffAssigned: staffAssigned2,
      staffNotAssigned
    });
  };

  handleOpenAssignation = level => {
    console.log('handleOpenAssignation');
    const {
      getAllAdministrativeStructureAssignationHistoryByLevel
    } = this.props;
    const { levelId } = level;
    getAllAdministrativeStructureAssignationHistoryByLevel(levelId);
    StaffService.getAdministrativeNotAssignedStaffsByCompany(
      level.companyId
    ).then(({ data }) => {
      data.sort((a, b) => {
        const textA = a.firstName.toUpperCase();
        const textB = b.firstName.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
      this.setState({ staffs: data });
    });
    StaffService.getStaffsByAdministrativeLevel(levelId, 'no').then(
      ({ data }) => {
        data.sort((a, b) => {
          const textA = a.firstName.toUpperCase();
          const textB = b.firstName.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        this.setState({
          level,
          originalLevelStaffs: JSON.parse(JSON.stringify(data)),
          levelStaffs: JSON.parse(JSON.stringify(data))
        });
      }
    );
    StaffService.getStaffsByAdministrativeLevel(levelId, 'yes').then(
      ({ data }) => {
        console.log(data);
        this.setState({
          isStaffAssignation: true,
          leader: data[0]
        });
      }
    );
  };

  handleOpenEdit = tableMeta => {
    staffList = [];
    const { companies, staffs } = this.state;
    console.log(staffs);
    this.setState({
      oldType: tableMeta.rowData[3]
    });
    const { allAdministrativeStructureLevel } = this.props;
    const levelSelected = allAdministrativeStructureLevel.filter(
      level => level.levelId === tableMeta.rowData[0]
    )[0];
    StaffService.getStaffsByAdministrativeLevel(
      levelSelected.levelId,
      'yes'
    ).then(({ data }) => {
      //staffList = staffs;
     // console.log(staffs);
      if (data[0]) {
      //  staffList.push(data[0]);
      }
      this.setState({
        oldLeader: data[0],
        newLeader: data[0],
        level: levelSelected,
        levelName: levelSelected.name,
        description: levelSelected.description,
        isLevelEdit: true,
        //staffs: staffList,
      });
      for (const key in companies) {
        if (companies[key].name === tableMeta.rowData[4]) {
          this.setState({
            oldCompany: companies[key].financialCompanyId
          });
        }
      }
    });
  };

  handleOpenDelete = tableMeta => {
    const { allAdministrativeStructureLevel } = this.props;
    const levelSelected = allAdministrativeStructureLevel.filter(
      level => level.levelId === tableMeta.rowData[0]
    )[0];
    this.setState({
      level: levelSelected,
      isLevelDelete: true
    });
  };

  handleClose = () => {
    this.updateData();
    this.setState({
      isStaffAssignation: false,
      isLevelEdit: false,
      isLevelDelete: false,
      isViewHistory: false,
      staffAssigned: [],
      staffNotAssigned: []
    });
  };

  handleSave = () => {
    const { level, staffAssigned, staffNotAssigned } = this.state;
    console.log(staffAssigned);
    const items = [
      level,
      staffAssigned,
      staffNotAssigned,
      new Date().toISOString().slice(0, 10),
      new Date().toISOString().slice(0, 10)
    ];
    StaffService.assignAdministrativeLevelToStaff(items).then(() => {
      this.handleClose();
    });
  };

  updateData = () => {
    const { getAllAdministrativeStructureLevel } = this.props;
    getAllAdministrativeStructureLevel();
    AdministrativeStructureService.getLevelByType('Level 1').then(
      ({ data }) => {
        this.setState({
          levels: data.payload
        });
      }
    );
  };

  handleExpandClick = (index, level) => {
    if (level === 'Level 1') {
      this.setState({
        index1: index,
        index2: -1
      });
    } else {
      this.setState({
        index2: index
      });
    }
  };

  handleValueChange = (value, type) => {
    this.setState({ [type]: value });
  };

  handleChangeLeader = (ev, value) => {
    this.setState({ newLeader: value });
  };

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  getLevels = () => {
    const { allAdministrativeStructureLevel } = this.props;
    const { level } = this.state;
    if (level) {
      return allAdministrativeStructureLevel.filter(
        lvl => lvl.type === level.type
      );
    }
    return [];
  };

  handleUpdateLevel = () => {
    const {
      updateAdministrativeStructureLevel,
      getAllAdministrativeStructureLevel
    } = this.props;
    const {
      levelName, description, oldLeader, newLeader, level
    } = this.state;

    const lvl = {
      levelId: level.levelId,
      name: levelName,
      description,
      type: level.type,
      companyId: level.companyId,
      oldLeaderId: oldLeader.staffId,
      newLeaderId: newLeader.staffId
    };
    const promise = new Promise(resolve => {
      updateAdministrativeStructureLevel(lvl);
      this.editingPromiseResolve = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        notification('success', result);
        getAllAdministrativeStructureLevel();
        this.handleClose();
      } else {
        notification('danger', result);
      }
    });
  };

  handleDeleteLevel = () => {
    const { deleteAdministrativeStructureLevel } = this.props;
    const { level } = this.state;

    const promise = new Promise(resolve => {
      deleteAdministrativeStructureLevel(level.levelId);
      this.editingPromiseResolve = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        notification('success', result);
        getAllAdministrativeStructureLevel();
      } else {
        notification('danger', result);
      }
      this.handleClose();
    });
  };

  handleOpenViewHistory = () => {
    this.setState({
      isViewHistory: true
    });
  };

  handleCloseViewHistory = () => {
    this.setState({
      isViewHistory: false
    });
  };


  render() {
    const {
      classes,
      allAdministrativeStructureLevel,
      isLoadingadministrativeStructureLevel,
      administrativeStructureLevelResponse,
      erroradministrativeStructureLevel,
      allAdministrativeStructureAssignationHistoryByLevel,
      logedUser
    } = this.props;
    const {
      oldCompany,
      oldType,
      isStaffAssignation,
      isLevelEdit,
      isLevelDelete,
      staffs,
      levelStaffs,
      originalLevelStaffs,
      staffAssigned,
      level,
      levels,
      index1,
      index2,
      leader,
      newLeader,
      levelName,
      description,
      isViewHistory,
      columns,
      companies,
    } = this.state;
    const thelogedUser = JSON.parse(logedUser);
    let exportButton = false;
    if (thelogedUser.userRoles[0].actionsNames.hh_administrativeStructureAssignation_export) {
      exportButton = true;
    }
    const options = {
      filter: true,
      selectableRows: 'none',
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
      download: exportButton,
      print: exportButton,
      customToolbar: () => (
        <CustomToolbar
          csvData={allAdministrativeStructureLevel}
          url="/app/hh-rr/administrativeStructure/create-level"
          tooltip="add new Level"
          hasAddRole={thelogedUser.userRoles[0].actionsNames.hh_administrativeStructureDefinition_create}
          hasExportRole={thelogedUser.userRoles[0].actionsNames.hh_administrativeStructureDefinition_export}
        />
      )
    };
    !isLoadingadministrativeStructureLevel
      && administrativeStructureLevelResponse
      && this.editingPromiseResolve(administrativeStructureLevelResponse);
    !isLoadingadministrativeStructureLevel
      && !administrativeStructureLevelResponse
      && this.editingPromiseResolve(erroradministrativeStructureLevel);
    levels.sort((a, b) => {
      const textA = a.name.toUpperCase();
      const textB = b.name.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    return (
      <div>
        <Dialog
          open={isLevelDelete}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          fullWidth
          maxWidth="sm"
          TransitionComponent={Transition}
        >
          <DialogTitle id="alert-dialog-title">Delete Level</DialogTitle>
          <DialogContent>
            <Typography
              variant="subtitle1"
              style={{
                fontFamily: 'sans-serif , Arial',
                fontSize: '17px'
              }}
            >
              Are you sure you want to delete this level with all sub-levels?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus color="primary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button color="primary" onClick={this.handleDeleteLevel}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={isLevelEdit}
          disableBackdropClick
          disableEscapeKeyDown
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          fullWidth
          maxWidth="sm"
          TransitionComponent={Transition}
        >
          <DialogTitle id="alert-dialog-title">Edit Level</DialogTitle>
          <DialogContent>
            {/*            <Autocomplete
              id="company-combo-level"
              options={levels}
              getOptionLabel={option => option.type}
              value={levels.find(v => v.type === oldType) || ''}
              onChange={this.handleChangeLevelType}
              style={{ width: '100%', marginTop: 7, marginBottom: 10 }}
              clearOnEscape
              renderInput={params => (
                <TextField
                  fullWidth
                  {...params}
                  label="Level type"
                  variant="outlined"
                />
              )}
            /> */}
            <TextField
              id="outlined-basic"
              label="Level Type"
              variant="outlined"
              name="Leveltype"
              value={oldType}
              fullWidth
              required
              className={classes.textField}
              /*  onChange={this.handleChange} */
              style={{ marginBottom: 10 }}
            />
            <Autocomplete
              id="company-combo-company"
              options={companies}
              getOptionLabel={option => option.name}
              value={companies.find(v => v.financialCompanyId === oldCompany) || ''}
              onChange={this.handleChangeCompany}
              style={{ width: '100%', marginTop: 7, marginBottom: 10 }}
              clearOnEscape
              renderInput={params => (
                <TextField
                  fullWidth
                  {...params}
                  label="Company"
                  variant="outlined"
                />
              )}
            />
            <TextField
              id="outlined-basic"
              label="Level Name"
              variant="outlined"
              name="levelName"
              value={levelName}
              fullWidth
              required
              className={classes.textField}
              onChange={this.handleChange}
              style={{ marginBottom: 10 }}
            />
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              name="description"
              value={description}
              fullWidth
              required
              className={classes.textField}
              onChange={this.handleChange}
              style={{ marginBottom: 10 }}
            />
            <Autocomplete
              id="combo-box-demo"
              value={newLeader}
              options={staffs}
              getOptionLabel={option => `${option.firstName} ${option.fatherFamilyName} ${
                option.motherFamilyName
              }`
              }
              getOptionSelected={(option, value) => option.staffId === value.staffId
              }
              onChange={this.handleChangeLeader}
              style={{ width: '100%', marginTop: 7, marginBottom: 10 }}
              clearOnEscape
              renderInput={params => (
                <TextField
                  fullWidth
                  {...params}
                  label="Leader"
                  variant="outlined"
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button autoFocus color="primary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={this.handleUpdateLevel}
              disabled={!levelName || !newLeader}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={isStaffAssignation}
          disableBackdropClick
          disableEscapeKeyDown
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          fullWidth
          maxWidth="sm"
          TransitionComponent={Transition}
        >
          <DialogTitle id="alert-dialog-title">
            {isViewHistory ? `${level.name} History` : level.name}
          </DialogTitle>
          <DialogContent>
            <Slide
              direction="right"
              in={!isViewHistory}
              style={{ transitionDelay: !isViewHistory ? '500ms' : '0ms' }}
              mountOnEnter
              unmountOnExit
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%'
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px'
                    }}
                    color="primary"
                  >
                    Description :
                  </Typography>
                  <IconButton onClick={this.handleOpenViewHistory}>
                    <HistoryIcon color="secondary" />
                  </IconButton>
                </div>

                <Typography
                  variant="subtitle1"
                  style={{
                    color: '#000',
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '17px',
                    opacity: 0.7
                  }}
                >
                  {level.description || 'empty'}
                </Typography>
                <div className={classes.divInline}>
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px'
                    }}
                    color="primary"
                  >
                    Company :
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    style={{
                      color: '#000',
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px',
                      opacity: 0.7,
                      marginLeft: 10
                    }}
                  >
                    {level.companyName}
                  </Typography>
                </div>
                <div className={classes.divInline}>
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px'
                    }}
                    color="primary"
                  >
                    Leader:
                  </Typography>
                  {leader ? (
                    <Tooltip
                      title={(
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <p>
                            {`${leader.firstName} ${leader.fatherFamilyName} ${
                              leader.motherFamilyName
                            }`}
                          </p>
                          <p>{`${leader.companyName}`}</p>
                        </div>
                      )}
                    >
                      <Avatar
                        className={classes.avatar}
                        alt={leader.firstName}
                        src={leader.photo}
                        style={{ marginLeft: 20 }}
                      />
                    </Tooltip>
                  ) : (
                    <Typography
                      variant="subtitle1"
                      style={{
                        color: '#000',
                        fontFamily: 'sans-serif , Arial',
                        fontSize: '17px',
                        opacity: 0.7,
                        marginLeft: 10
                      }}
                    >
                      none
                    </Typography>
                  )}
                </div>
                <Typography
                  variant="subtitle1"
                  style={{
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '20px',
                    marginTop: 10
                  }}
                  color="primary"
                >
                  Staff
                </Typography>
                <Divider variant="fullWidth" style={{ marginBottom: '10px' }} />
                <div
                  style={{
                    height: '175px',
                    width: '100%',
                    marginBottom: 10,
                    border: '1px solid gray',
                    display: 'flex',
                    flexWrap: 'wrap',
                    overflowX: 'auto',
                    marginTop: 20
                  }}
                  id="staffDropzone"
                >
                  {staffs.length > 0 ? (
                    staffs.map((row, index) => (
                      <div
                        style={{
                          margin: 10
                        }}
                        id={`staffElement${index}`}
                      >
                        <Tooltip
                          title={(
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                              }}
                            >
                              <p>
                                {`${row.firstName} ${row.fatherFamilyName} ${
                                  row.motherFamilyName
                                }`}
                              </p>
                              <p>{`${row.companyName}`}</p>
                            </div>
                          )}
                        >
                          <Avatar
                            className={classes.avatar}
                            alt={row.name}
                            src={row.photo}
                          />
                        </Tooltip>
                      </div>
                    ))
                  ) : (
                    <div />
                  )}
                </div>
                <Typography
                  variant="subtitle1"
                  style={{
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '20px'
                  }}
                  color="primary"
                >
                  Assigned Staff
                </Typography>
                <Divider variant="fullWidth" style={{ marginBottom: '10px' }} />
                <div
                  style={{
                    height: '175px',
                    width: '100%',
                    border: '1px solid gray',
                    display: 'flex',
                    direction: 'column',
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                    marginTop: 20
                  }}
                  id="levelDropzone"
                >
                  {levelStaffs.length > 0 ? (
                    levelStaffs.map((row, index) => (
                      <div
                        style={{
                          margin: 10
                        }}
                        id={`levelElement${index}`}
                      >
                        <Tooltip
                          title={(
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                              }}
                            >
                              <p>
                                {`${row.firstName} ${row.fatherFamilyName} ${
                                  row.motherFamilyName
                                }`}
                              </p>
                              <p>{`${row.companyName}`}</p>
                            </div>
                          )}
                        >
                          <Avatar
                            className={classes.avatar}
                            alt={row.name}
                            src={row.photo}
                          />
                        </Tooltip>
                      </div>
                    ))
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            </Slide>
            <Slide
              direction="right"
              in={isViewHistory}
              style={{ transitionDelay: isViewHistory ? '500ms' : '0ms' }}
              mountOnEnter
              unmountOnExit
            >
              <div>
                <div>
                  <IconButton onClick={this.handleCloseViewHistory}>
                    <KeyboardBackspaceIcon color="secondary" />
                  </IconButton>
                </div>
                <Table className={classes.table} aria-label="">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Staff</TableCell>
                      <TableCell align="right">Start Date</TableCell>
                      <TableCell align="right">End Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allAdministrativeStructureAssignationHistoryByLevel.map(
                      (row, index) => (
                        <TableRow key="row">
                          <TableCell align="right">{row.staffName}</TableCell>
                          <TableCell align="right">{row.startDate}</TableCell>
                          <TableCell align="right">{row.endDate}</TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </div>
            </Slide>
          </DialogContent>
          <DialogActions>
            <Button autoFocus color="primary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button color="primary" onClick={this.handleSave}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <PapperBlock
          title="Administrative Structure Levels Table"
          icon="md-menu"
          noMargin
        >
          <MUIDataTable
            title=""
            data={allAdministrativeStructureLevel}
            columns={columns}
            options={options}
          />
        </PapperBlock>
        <PapperBlock
          title="Administrative Structure Levels Tree"
          icon="md-menu"
          noMargin
        >
          {levels ? (
            levels.map((level1, indexLevel1) => (
              <div style={{ width: '100%' }}>
                <Paper
                  elevation={1}
                  style={{
                    width: '100%',
                    marginTop: '10px',
                    paddingLeft: '2%'
                  }}
                >
                  <div className={classes.divSpace}>
                    <Button
                      className={classes.buttonLink}
                      onClick={() => this.handleOpenAssignation(level1)}
                    >
                      {level1.name}
                    </Button>
                    <Button
                      name="personalInformation"
                      style={{ backgroundColor: 'transparent' }}
                      disableRipple
                      endIcon={
                        indexLevel1 === index1 ? (
                          <ExpandLessOutlinedIcon />
                        ) : (
                          <ExpandMoreOutlinedIcon />
                        )
                      }
                      onClick={() => this.handleExpandClick(indexLevel1, level1.type)
                      }
                    />
                  </div>
                </Paper>
                <Collapse in={indexLevel1 === index1}>
                  {level1.childs ? (
                    level1.childs.map((level2, indexLevel2) => (
                      <div>
                        <Paper
                          elevation={1}
                          style={{
                            width: '100%',
                            paddingLeft: '30%'
                          }}
                        >
                          <div className={classes.divSpace}>
                            <Button
                              className={classes.buttonLink}
                              onClick={() => this.handleOpenAssignation(level2)}
                            >
                              {level2.name}
                            </Button>
                            <Button
                              name="personalInformation"
                              style={{
                                backgroundColor: 'transparent'
                              }}
                              disableRipple
                              endIcon={
                                indexLevel2 === index2 ? (
                                  <ExpandLessOutlinedIcon />
                                ) : (
                                  <ExpandMoreOutlinedIcon />
                                )
                              }
                              onClick={() => this.handleExpandClick(indexLevel2, level2.type)
                              }
                            />
                          </div>
                        </Paper>
                        <Collapse in={indexLevel2 === index2}>
                          {level2.childs ? (
                            level2.childs.map((level3, indexLevel2) => (
                              <div>
                                <Paper
                                  elevation={1}
                                  style={{
                                    width: '100%',
                                    paddingLeft: '60%'
                                  }}
                                >
                                  <div className={classes.divSpace}>
                                    <Button
                                      className={classes.buttonLink}
                                      onClick={() => this.handleOpenAssignation(level3)
                                      }
                                    >
                                      {level3.name}
                                    </Button>
                                  </div>
                                </Paper>
                              </div>
                            ))
                          ) : (
                            <div />
                          )}
                        </Collapse>
                      </div>
                    ))
                  ) : (
                    <div />
                  )}
                </Collapse>
              </div>
            ))
          ) : (
            <div />
          )}
        </PapperBlock>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  allAdministrativeStructureLevel: state.getIn([
    'administrativeStructureLevels'
  ]).allAdministrativeStructureLevel,
  administrativeStructureLevelResponse: state.getIn([
    'administrativeStructureLevels'
  ]).administrativeStructureLevelResponse,
  isLoadingadministrativeStructureLevel: state.getIn([
    'administrativeStructureLevels'
  ]).isLoading,
  erroradministrativeStructureLevel: state.getIn([
    'administrativeStructureLevels'
  ]).errors,
  allAdministrativeStructureAssignationHistoryByLevel: state.getIn([
    'administrativeStructureAssignationHistories'
  ]).allAdministrativeStructureAssignationHistoryByLevel,
  logedUser: localStorage.getItem('logedUser')
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    updateAdministrativeStructureLevel,
    deleteAdministrativeStructureLevel,
    getAllAdministrativeStructureLevel,
    getAllAdministrativeStructureAssignationHistoryByLevel
  },
  dispatch
);

const LevelsBlockMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(LevelsBlock);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <LevelsBlockMapped changeTheme={changeTheme} classes={classes} />;
};
