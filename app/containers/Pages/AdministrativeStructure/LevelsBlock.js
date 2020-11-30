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
  TableRow
} from '@material-ui/core';
import interact from 'interactjs';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { isString } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HistoryIcon from '@material-ui/icons/History';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
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

const useStyles = makeStyles(styles);

class LevelsBlock extends React.Component {
  state = {
    level: {},
    levels: [],
    index1: -1,
    index2: -1,
    staffs: [],
    staffAssigned: [],
    originalLevelStaffs: [],
    levelStaffs: [],
    staffNotAssigned: [],
    isStaffAssignation: false,
    isLevelEdit: false,
    isLevelDelete: false,
    leader: null,
    oldLeader: null,
    newLeader: null,
    description: '',
    levelName: '',
    isViewHistory: false
  };

  editingPromiseResolve = () => {};

  columns = [
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
            <IconButton onClick={() => this.handleOpenEdit(tableMeta)}>
              <EditIcon color="secondary" />
            </IconButton>
            <IconButton onClick={() => this.handleOpenDelete(tableMeta)}>
              <DeleteIcon color="primary" />
            </IconButton>
          </React.Fragment>
        )
      }
    }
  ];

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
  }

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
    staffs.push(staffAssigned[draggedId]);
    staffNotAssigned.push(staffAssigned[draggedId]);
    staffAssigned.splice(draggedId, 1);
    levelStaffs.splice(draggedId, 1);
    this.setState({
      staffs,
      levelStaffs,
      staffAssigned,
      staffNotAssigned
    });
  };

  handleOpenAssignation = level => {
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
          levelStaffs: JSON.parse(JSON.stringify(data)),
          staffAssigned: JSON.parse(JSON.stringify(data))
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
    const { allAdministrativeStructureLevel } = this.props;
    const { staffs } = this.state;
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
      + tableMeta.rowIndex;
    StaffService.getStaffsByAdministrativeLevel(
      allAdministrativeStructureLevel[index].levelId,
      'yes'
    ).then(({ data }) => {
      const staffList = staffs;
      if (data[0]) {
        staffList.push(data[0]);
      }
      this.setState({
        oldLeader: data[0],
        newLeader: data[0],
        level: allAdministrativeStructureLevel[index],
        levelName: allAdministrativeStructureLevel[index].name,
        description: allAdministrativeStructureLevel[index].description,
        isLevelEdit: true,
        staffs: staffList
      });
    });
  };

  handleOpenDelete = tableMeta => {
    const { allAdministrativeStructureLevel } = this.props;
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
      + tableMeta.rowIndex;
    this.setState({
      level: allAdministrativeStructureLevel[index],
      isLevelDelete: true
    });
  };

  handleD;

  handleClose = () => {
    this.updateData();
    this.setState({
      isStaffAssignation: false,
      isLevelEdit: false,
      isLevelDelete: false,
      isViewHistory: false
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
      allAdministrativeStructureAssignationHistoryByLevel
    } = this.props;
    const {
      isStaffAssignation,
      isLevelEdit,
      isLevelDelete,
      staffs,
      levelStaffs,
      originalLevelStaffs,
      level,
      levels,
      index1,
      index2,
      leader,
      newLeader,
      levelName,
      description,
      isViewHistory
    } = this.state;
    const options = {
      filter: true,
      selectableRows: 'none',
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
      customToolbar: () => (
        <CustomToolbar
          csvData={allAdministrativeStructureLevel}
          url="/app/hh-rr/administrativeStructure/create-level"
          tooltip="add new Level"
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
        >
          <DialogTitle id="alert-dialog-title">Edit Level</DialogTitle>
          <DialogContent>
            <div style={{ width: '100%' }}>
              <AutoComplete
                value={this.handleValueChange}
                placeholder="Level Name"
                data={this.getLevels()}
                type="levelName"
                attribute="name"
              />
            </div>
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
                    Leader :
                  </Typography>
                  {leader ? (
                    <Tooltip
                      title={`${leader.firstName} ${leader.fatherFamilyName} ${
                        leader.motherFamilyName
                      }`}
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
                          title={`${row.firstName} ${row.fatherFamilyName} ${
                            row.motherFamilyName
                          }`}
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
                          title={`${row.firstName} ${row.fatherFamilyName} ${
                            row.motherFamilyName
                          }`}
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
            columns={this.columns}
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
  ]).allAdministrativeStructureAssignationHistoryByLevel
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
