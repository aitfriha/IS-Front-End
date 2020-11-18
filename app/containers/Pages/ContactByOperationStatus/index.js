import React from 'react';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'dan-components';
import brand from 'dan-api/dummy/brand';
import {
  Avatar,
  Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField, Typography, withStyles
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import styles from '../Staff/staff-jss';
import EditContact from '../Contact/editContact';
import ContactByOperationStatusBlock from './Block';
import AutoCompleteMultiLineDisabled from './AutoCompleteWithDisabled';
import {
  addCommercialOperationStatus, deleteCommercialOperationStatus,
  getAllCommercialOperationStatus, updateCommercialOperationStatus
} from '../../../redux/commercialOperationStatus/actions';
class ContactByOperationStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusName: '',
      createOrUpdate: true,
      contacts: [],
      statusDescription: '',
      openPopUp: false,
      c00: false,
      c01: false,
      c02: false,
      c03: false,
      c04: false,
      c05: false,
      c10: false,
      c11: false,
      c12: false,
      c20: false,
      c21: false,
      c22: false,
      buttonControle: true,
      operationName: '',
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { getAllCommercialOperationStatus } = this.props;
    getAllCommercialOperationStatus();
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleOpenDialog= ev => {
    this.setState({ openPopUp: true });
  };

  handleSubmitStatus = () => {
    const { statusName, statusDescription, contacts } = this.state;
    this.setState({ contacts: [...contacts, { statusName, statusDescription }], statusDescription: '', statusName: '' });
  };

  handleCancel = () => {
    this.setState({ createOrUpdate: true, statusDescription: '', statusName: '' });
  }

  handleClose = () => {
    this.setState({ openPopUp: false });
  };

  handleChangeSelectedStatus = (status) => {
    this.setState(
      {
        statusName: status.statusName,
        statusDescription: status.statusDescription,
        createOrUpdate: false,
        buttonControle: false,
      });
  };

  handleChangeState= (ev,value) => {
    this.setState(
      {
        buttonControle: false,
        operationName: value.name
      });
  }

   handleChangeCheck = (event) => {
     this.setState({ [event.target.name]: event.target.checked });
     console.log(event.target.value);
   };

   render() {
     const title = brand.name + ' - Contact by Operation';
     const description = brand.desc;
     const {
       contacts, createOrUpdate, statusName, statusDescription, openPopUp,
       c00, c01, c02, c03, c04, c05,
       c10, c11, c12,
       c20, c21, c22,
       buttonControle,
       operationName
     } = this.state;
     const {
       classes, allCommercialOperationStatus
     } = this.props;

     return (
       <div>
         <Helmet>
           <title>{title}</title>
           <meta name="description" content={description} />
           <meta property="og:title" content={title} />
           <meta property="og:description" content={description} />
           <meta property="twitter:title" content={title} />
           <meta property="twitter:description" content={description} />
         </Helmet>
         <PapperBlock title="Contact by Operation status" desc="" noMargin>
           <Grid
             container
             spacing={3}
             direction="row"
             justify="center"
             alignItems="center"
             alignContent="center"
           >
             <Grid
               item
               xs={12}
               md={5}
               style={{ display: 'flex' }}
             >
               <Typography variant="subtitle2" color="primary" style={{ width: '20%' }}>Status</Typography>
               <div style={{ width: '80%' }}>
                 <Autocomplete
                   id="combo-box-demo"
                   options={allCommercialOperationStatus}
                   getOptionLabel={option => option.name}
                   onChange={this.handleChangeState}
                   renderInput={params => (
                     <TextField
                       fullWidth
                       {...params}
                       label="Select the status"
                       variant="outlined"
                     />
                   )}
                 />
               </div>
             </Grid>
             <Grid
               item
               xs={12}
               md={5}
               style={{ display: 'flex' }}
             >
               <Typography variant="subtitle2" color="primary" style={{ width: '15%' }}>Description</Typography>
               <div style={{ width: '80%' }}>
                 <TextField
                   fullWidth
                   label="Description"
                   variant="outlined"
                   required
                   value={statusDescription}
                   name="statusDescription"
                   onChange={this.handleChange}
                 />
               </div>
             </Grid>
             <Grid
               item
               xs={12}
               md={5}
               style={{ display: 'flex' }}
             >
               <Typography variant="subtitle2" color="primary" style={{ width: '20%' }}>Contact type</Typography>
               <div style={{ width: '60%' }}>
                 {/* <AutoCompleteMultiLineDisabled data={data1} /> */}
                 <Button
                   disabled={buttonControle}
                   color="primary"
                   variant="contained"
                   size="small"
                   onClick={this.handleOpenDialog}
                 >
                Add contact Type
                 </Button>
               </div>
             </Grid>
             <Grid
               item
               xs={12}
               md={5}
               style={{ display: 'flex' }}
             />
           </Grid>
           <br />
           <Dialog
             open={openPopUp}
             keepMounted
             scroll="body"
             onClose={this.handleClose}
             aria-labelledby="alert-dialog-slide-title"
             aria-describedby="alert-dialog-slide-description"
             fullWidth
             maxWidth="xl"
           >
             <DialogTitle id="alert-dialog-slide-title"> Mondatory contact type for status : <span style={{ color: 'blue' }}>{operationName}</span></DialogTitle>
             <DialogContent dividers>
               <Grid
                 container
                 spacing={4}
                 direction="row"
               >
                 <Grid item xs={12} md={4}>
                   <Chip
                     label="Qualification Process Contacts"
                     avatar={<Avatar>1</Avatar>}
                     color="primary"
                   />
                   <Divider
                     variant="fullWidth"
                     style={{ marginBottom: '10px', marginTop: '10px' }}
                   />
                   <FormControl component="fieldset" className={classes.formControl}>
                     {/* <FormLabel component="legend">Qualification Process Contacts</FormLabel> */}
                     <FormGroup>
                       <FormControlLabel
                         control={<Checkbox checked={c00} onChange={this.handleChangeCheck} name="c00" value="contact of the decision-maker" />}
                         label="contact of the decision-maker"
                       />
                       <FormControlLabel
                         control={<Checkbox checked={c01} onChange={this.handleChangeCheck} name="c01" />}
                         label="contact of the technical leader"
                       />
                       <FormControlLabel
                         control={<Checkbox checked={c02} onChange={this.handleChangeCheck} name="c02" />}
                         label="contact of the person close to the decision-maker"
                       />
                       <FormControlLabel
                         control={<Checkbox checked={c03} onChange={this.handleChangeCheck} name="c03" />}
                         label="Other contact 1"
                       />
                       <FormControlLabel
                         control={<Checkbox checked={c04} onChange={this.handleChangeCheck} name="c04" />}
                         label="Other contact 2"
                       />
                       <FormControlLabel
                         control={<Checkbox checked={c05} onChange={this.handleChangeCheck} name="c05" />}
                         label="Other contact 3"
                       />
                     </FormGroup>
                     {/*  <FormHelperText>Be careful</FormHelperText> */}
                   </FormControl>
                 </Grid>
                 <Grid item xs={12} md={4}>
                   <Chip
                     label="Procurement Department"
                     avatar={<Avatar>2</Avatar>}
                     color="primary"
                   />
                   <Divider
                     variant="fullWidth"
                     style={{ marginBottom: '10px', marginTop: '10px' }}
                   />
                   <FormControl component="fieldset" className={classes.formControl}>
                     {/*     <FormLabel component="legend">Assign responsibility</FormLabel> */}
                     <FormGroup>
                       <FormControlLabel
                         control={<Checkbox checked={c10} onChange={this.handleChangeCheck} name="c10" />}
                         label="Contact 1"
                       />
                       <FormControlLabel
                         control={<Checkbox checked={c11} onChange={this.handleChangeCheck} name="c11" />}
                         label="Contact 2"
                       />
                       <FormControlLabel
                         control={<Checkbox checked={c12} onChange={this.handleChangeCheck} name="c12" />}
                         label="Contact 3"
                       />
                     </FormGroup>
                     {/* <FormHelperText>Be careful</FormHelperText> */}
                   </FormControl>
                 </Grid>
                 <Grid item xs={12} md={4}>
                   <Chip
                     label="Legal Area"
                     avatar={<Avatar>3</Avatar>}
                     color="primary"
                   />
                   <Divider
                     variant="fullWidth"
                     style={{ marginBottom: '10px', marginTop: '10px' }}
                   />
                   <FormControl component="fieldset" className={classes.formControl}>
                     {/* <FormLabel component="legend">Assign responsibility</FormLabel> */}
                     <FormGroup>
                       <FormControlLabel
                         control={<Checkbox checked={c20} onChange={this.handleChangeCheck} name="c20" />}
                         label="Contact 1"
                       />
                       <FormControlLabel
                         control={<Checkbox checked={c21} onChange={this.handleChangeCheck} name="c21" />}
                         label="Contact 2"
                       />
                       <FormControlLabel
                         control={<Checkbox checked={c22} onChange={this.handleChangeCheck} name="c22" />}
                         label="Contact 3"
                       />
                     </FormGroup>
                     {/* <FormHelperText>Be careful</FormHelperText> */}
                   </FormControl>
                 </Grid>
               </Grid>
             </DialogContent>
             <DialogActions>
               <Button color="secondary" onClick={this.handleClose}>
                Cancel
               </Button>
               <Button
                 variant="contained"
                 color="primary"
                 onClick={this.handleClose}
               >
                Add
               </Button>
             </DialogActions>
           </Dialog>
           <ContactByOperationStatusBlock onSelected={this.handleChangeSelectedStatus} contacts={contacts} />
         </PapperBlock>
       </div>
     );
   }
}
ContactByOperationStatus.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  classes: PropTypes.object.isRequired,
  getAllCommercialOperationStatus: PropTypes.func.isRequired,
  allCommercialOperationStatus: PropTypes.array.isRequired,
  commercialOperationStatusResponse: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  allCommercialOperationStatus: state.getIn(['commercialOperationStatus']).allCommercialOperationStatuss,
  commercialOperationStatusResponse: state.getIn(['commercialOperationStatus']).commercialOperationStatusResponse,
  isLoading: state.getIn(['commercialOperationStatus']).isLoading,
  errors: state.getIn(['commercialOperationStatus']).errors
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getAllCommercialOperationStatus,
}, dispatch);
export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ContactByOperationStatus)
);
