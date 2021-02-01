import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

export const Confirmacion = (({ openConfirm, options, handleNoConfirm, handleYesConfirm }) => {

  return (
    <div>
      <Dialog
        open={openConfirm}
        keepMounted
        onClose={handleNoConfirm}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" style={{
          minHeight: 5,
          maxHeight: 5
        }}><Typography style={{
          fontSize: 15,
          fontWeight: 'bold',
          textAlign: 'center',
          padding: 3,
          color: '#000000'
        }}>{options.title}</Typography></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Typography style={{
              fontSize: 13,
              textAlign: 'center',
              padding: 3,
              color: '#000000'
            }}>{options.text}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" size="small" onClick={handleNoConfirm} color="default">
            No
          </Button>
          <Button variant="contained" size="small" onClick={handleYesConfirm} color="primary">
            Sí
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});