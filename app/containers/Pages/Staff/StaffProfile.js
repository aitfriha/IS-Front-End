import React, { Component } from 'react';
import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Avatar,
  withStyles,
  Typography,
  Paper,
  Tab,
  Tabs,
  Badge,
  Tooltip
} from '@material-ui/core';
import ProfilePicture from 'profile-picture';
import 'profile-picture/build/ProfilePicture.css';
import '../Configurations/map/app.css';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './staff-jss';
import FunctionalStructureService from '../../Services/FunctionalStructureService';
import avatarApi from '../../../api/images/avatars';
import StaffProfileEconomicContractInformation from './StaffProfileEconomicContractInformation';
import StaffProfileContractInformation from './StaffProfileContractInformation';
import StaffProfileGeneralInformation from './StaffProfileGeneralInformation';
import StaffService from '../../Services/StaffService';
import { setStaff } from '../../../redux/staff/actions';

const SmallAvatar = withStyles(theme => ({
  root: {
    width: 40,
    height: 40,
    border: `2px solid ${theme.palette.background.paper}`
  }
}))(Avatar);

export class StaffProfile extends Component {
  state = {
    value: 0,
    isOpenDocument: false,
    documentType: '',
    docExtension: '',
    numPages: null,
    pageNumber: 1,
    functionalStructureTree: {},
    isChangeProfilePic: false,
    photo: ''
  };

  profilePictureRef = React.createRef();

  componentDidMount() {
    const { staff } = this.props;
    const { functionalStructureTree } = this.state;
    if (staff.level && !functionalStructureTree.level1) {
      const { type } = staff.level;
      FunctionalStructureService.getLevelTree(staff.level.levelId).then(
        ({ data }) => {
          let tree = {};
          if (type === 'Level 1') {
            tree = {
              level1: data[0].name
            };
          } else if (type === 'Level 2') {
            tree = {
              level1: data[0].name,
              level2: data[1].name
            };
          } else if (type === 'Level 3') {
            tree = {
              level1: data[0].name,
              level2: data[1].name,
              level3: data[2].name
            };
          }
          this.setState({
            functionalStructureTree: tree
          });
        }
      );
    }
    this.setState({
      photo: staff.photo
    });
  }

  handleChange = (event, newValue) => {
    this.setState({
      value: newValue
    });
  };

  handleDownload = () => {
    const { staff } = this.props;
    const { documentType, docExtension } = this.state;
    let doc = null;
    let docName = null;
    if (documentType === 'contract') {
      doc = staff.staffContract.contractDoc;
      docName = `${staff.firstName}-${staff.fatherFamilyName}-${
        staff.motherFamilyName
      }_Contract`;
    } else if (documentType === 'internalRules') {
      doc = staff.staffContract.internalRulesDoc;
      docName = `${staff.firstName}-${staff.fatherFamilyName}-${
        staff.motherFamilyName
      }_Internal-Rules`;
    } else if (documentType === 'preContract') {
      doc = staff.staffContract.preContractDoc;
      docName = `${staff.firstName}-${staff.fatherFamilyName}-${
        staff.motherFamilyName
      }_PreContract`;
    } else if (documentType === 'ID Card') {
      doc = staff.staffDocuments.find(doc => doc.name === 'ID Card').document;
      docName = `${staff.firstName}-${staff.fatherFamilyName}-${
        staff.motherFamilyName
      }_ID_Card`;
    } else if (documentType === 'Passport') {
      doc = staff.staffDocuments.find(doc => doc.name === 'Passport').document;
      docName = `${staff.firstName}-${staff.fatherFamilyName}-${
        staff.motherFamilyName
      }_Passport`;
    } else if (documentType === 'Professional ID Card') {
      doc = staff.staffDocuments.find(
        doc => doc.name === 'Professional ID Card'
      ).document;
      docName = `${staff.firstName}-${staff.fatherFamilyName}-${
        staff.motherFamilyName
      }_Professional_ID_Card`;
    } else if (documentType === 'Health National Security Card') {
      doc = staff.staffDocuments.find(
        doc => doc.name === 'Health National Security Card'
      ).document;
      docName = `${staff.firstName}-${staff.fatherFamilyName}-${
        staff.motherFamilyName
      }_Health-National-Security-Card`;
    }

    const documentBase64 = this.fileToBase64(doc);
    const documentBlob = new Blob([documentBase64], {
      type: this.handleFileDataType(docExtension)
    });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(documentBlob);
    link.download = docName;
    link.click();
  };

