import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import { isString } from 'lodash';
import notification from '../../../../components/Notification/Notification';


export class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => { };
    self = this;
  }

  handleYesConfirm() {
    const {
      changeStatusTravelRequest, getTravelRequests, changeStatusExpense, getExpenses, handleNoConfirm, options, data
    } = this.props;
    new Promise((resolve) => {
      const params = options.case === 'TRAVEL REQUEST' ? {
        travelRequestId: options.rowData.id,
        requestStatusMasterValue: options.status
      } : {
        expenseId: options.rowData.id,
        expenseStatusMasterValue: options.status
      };
      if (options.case === 'TRAVEL REQUEST') {
        // travel request change status action
        changeStatusTravelRequest(params);
      } else {
        // expense change status action
        changeStatusExpense(params);
      }
      this.editingPromiseResolve = resolve;
    }).then((result) => {
      handleNoConfirm();
      if (isString(result)) {
        // Fetch data
        if (options.case === 'TRAVEL REQUEST') {
          getTravelRequests(data);
        } else {
          getExpenses(data);
        }
        notification('success', result);
      } else {
        notification('danger', result);
      }
    });
  }


  render() {
    const {
      isLoading, errors, openConfirm, handleNoConfirm, options,
      travelRequestResponse, expenseResponse
    } = this.props;
    (!isLoading && (options.case === 'TRAVEL REQUEST' ? travelRequestResponse : expenseResponse)) && this.editingPromiseResolve((options.case === 'TRAVEL REQUEST' ? travelRequestResponse : expenseResponse));
    (!isLoading && (options.case === 'TRAVEL REQUEST' ? !travelRequestResponse : !expenseResponse)) && this.editingPromiseResolve(errors);
    return (
      <Dialog
        open={openConfirm}
        keepMounted
        onClose={handleNoConfirm}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          style={{
            minHeight: 5,
            maxHeight: 5
          }}
        >
          <Typography style={{
            fontSize: 15,
            fontWeight: 'bold',
            textAlign: 'center',
            padding: 3,
            color: '#000000'
          }}
          >
            {options.title}
          </Typography>
        </DialogTitle>
        <DialogContent style={{ marginTop: '10px' }}>
          <DialogContentText id="alert-dialog-slide-description">
            <Typography style={{
              fontSize: 13,
              textAlign: 'center',
              padding: 3,
              color: '#000000'
            }}
            >
              {options.text}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" size="small" onClick={handleNoConfirm} color="default">
            No
          </Button>
          <Button variant="contained" size="small" onClick={(e) => this.handleYesConfirm(e)} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
