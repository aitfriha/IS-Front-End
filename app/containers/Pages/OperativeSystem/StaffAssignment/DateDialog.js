import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Grid
} from '@material-ui/core';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


export const DateDialog = (({
  openDialog, dataDialog, handleCloseDateDialog, handleSaveDateDialog
}) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleClose = () => {
    handleCloseDateDialog();
  };

  const handleSave = () => {
    if (selectedDate) {
      dataDialog.date = selectedDate;
      handleSaveDateDialog(dataDialog);
    }
  };

  return (
    <Dialog
      open={openDialog}
      keepMounted
      disableBackdropClick
      disableEscapeKeyDown
      onClose={handleClose}
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
          {dataDialog.title}
        </Typography>
      </DialogTitle>
      <DialogContent style={{
        marginTop: '15px'
      }}
      >

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              allowKeyboardControl={false}
              disableToolbar
              variant="static"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker"
              minDate={dataDialog.minDate}
              maxDate={dataDialog.maxDate}
              value={selectedDate}
              onChange={handleDateChange}
              disableFuture={dataDialog.disableFuture}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}

            />
          </Grid>
        </MuiPickersUtilsProvider>

      </DialogContent>
      <DialogActions style={{ minWidth: 270, maxWidth: 270 }}>
        <Button variant="contained" size="small" onClick={handleClose} color="default">
          Cancel
          {/* {intl.formatMessage({ id: 'connection.row.body.no' })} */}
        </Button>
        <Button variant="contained" size="small" onClick={handleSave} color="primary">
          Save
          {/* } {intl.formatMessage({ id: 'connection.row.body.yes' })} */}
        </Button>
      </DialogActions>
    </Dialog>
  );
});
