import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import IconButton from '@material-ui/core/IconButton';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode'
import DescriptionIcon from '@material-ui/icons/Description';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { Group, FolderSpecial, Edit, Close, Image, Audiotrack, Movie, InsertComment, MoveToInbox, LocalOffer, Add, Archive, Publish, PictureAsPdf, GetApp, Delete, Info, MoreHoriz, Share, HomeIcon, ViewList, Dehaze, Toc, AssignmentInd, Restore, Grade, Folder, FolderOpen, FolderShared, History, HourglassEmpty, Search, PermMedia, Favorite, LibraryBooks, Assignment, DeleteSweep, Dvr } from '@material-ui/icons';


export const CreateDocumentDialog = (({ openConfirm, options, handleNoConfirm, handleYesConfirm, color}) => {

  const [state, setState] = React.useState({
    btndisabled: true,
    value: options.denom,
    error: options.error,
    errorMessage: options.errorMessage,
    btndisabled: false,
    value1: options.descrip,
    error1: false,
    errorMessage1: ''
  });

  React.useEffect(() => {
    setState({
      btndisabled: true,
      value: options.denom,
      error: options.error,
      errorMessage: options.errorMessage,
      value1: options.descrip,
      error1: state.error1,
      errorMessage1: state.errorMessage1
    })
  }, [options])

  const DevuelveIconselect = (tipo) => {
    //console.log(tipo);
    switch (tipo) {
      case 'Folder': {
        return <Folder style={{ color: '#FFFFFF', marginRight: '5px' }} />;
        break;
      }
      case 'Documento': {
        return <DescriptionIcon style={{ color: '#FFFFFF', marginRight: '5px' }} />;
        break;
      }
      case 'Nota': {
        return <InsertDriveFileIcon style={{ color: '#FFFFFF', marginRight: '5px' }} />;
        break;
      }
      case 'Hoja de Cálculo': {
        return <ChromeReaderModeIcon style={{ color: '#FFFFFF', marginRight: '5px' }} />;
        break;
      }
      case 'Presentación': {
        return <Dvr style={{ color: '#FFFFFF', marginRight: '5px' }} />;
        break;
      }
      case 'Espacio de GT': {
        return <FolderSpecial style={{ color: '#FFFFFF', marginRight: '5px' }} />;
        break;
      }
      case 'Grupo': {
        return <Group style={{ color: '#FFFFFF', marginRight: '5px' }} />;
        break;
      }
      default: {
        return <Edit style={{ color: '#FFFFFF', marginRight: '5px', paddingtop: '0px', marginTop: '0px' }} />;
        break;
      }
    }
  }

  function setValueDenom(e) {
    var error = (e.target.value === null || e.target.value === "") ? true : false;
    var errorMessage = (e.target.value === null || e.target.value === "") ? 'Campo obligatorio' : null;
    var value = !error ? e.target.value : '';
    var disable = ((!error && value !== "") && (!state.error1 && state.value1 !== "")) ? false : true;
    setState({
      btndisabled: disable,
      value: value,
      error: error,
      errorMessage: errorMessage,
      value1: state.value1,
      error1: state.error1,
      errorMessage1: state.errorMessage1,
    })
  }

  function setValueDescrip(e) {
    var error1 = (e.target.value === null || e.target.value === "") ? true : false;
    var errorMessage1 = (e.target.value === null || e.target.value === "") ? 'Campo obligatorio' : null;
    var value1 = !error1 ? e.target.value : '';
    var disable = ((!state.error && state.value !== "") && (!error1 && value1 !== "")) ? false : true;
    setState({
      btndisabled: disable,
      value: state.value,
      error: state.error,
      errorMessage: state.errorMessage,
      value1: value1,
      error1: error1,
      errorMessage1: errorMessage1,
    })
  }

  const crearArchivo = () => {
    setState({
      btndisabled: true,
    })
    var data = {
      denominacion: state.value,
      descripcion: state.value1,
    }
    handleYesConfirm(data);
  }

  return (
    <div>
      <Dialog
        open={openConfirm}
        keepMounted
        disableBackdropClick
        //onClose={handleNoConfirm}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" style={{
          minHeight: '10px',
          maxHeight: '50px',
          marginBottom: '5px',
          paddingTop: '5px',
          paddingBottom: '5px',
          backgroundColor: color
        }} disableTypography onClose={handleNoConfirm}
        ><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {DevuelveIconselect(options.tipo)}
              <Typography style={{
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'left',
                marginTop: '3px',
                color: '#FFFFFF',
              }}>{options.title}</Typography>
            </div>
            <IconButton onClick={handleNoConfirm}>
              <Close style={{ color: '#FFFFFF', fontSize: '18px' }} />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <FormControl style={{ width: '300px' }}>
              <FormGroup>
                <TextField
                 // variant="outlined"
                  id="denominacion"
                  label="Denominación"
                  style={{ marginTop: '20px', marginBottom: '7px' }}
                  error={state.error}
                  value={state.value}
                  helperText={state.errorMessage}
                  //fullWidth
                  size="small"
                  onChange={(e) => setValueDenom(e)}
                />
              </FormGroup>
              <FormGroup>
                <TextField
                 // variant="outlined"
                  id="descripcion"
                  label="Descripción"
                  error={state.error1}
                  value={state.value1}
                  helperText={state.errorMessage1}
                  style={{ marginTop: '10px', marginBottom: '7px' }}
                  size="small"
                  onChange={(e) => setValueDescrip(e)}
                />
              </FormGroup>
            </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" size="small" onClick={handleNoConfirm} color="primary">
            Cancelar
          </Button>
          <Button variant="contained" size="small" onClick={crearArchivo} color="primary" disabled={state.btndisabled} 
          style={{ width: '100px', height: '33px' }}
          >
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
});