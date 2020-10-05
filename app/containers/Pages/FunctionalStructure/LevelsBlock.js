import React from 'react';
import MUIDataTable from 'mui-datatables';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  Button,
  IconButton,
  TableCell,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Typography,
  Tooltip
} from '@material-ui/core';
import interact from 'interactjs';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './levels-jss';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
import FunctionalStructureService from '../../Services/FunctionalStructureService';
import StaffService from '../../Services/StaffService';

class LevelsBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      levelId: '',
      staffs: [],
      staffAssigned: [],
      isDialogOpen: false
    };
  }

  columns = [
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true
      }
    },
    {
      name: 'description',
      label: 'Description',
      options: {
        filter: true
      }
    },
    {
      name: 'type',
      label: 'Level',
      options: {
        filter: true
      }
    },
    {
      label: 'Parent',
      name: 'parent',
      options: {
        customBodyRender: value => {
          console.log(value);
          if (value !== null) {
            return (
              <React.Fragment>
                <TableCell align="right">{value.name}</TableCell>
              </React.Fragment>
            );
          }
          return (
            <React.Fragment>
              <TableCell align="right">none</TableCell>
            </React.Fragment>
          );
        }
      }
    },
    {
      name: 'Staff',
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta) => (
          <React.Fragment>
            <Button onClick={() => this.handleOpenDialog(value, tableMeta)}>
              Show Staff
            </Button>
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

  handleOpenDialog = (value, tableMeta) => {
    const { data } = this.state;
    console.log(tableMeta);
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
      + tableMeta.rowIndex;
    console.log(data[index]);
    staffS;
    StaffService.getStaffsByLevel(data[index]).then(({ data }) => {
      this.setState({
        levelId: index,
        isDialogOpen: true,
        staffAssigned: data
      });
    });
  };

  handleClose = () => {
    this.setState({
      isDialogOpen: false
    });
  };

  handleSave = () => {
    const {
      data, staffAssigned, staffs, levelId
    } = this.state;
    const items = [staffAssigned, staffs];
    StaffService.assignLevelToStaff(data[levelId].levelId, items).then(() => {
      this.updateData();
    });
  };

  updateData = () => {
    FunctionalStructureService.getLevels().then(({ data }) => {
      this.setState({ data, isDialogOpen: false });
    });
    StaffService.getNotAssignedStaffs().then(({ data }) => {
      this.setState({ staffs: data });
      this.handleClose();
    });
  };

  render() {
    const {
      data, isDialogOpen, staffs, staffAssigned
    } = this.state;
    const { classes } = this.props;
    const options = {
      filter: true,
      selectableRows: 'none',
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
      customToolbar: () => (
        <CustomToolbar
          csvData={data}
          url="/app/hh-rr/functionalStructure/create-level"
          tooltip="add new Level"
        />
      )
    };

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
                      margin: 10
                    }}
                    id={`staffElement${index}`}
                  >
                    <Tooltip title={`${row.name}`}>
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
                      margin: 10
                    }}
                    id={`levelElement${index}`}
                  >
                    <Tooltip title={`${row.name}`}>
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
        <MUIDataTable
          title="The Levels List"
          data={data}
          columns={this.columns}
          options={options}
        />
      </div>
    );
  }
}
LevelsBlock.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LevelsBlock);
