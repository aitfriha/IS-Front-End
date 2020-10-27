import React from 'react';
import MUIDataTable from 'mui-datatables';
import { withStyles } from '@material-ui/core/styles';
import { PapperBlock } from 'dan-components';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
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
  Radio
} from '@material-ui/core';
import interact from 'interactjs';
import Autocomplete from '@material-ui/lab/Autocomplete';
import styles from './levels-jss';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
import AutoComplete from '../../../components/AutoComplete';
import FunctionalStructureService from '../../Services/FunctionalStructureService';
import StaffService from '../../Services/StaffService';

class LevelsBlock extends React.Component {
  state = {
    levelsData: [],
    level: {},
    levels: [],
    index1: -1,
    index2: -1,
    staffs: [],
    staffAssigned: [],
    staffNotAssigned: [],
    isStaffAssignation: false,
    isLevelEdit: false,
    isLevelDelete: false,
    leader: null,
    oldLeader: null,
    newLeader: null,
    description: '',
    levelName: '',
    isProductionLevel: '',
    isCommercialLevel: ''
  };

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
      label: 'Is production level?',
      name: 'isProductionLevel',
      options: {
        filter: true
      }
    },
    {
      label: 'Is commercial level?',
      name: 'isCommercialLevel',
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

  componentDidUpdate() {}

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
    const { staffs, staffAssigned, level } = this.state;
    const item = event.relatedTarget;
    item.classList.remove('dragging', 'cannot-drop');
    /* console.log('event');
    console.log(event);
    console.log(
      'the item: '
        + event.relatedTarget.id
        + ' is dropped in: '
        + event.currentTarget.id
    );
    console.log('event');
    console.log(event);
    console.log(event.relatedTarget.id.substr(12)); */
    const draggedId = parseInt(event.relatedTarget.id.substr(12));
    staffAssigned.push(staffs[draggedId]);
    staffs.splice(draggedId, 1);
    console.log(staffs);
    this.setState({
      staffs,
      staffAssigned
    });
  };

  removeStaffFromLevel = event => {
    const { staffs, staffAssigned, staffNotAssigned } = this.state;
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
    console.log('event');
    console.log(event);
    const draggedId = parseInt(event.relatedTarget.id.substr(12));
    console.log('drop id 2');
    staffs.push(staffAssigned[draggedId]);
    staffNotAssigned.push(staffAssigned[draggedId]);
    staffAssigned.splice(draggedId, 1);

    this.setState({
      staffs,
      staffAssigned,
      staffNotAssigned
    });
  };

  handleOpenAssignation = level => {
    StaffService.getStaffsByLevel(level.levelId, 'no').then(({ data }) => {
      console.log(data);
      data.sort((a, b) => {
        const textA = a.firstName.toUpperCase();
        const textB = b.firstName.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
      console.log(data);
      this.setState({
        level,
        isStaffAssignation: true,
        staffAssigned: data
      });
    });
    StaffService.getStaffsByLevel(level.levelId, 'yes').then(({ data }) => {
      console.log(data);
      this.setState({
        leader: data[0]
      });
    });
  };

  handleOpenEdit = tableMeta => {
    const { levelsData, staffs } = this.state;
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
      + tableMeta.rowIndex;
    console.log(levelsData[index]);
    StaffService.getStaffsByLevel(levelsData[index].levelId, 'yes').then(
      ({ data }) => {
        console.log(data);
        const staffList = staffs;
        if (data[0]) {
          staffList.push(data[0]);
        }
        this.setState({
          oldLeader: data[0],
          newLeader: data[0],
          level: levelsData[index],
          levelName: levelsData[index].name,
          description: levelsData[index].description,
          isProductionLevel: levelsData[index].isProductionLevel,
          isCommercialLevel: levelsData[index].isCommercialLevel,
          isLevelEdit: true,
          staffs: staffList
        });
      }
    );
  };

  handleOpenDelete = tableMeta => {
    const { levelsData } = this.state;
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
      + tableMeta.rowIndex;
    this.setState({
      level: levelsData[index],
      isLevelDelete: true
    });
  };

  handleD;

  handleClose = () => {
    this.updateData();
    this.setState({
      isStaffAssignation: false,
      isLevelEdit: false,
      isLevelDelete: false
    });
  };

  handleSave = () => {
    const {
      level, staffAssigned, staffs, staffNotAssigned
    } = this.state;
    const items = [level, staffAssigned, staffNotAssigned];
    const items2 = {
      level,
      staffAssigned,
      staffNotAssigned
    };
    StaffService.assignLevelToStaff(items).then(() => {
      this.handleClose();
    });
  };

  updateData = () => {
    FunctionalStructureService.getLevels().then(({ data }) => {
      console.log(data);
      this.setState({
        levelsData: data
      });
    });
    FunctionalStructureService.getLevelByType('Level 1').then(({ data }) => {
      console.log(data);
      this.setState({
        levels: data
      });
    });
    StaffService.getNotAssignedStaffs().then(({ data }) => {
      console.log(data);
      data.sort((a, b) => {
        const textA = a.firstName.toUpperCase();
        const textB = b.firstName.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
      console.log(data);
      this.setState({ staffs: data });
    });
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
    if (ev.target.name === 'isProductionLevel' && ev.target.value === 'yes') {
      this.setState({
        isCommercialLevel: 'no'
      });
    } else if (
      ev.target.name === 'isCommercialLevel'
      && ev.target.value === 'yes'
    ) {
      this.setState({
        isProductionLevel: 'no'
      });
    }
  };

  getLevels = () => {
    const { level, levelsData } = this.state;
    if (level) {
      console.log(levelsData.filter(lvl => lvl.type === level.type));
      return levelsData.filter(lvl => lvl.type === level.type);
    }
    return [];
  };

  handleUpdateLevel = () => {
    const {
      levelName,
      description,
      isProductionLevel,
      isCommercialLevel,
      oldLeader,
      newLeader,
      level
    } = this.state;

    const objects = [];
    objects.push(oldLeader);
    objects.push(newLeader);
    const lvl = {
      name: levelName,
      description,
      type: level.type,
      isProductionLevel,
      isCommercialLevel
    };
    objects.push(lvl);
    FunctionalStructureService.updateLevel(objects, level.levelId).then(() => {
      this.handleClose();
    });
  };

  handleDeleteLevel = () => {
    const { level } = this.state;

    FunctionalStructureService.deleteLevel(level.levelId).then(() => {
      this.handleClose();
    });
  };

  render() {
    const { classes } = this.props;
    const {
      levelsData,
      isStaffAssignation,
      isLevelEdit,
      isLevelDelete,
      staffs,
      staffAssigned,
      level,
      levels,
      index1,
      index2,
      leader,
      newLeader,
      levelName,
      description,
      isProductionLevel,
      isCommercialLevel
    } = this.state;
    const options = {
      filter: true,
      selectableRows: 'none',
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
      customToolbar: () => (
        <CustomToolbar
          csvData={levelsData}
          url="/app/hh-rr/functionalStructure/create-level"
          tooltip="add new Level"
        />
      )
    };
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
          <DialogTitle id="alert-dialog-title">Edit Level</DialogTitle>
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
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend">Is it production level?</FormLabel>
              <RadioGroup
                aria-label="isProductionLevel"
                name="isProductionLevel"
                value={isProductionLevel}
                onChange={this.handleChange}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend">Is it Commercial level?</FormLabel>
              <RadioGroup
                aria-label="isCommercialLevel"
                name="isCommercialLevel"
                value={isCommercialLevel}
                onChange={this.handleChange}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
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
          <DialogTitle id="alert-dialog-title">{level.name}</DialogTitle>
          <DialogContent>
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
                Is it production level :
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
                {level.isProductionLevel}
              </Typography>
              <Typography
                variant="subtitle1"
                style={{
                  fontFamily: 'sans-serif , Arial',
                  fontSize: '17px',
                  marginLeft: 20
                }}
                color="primary"
              >
                Is it commercial level :
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
                {level.isCommercialLevel}
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
              {staffAssigned.length > 0 ? (
                staffAssigned.map((row, index) => (
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
          title="Functional Structure Levels Table"
          icon="md-menu"
          noMargin
        >
          <MUIDataTable
            title=""
            data={levelsData}
            columns={this.columns}
            options={options}
          />
        </PapperBlock>
        <PapperBlock
          title="Functional Structure Levels Tree"
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
LevelsBlock.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LevelsBlock);
