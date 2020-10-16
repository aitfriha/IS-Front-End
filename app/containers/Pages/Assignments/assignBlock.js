import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './assignment-jss';
import { format } from 'date-fns';
import {
  Table, TableBody,
  TableCell,
  TableHead, TableRow,
  Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

class AssignBlock extends React.Component {
  render() {
    const {
      classes, title, data
    } = this.props;
    console.log('AssignBlockAssignBlockAssignBlockAssignBlockAssignBlock')
    console.log(data)
    return (
      <React.Fragment>
        <Typography variant="subtitle2" component="h2" color="primary">
          {title}
        </Typography>
        <div className={classes.tableContent}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="right">Start Date</TableCell>
                <TableCell align="right">End Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.assignmentId}>
                  <TableCell component="th" scope="row">
                    {row.staff.name + ' ' + row.staff.name}
                  </TableCell>
                 {/* <TableCell align="right">{format(new Date(row.startDate), 'dd/MM/yyyy')}</TableCell>
                  <TableCell align="right">{ row.endDate ? format(new Date(row.endDate), 'dd/MM/yyyy') : '-' }</TableCell>*/}
                  <TableCell align="right">
                    <IconButton>
                      <DeleteIcon color="primary"/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </React.Fragment>
    );
  }
}
AssignBlock.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};
export default withStyles(styles)(AssignBlock);