  handleBack = () => {
    const { showProfile, staff } = this.props;
    showProfile(false, staff);
  };

  handleDialogClose = () => {
    this.setState({
      isOpenDocument: false
    });
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({
      numPages
    });
  };

  fileToBase64 = file => {
    const binaryString = window.atob(file);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      const ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  };

  handleFileDataType = ext => {
    switch (ext) {
      case 'pdf':
        return 'application/pdf';
      case 'jpg':
        return 'image/jpeg';
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'tiff':
        return 'image/tiff';
    }
  };

  renderFile = () => {
    const { staff } = this.props;
    const { documentType, docExtension } = this.state;
    switch (documentType) {
      case 'contract':
        return `data:${this.handleFileDataType(docExtension)};base64,${
          staff.staffContract.contractDoc
        }`;
      case 'internalRules':
        return `data:${this.handleFileDataType(docExtension)};base64,${
          staff.staffContract.internalRulesDoc
        }`;
      case 'preContract':
        return `data:${this.handleFileDataType(docExtension)};base64,${
          staff.staffContract.preContractDoc
        }`;
      case 'ID Card':
        return `data:${this.handleFileDataType(docExtension)};base64,${
          staff.staffDocuments.find(doc => doc.name === 'ID Card').document
        }`;
      case 'Passport':
        return `data:${this.handleFileDataType(docExtension)};base64,${
          staff.staffDocuments.find(doc => doc.name === 'Passport').document
        }`;
      case 'Professional ID Card':
        return `data:${this.handleFileDataType(docExtension)};base64,${
          staff.staffDocuments.find(doc => doc.name === 'Professional ID Card')
            .document
        }`;
      case 'Health National Security Card':
        return `data:${this.handleFileDataType(docExtension)};base64,${
          staff.staffDocuments.find(
            doc => doc.name === 'Health National Security Card'
          ).document
        }`;
      default:
        return '';
    }
  };

  handleClosePictureDialog = () => {
    this.setState({
      isChangeProfilePic: false
    });
  };

  handleOpenPictureDialog = () => {
    this.setState({
      isChangeProfilePic: true
    });
  };

  handleUpload = () => {
    const { staff, setStaffData } = this.props;
    // const PP = this.profilePicture.current;
    /* const imageData = PP.getData();
        const file = imageData.file; */
    const PP = this.profilePictureRef.current;
    const photo = PP.getImageAsDataUrl();

    const newStaff = {
      ...staff,
      photo
    };
    StaffService.updateStaff(
      staff.staffId,
      staff.address.city._id,
      newStaff
    ).then(({ data }) => {
      this.setState(
        {
          photo,
          isChangeProfilePic: false
        },
        () => {
          setStaffData(data);
        }
      );
    });
  };

