import React, { Component } from 'react';
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar
} from '@material-ui/core';
import interact from 'interactjs';
import avatarApi from '../../../api/images/avatars';
import TablePaginationActions from '../Table/TablePaginationActions';
import FunctionalStructureService from '../../Services/FunctionalStructureService';
import StaffService from '../../Services/StaffService';
import AssignStaffToLevel from './AssignStaffToLevel';

const staff = [
  {
    name: 'haroun',
    level: 'engineer',
    email: 'darjaj.haroun@gmail.com',
    phone: '+212688146618'
  },
  {
    name: 'Test',
    level: 'engineer test',
    email: 'test.test@gmail.com',
    phone: '+212600000000'
  },
  {
    name: 'test test 2',
    level: 'test level',
    email: 'test@gmail.com',
    phone: '0000000000000'
  }
];

export class DragAndDropTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page1: 0,
      rowsPerPage1: 10,
      page2: 0,
      rowsPerPage2: 10,
      data: [],
      staffId: '',
      levelId: '',
      staffs: [],
      staffAssigned: []
    };
  }

  componentDidMount() {
    FunctionalStructureService.getLevels().then(({ data }) => {
      this.setState({ data });
    });
    StaffService.getNotAssignedStaffs().then(({ data }) => {
      this.setState({ staffs: data });
    });
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

  componentDidUpdate(oldProps) {
    const { level } = this.props;
    if (level !== oldProps.level) {
      StaffService.getNotAssignedStaffs().then(({ data }) => {
        this.setState({ staffs: data });
      });
    }
    if (level.sttafs !== null) {
      this.setState({
        staffAssigned: level.staffs
      });
    }
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

  /* onDropListener = event => {
    const {
      page1, page2, rowsPerPage1, rowsPerPage2, data
    } = this.state;
    const item = event.relatedTarget;
    item.classList.remove('dragging', 'cannot-drop');
    console.log('event');
    console.log(event);
    console.log(
      'the item: '
        + event.relatedTarget.id
        + ' is staffAssigned in: '
        + event.currentTarget.id
    );
    const staffDraggedId = event.relatedTarget.id.substr(7);
    const levelDroppedId = event.currentTarget.id.substr(8);
    const staffId = page1 * rowsPerPage1 + parseInt(staffDraggedId, 10);
    const levelId = page2 * rowsPerPage2 + parseInt(levelDroppedId, 10);
    console.log('staffId');
    console.log(staffId);
    console.log('staffs');
    console.log(staff);
    console.log('staff');
    console.log(staff[staffId]);
    console.log('level');
    console.log(data[levelId]);
  }; */

  addStaffToLevel = event => {
    const { staffs, staffAssigned } = this.state;
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
    console.log(event.relatedTarget.id.substr(12));
    const draggedId = parseInt(event.relatedTarget.id.substr(12));
    console.log('drop id 2');
    staffAssigned.push(staffs[draggedId]);
    staffs.splice(draggedId, 1);

    this.setState({
      staffs,
      staffAssigned
    });
  };

  removeStaffFromLevel = event => {
    const { staffs, staffAssigned } = this.state;
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
    staffAssigned.splice(draggedId, 1);

    this.setState({
      staffs,
      staffAssigned
    });
  };

  handleChangePage1 = (event, newPage) => {
    this.setState({
      page1: newPage
    });
  };

  handleChangeRowsPerPage1 = event => {
    this.setState({
      rowsPerPage1: event.target.value,
      page1: 0
    });
  };

  handleChangePage2 = (event, newPage) => {
    this.setState({
      page2: newPage
    });
  };

  handleChangeRowsPerPage2 = event => {
    this.setState({
      rowsPerPage2: event.target.value,
      page2: 0
    });
  };

  handleClose = () => {
    this.setState({
      isDialogOpen: false
    });
  };

  handleOpenDialog = () => {
    this.setState({
      isDialogOpen: true
    });
  };

  render() {
    const {
      page1,
      rowsPerPage1,
      page2,
      rowsPerPage2,
      data,
      staffs,
      staffAssigned
    } = this.state;
    const { isDialogOpen } = this.props;
    return (
      <div>
        <Dialog
          open={isDialogOpen}
          disableBackdropClick
          disableEscapeKeyDown
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-title">Level's Staff</DialogTitle>
          <DialogContent>
            <Typography variant="h6" component="h2">
              Staff
            </Typography>
            <div
              style={{
                height: '200px',
                width: '100%',
                marginBottom: 10,
                border: '2px solid black',
                display: 'flex',
                flexWrap: 'wrap',
                overflowX: 'auto'
              }}
              id="staffDropzone"
            >
              {staffs.length > 0 ? (
                staffs.map((row, index) => (
                  <div
                    style={{
                      margin: 5
                    }}
                    id={`staffElement${index}`}
                  >
                    <Avatar alt={row.name} src={row.photo} />
                    <Typography variant="h6" component="h2">
                      {row.name}
                    </Typography>
                  </div>
                ))
              ) : (
                <div />
              )}
            </div>
            <Typography variant="h6" component="h2">
              Assigned Staff
            </Typography>
            <div
              style={{
                height: '200px',
                width: '100%',
                border: '2px solid black',
                display: 'flex',
                direction: 'column',
                overflowX: 'auto',
                whiteSpace: 'nowrap'
              }}
              id="levelDropzone"
            >
              {staffAssigned.length > 0 ? (
                staffAssigned.map((row, index) => (
                  <div
                    style={{
                      margin: 5
                    }}
                    id={`levelElement${index}`}
                  >
                    <Avatar alt={row.name} src={row.photo} />
                    <Typography variant="h6" component="h2">
                      {row.name}
                    </Typography>
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
        {/* <Paper elevation={3}>
          <div style={{ padding: 20 }}>
            <Table aria-label="Staff">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="left">Level</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="center">Phone</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {staff.length > 0 ? (
                  staff.map((row, index) => (
                    <TableRow id={`element${index}`} key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.level}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.phone}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <div />
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={staff.length}
              rowsPerPage={rowsPerPage1}
              page={page1}
              onChangePage={this.handleChangePage1}
              onChangeRowsPerPage={this.handleChangeRowsPerPage1}
              ActionsComponent={TablePaginationActions}
            />
          </div>
        </Paper>
        <Paper elevation={3}>
          <div style={{ padding: 20 }}>
            <Table aria-label="Functional Structures">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="left">Type</TableCell>
                  <TableCell align="center">Parent</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length > 0 ? (
                  data.map((row, index) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell align="left">{row.type}</TableCell>
                      <TableCell align="left">{row.parent}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <div />
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage2}
              page={page2}
              onChangePage={this.handleChangePage2}
              onChangeRowsPerPage={this.handleChangeRowsPerPage2}
              ActionsComponent={TablePaginationActions}
            />
          </div>
        </Paper> */}
        <Button onClick={this.handleOpenDialog}>show dialog</Button>
      </div>
    );
  }
}

export default DragAndDropTest;