  render() {
    const { classes, staff, isEdit } = this.props;
    const {
      value,
      isOpenDocument,
      numPages,
      pageNumber,
      functionalStructureTree,
      docExtension,
      isChangeProfilePic,
      photo
    } = this.state;
    return (
      <div>
        <Dialog
          maxWidth="lg"
          fullWidth
          scroll="paper"
          aria-labelledby="changeProfilePic"
          open={isOpenDocument}
          classes={{
            paper: classes.paper
          }}
        >
          <DialogTitle id="SaveFormula">Document preview</DialogTitle>
          <DialogContent>
            {docExtension === 'pdf' ? (
              <Document
                file={this.renderFile()}
                onLoadSuccess={this.onDocumentLoadSuccess}
                onLoadError={console.error}
              >
                <Page pageNumber={pageNumber} />
              </Document>
            ) : (
              <img src={this.renderFile()} alt="Document" />
            )}
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.handleDialogClose} color="primary">
              Close
            </Button>
            <Button onClick={this.handleDownload} color="primary">
              Download
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          maxWidth="xs"
          fullWidth
          aria-labelledby="changeProfilePic"
          open={isChangeProfilePic}
          classes={{
            paper: classes.paper
          }}
        >
          <DialogTitle id="SaveFormula">Change profile picture</DialogTitle>
          <DialogContent>
            <ProfilePicture
              ref={this.profilePictureRef}
              frameSize={1}
              frameFormat="circle"
              useHelper
              debug
            />
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={this.handleClosePictureDialog}
              color="primary"
            >
              Cancel
            </Button>
            <Button onClick={this.handleUpload} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
        <div>
          <IconButton onClick={() => this.handleBack()}>
            <KeyboardBackspaceIcon color="secondary" />
          </IconButton>
        </div>
        <Grid
          container
          spacing={4}
          direction="row"
          justify="center"
          alignItems="start"
        >
          <Grid
            item
            xs={4}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'start'
            }}
          >
            {' '}
            {isEdit ? (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Badge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  badgeContent={(
                    <Tooltip title="Change profile picture">
                      <SmallAvatar>
                        <Button
                          variant="contained"
                          onClick={this.handleOpenPictureDialog}
                          className={classes.badgeButton}
                        >
                          <EditRoundedIcon color="secondary" />
                        </Button>
                      </SmallAvatar>
                    </Tooltip>
                  )}
                >
                  <Avatar
                    alt="User Name"
                    src={photo}
                    className={classes.large}
                  />
                </Badge>
              </div>
            ) : (
              <Avatar
                alt="User Name"
                src={staff.photo ? staff.photo : avatarApi[6]}
                className={classes.large}
              />
            )}
            <div
              className={classes.divCenter}
              style={{ width: '100%', marginTop: 20 }}
            >
              <Typography
                variant="subtitle1"
                style={{
                  color: '#000',
                  fontFamily: 'sans-serif , Arial',
                  fontSize: '25px',
                  fontWeight: 'bold',
                  opacity: 0.6
                }}
              >
                {`${staff.firstName} ${staff.fatherFamilyName} ${
                  staff.motherFamilyName
                }`}
              </Typography>
            </div>
            <Paper
              elevation={2}
              style={{
                padding: 20,
                width: '100%',
                marginTop: 30
              }}
            >
              <Typography
                variant="subtitle1"
                style={{
                  fontFamily: 'sans-serif , Arial',
                  fontSize: '20px',

                  fontWeight: 'bold'
                }}
                color="primary"
              >
                Contact Data :
              </Typography>
              <div className={classes.divContactInline}>
                <Typography
                  variant="subtitle1"
                  style={{
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '17px',
                    marginTop: 10
                  }}
                  color="secondary"
                >
                  {'Personal phone :  '}
                </Typography>
                <Typography
                  variant="subtitle1"
                  style={{
                    color: '#000',
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '17px',
                    opacity: 0.7,
                    marginTop: 20
                  }}
                >
                  {staff.personalPhone}
                </Typography>
              </div>
              <div className={classes.divContactInline}>
                <Typography
                  variant="subtitle1"
                  style={{
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '17px'
                  }}
                  color="secondary"
                >
                  {'Company phone :  '}
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
                  {staff.companyPhone}
                </Typography>
              </div>
              <div className={classes.divContactInline}>
                <Typography
                  variant="subtitle1"
                  style={{
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '17px'
                  }}
                  color="secondary"
                >
                  {'Personal email :  '}
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
                  {staff.personalEmail}
                </Typography>
              </div>
              <div className={classes.divContactInline}>
                <Typography
                  variant="subtitle1"
                  style={{
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '17px'
                  }}
                  color="secondary"
                >
                  {'Company email :  '}
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
                  {staff.companyEmail}
                </Typography>
              </div>
              <div className={classes.divContactInline}>
                <Typography
                  variant="subtitle1"
                  style={{
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '17px'
                  }}
                  color="secondary"
                >
                  {'Skype :  '}
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
                  {staff.skype}
                </Typography>
              </div>
            </Paper>
            <Paper
              elevation={2}
              style={{
                padding: 20,
                width: '100%',
                height: '330px',
                marginTop: 15
              }}
            >
              <Typography
                variant="subtitle1"
                style={{
                  fontFamily: 'sans-serif , Arial',
                  fontSize: '20px',
                  fontWeight: 'bold'
                }}
                color="primary"
              >
                Functional Structure :
              </Typography>
              <div className={classes.divContactInline}>
                <Typography
                  variant="subtitle1"
                  style={{
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '17px',
                    marginTop: 10
                  }}
                  color="secondary"
                >
                  {staff.level
                    ? `Current Level : ${staff.level.type}`
                    : 'Level : none '}
                </Typography>
              </div>
              <div className={classes.divContactInline}>
                <Typography
                  variant="subtitle1"
                  style={{
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '17px',
                    marginTop: 4
                  }}
                  color="secondary"
                >
                  {`is Leader ? : ${staff.isLeader}`}
                </Typography>
              </div>
              <Typography
                variant="subtitle1"
                style={{
                  color: '#000',
                  fontFamily: 'sans-serif , Arial',
                  fontSize: '17px',
                  marginTop: 30
                }}
              >
                {functionalStructureTree.level1
                  ? `Level 1 : ${functionalStructureTree.level1}`
                  : 'Level 1 : none '}
              </Typography>
              <Typography
                variant="subtitle1"
                style={{
                  color: '#000',
                  fontFamily: 'sans-serif , Arial',
                  fontSize: '17px',
                  marginTop: 20,
                  marginLeft: 40
                }}
              >
                {functionalStructureTree.level2
                  ? `Level 2 : ${functionalStructureTree.level2}`
                  : 'Level 2 : none '}
              </Typography>
              <Typography
                variant="subtitle1"
                style={{
                  color: '#000',
                  fontFamily: 'sans-serif , Arial',
                  fontSize: '17px',
                  marginTop: 20,
                  marginLeft: 80
                }}
              >
                {functionalStructureTree.level3
                  ? `Level 3 : ${functionalStructureTree.level3}`
                  : 'Level 3 : none '}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <div style={{ display: 'table', height: '100%', width: '100%' }}>
              <div style={{ display: 'table-row', height: 0 }}>
                <Paper elevation={2}>
                  <Tabs
                    value={value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                  >
                    <Tab label="General Information" />
                    <Tab label="General Contract Information" />
                    <Tab label="Economic Contract Information" />
                  </Tabs>
                </Paper>
              </div>
              <div style={{ display: 'table-row', height: 15 }} />
              <div style={{ display: 'table-row' }}>
                <Paper
                  elevation={2}
                  style={{
                    padding: 50,
                    width: '100%',
                    height: '100%'
                  }}
                  id="1"
                  hidden={value !== 0}
                >
                  <StaffProfileGeneralInformation />
                </Paper>
                <Paper
                  elevation={2}
                  style={{
                    padding: 50,
                    width: '100%',
                    height: '100%'
                  }}
                  id="1"
                  hidden={value !== 1}
                >
                  <StaffProfileContractInformation data={staff} />
                </Paper>

                <Paper
                  elevation={2}
                  style={{
                    padding: 50,
                    width: '100%',
                    height: '100%'
                  }}
                  id="2"
                  hidden={value !== 2}
                >
                  <StaffProfileEconomicContractInformation
                    data={staff.staffEconomicContractInformation}
                  />
                </Paper>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

StaffProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  staff: PropTypes.object.isRequired,
  showProfile: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
  setStaffData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  staff: state.get('staffs').staff,
  isEdit: state.get('staffs').isEdit
});

const mapDispatchToProps = dispatch => ({
  setStaffData: bindActionCreators(setStaff, dispatch)
});

const StaffProfileMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(StaffProfile);

export default withStyles(styles)(StaffProfileMapped);
