import React, { Component } from 'react';
import {
  Grid,
  FormControl,
  TextField,
  Button,
  Collapse,
  Badge,
  Tooltip,
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
  Tabs
} from '@material-ui/core';
import Ionicon from 'react-ionicons';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import PropTypes from 'prop-types';
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';
import styles from './staff-jss';
import FunctionalStructureConfigService from '../../Services/FunctionalStructureConfigService';
import avatarApi from '../../../api/images/avatars';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

export class StaffProfile extends Component {
  state = {
    value: 0,
    isOpenDocument: false,
    documentType: '',
    numPages: null,
    pageNumber: 1,
    functionalStructureTree: {}
  };

  componentDidMount() {
    const { staff } = this.props;
    const { functionalStructureTree } = this.state;
    if (staff.level && !functionalStructureTree.level1) {
      const { type } = staff.level;
      console.log(type);
      if (type === 'Level 1') {
        this.setState({
          functionalStructureTree: { level1: staff.level.name }
        });
      } else if (type === 'Level 2') {
        const tree = {
          level1: staff.level.parent.name,
          level2: staff.level.name
        };
        this.setState({
          functionalStructureTree: tree
        });
      } else if (type === 'Level 3') {
        FunctionalStructureConfigService.getLevelConfigByLevel3(
          staff.level.name
        ).then(({ data }) => {
          console.log(data);
          this.setState({
            functionalStructureTree: data[0]
          });
        });
      }
    }
    console.log(staff.staffContract.contractDoc);
  }

  handleChange = (event, newValue) => {
    this.setState({
      value: newValue
    });
  };

  handleDownload = () => {
    const { staff } = this.props;
    const { documentType } = this.state;
    let doc = null;
    let docName = null;
    if (documentType === 'contract') {
      doc = staff.staffContract.contractDoc;
      docName = `${staff.firstName}-${staff.fatherFamilyName}-${
        staff.motherFamilyName
      }_Contract`;
    } else {
      doc = staff.staffContract.internalRulesDoc;
      docName = `${staff.firstName}-${staff.fatherFamilyName}-${
        staff.motherFamilyName
      }_Internal-Rules`;
    }
    const documentBase64 = this.fileToBase64(doc);

    const documentBlob = new Blob([documentBase64], {
      type: 'application/pdf'
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

  handleOpenDialog = documentType => {
    this.setState({
      isOpenDocument: true,
      documentType
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

  render() {
    const { classes, staff } = this.props;
    const {
      value,
      isOpenDocument,
      documentType,
      numPages,
      pageNumber,
      functionalStructureTree
    } = this.state;
    console.log(functionalStructureTree);
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
            <div>
              <Document
                file={`data:application/pdf;base64,${
                  documentType === 'contract'
                    ? staff.staffContract.contractDoc
                    : staff.staffContract.internalRulesDoc
                }`}
                onLoadSuccess={this.onDocumentLoadSuccess}
                onLoadError={console.error}
              >
                <Page pageNumber={pageNumber} />
              </Document>
            </div>
            <div>
              Page
              {' '}
              {pageNumber}
              {' '}
of
              {' '}
              {numPages}
            </div>
            <div>
              Page
              {' '}
              {pageNumber}
              {' '}
of
              {' '}
              {numPages}
            </div>
            <div>
              Page
              {' '}
              {pageNumber}
              {' '}
of
              {' '}
              {numPages}
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleDownload} color="primary">
              Download
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
            <Avatar
              alt="User Name"
              src={staff.photo ? staff.photo : avatarApi[6]}
              className={classes.large}
            />
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
              style={{ padding: 20, width: '100%', marginTop: 30 }}
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
                    marginTop: 20
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
              style={{ padding: 20, width: '100%', marginTop: 15 }}
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
              <Typography
                variant="subtitle1"
                style={{
                  color: '#000',
                  fontFamily: 'sans-serif , Arial',
                  fontSize: '17px',
                  marginTop: 10
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
                  marginTop: 10,
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
                  marginTop: 10,
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
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '20px',
                      fontWeight: 'bold'
                    }}
                    color="secondary"
                  >
                    Personal Information :
                  </Typography>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'Left',
                      width: '100%',
                      marginTop: 20
                    }}
                  >
                    <div className={classes.divInline}>
                      <Avatar>
                        <Ionicon icon="md-person" />
                      </Avatar>
                      <div style={{ marginLeft: 20 }}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px'
                          }}
                          color="secondary"
                        >
                          {'Name :  '}
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
                          {`${staff.firstName} ${staff.fatherFamilyName} ${
                            staff.motherFamilyName
                          }`}
                        </Typography>
                      </div>
                    </div>
                    <div className={classes.divInline}>
                      <Avatar>
                        <Ionicon icon="md-calendar" />
                      </Avatar>
                      <div style={{ marginLeft: 20 }}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px'
                          }}
                          color="secondary"
                        >
                          {'Birthday :  '}
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
                          {staff.birthday}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'Left',
                      width: '100%',
                      marginTop: 20
                    }}
                  >
                    <div className={classes.divInline}>
                      <Avatar>
                        <Ionicon icon="md-map" />
                      </Avatar>
                      <div style={{ marginLeft: 20 }}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px'
                          }}
                          color="secondary"
                        >
                          {'Birth Country :  '}
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
                          {staff.birthCountry}
                        </Typography>
                      </div>
                    </div>
                    <div className={classes.divInline}>
                      <Avatar>
                        <Ionicon icon="md-map" />
                      </Avatar>
                      <div style={{ marginLeft: 20 }}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px'
                          }}
                          color="secondary"
                        >
                          {'Residence Country :  '}
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
                          {staff.address.city.stateCountry.country.countryName}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'Left',
                      width: '100%',
                      marginTop: 20
                    }}
                  >
                    <div className={classes.divInline}>
                      <Avatar>
                        <Ionicon icon="md-alert" />
                      </Avatar>
                      <div style={{ marginLeft: 20 }}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px'
                          }}
                          color="secondary"
                        >
                          {'Emergency Contact Name :  '}
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
                          {staff.emergencyContactName}
                        </Typography>
                      </div>
                    </div>
                    <div className={classes.divInline}>
                      <Avatar>
                        <Ionicon icon="md-alert" />
                      </Avatar>
                      <div style={{ marginLeft: 20 }}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px'
                          }}
                          color="secondary"
                        >
                          {'Emergency Contact Phone :  '}
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
                          {staff.emergencyContactPhone}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      marginTop: 20
                    }}
                    color="secondary"
                  >
                    Address :
                  </Typography>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'Left',
                      width: '100%',
                      marginTop: 20
                    }}
                  >
                    <div className={classes.divInline}>
                      <Avatar>
                        <Ionicon icon="md-locate" />
                      </Avatar>
                      <div style={{ marginLeft: 20 }}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px'
                          }}
                          color="secondary"
                        >
                          {'Address :  '}
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
                          {staff.address.address}
                        </Typography>
                      </div>
                    </div>
                    <div className={classes.divInline}>
                      <Avatar>
                        <Ionicon icon="md-locate" />
                      </Avatar>
                      <div style={{ marginLeft: 20 }}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px'
                          }}
                          color="secondary"
                        >
                          {'Post code :  '}
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
                          {staff.address.postCode}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'Left',
                      width: '100%',
                      marginTop: 20
                    }}
                  >
                    <div className={classes.divInline}>
                      <Avatar>
                        <Ionicon icon="md-locate" />
                      </Avatar>
                      <div style={{ marginLeft: 20 }}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px'
                          }}
                          color="secondary"
                        >
                          {'City :  '}
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
                          {staff.address.city.cityName}
                        </Typography>
                      </div>
                    </div>
                    <div className={classes.divInline}>
                      <Avatar>
                        <Ionicon icon="md-locate" />
                      </Avatar>
                      <div style={{ marginLeft: 20 }}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px'
                          }}
                          color="secondary"
                        >
                          {'State :  '}
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
                          {staff.address.city.stateCountry.stateName}
                        </Typography>
                      </div>
                    </div>
                  </div>
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
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '20px',
                      fontWeight: 'bold'
                    }}
                    color="secondary"
                  >
                    General Information :
                  </Typography>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'Left',
                      width: '100%',
                      marginTop: 20
                    }}
                  >
                    <div className={classes.divInline}>
                      <Avatar>
                        <Ionicon icon="md-desktop" />
                      </Avatar>
                      <div style={{ marginLeft: 20 }}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px'
                          }}
                          color="secondary"
                        >
                          {'Associate Office :  '}
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
                          {staff.staffContract.associateOffice}
                        </Typography>
                      </div>
                    </div>
                    <div className={classes.divInline}>
                      <Avatar>
                        <Ionicon icon="md-map" />
                      </Avatar>
                      <div style={{ marginLeft: 20 }}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px'
                          }}
                          color="secondary"
                        >
                          {'Hiring Country :  '}
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
                          {staff.staffContract.hiringCountry}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'Left',
                      width: '100%',
                      marginTop: 20
                    }}
                  >
                    <div className={classes.divInline}>
                      <Avatar>
                        <Ionicon icon="md-locate" />
                      </Avatar>
                      <div style={{ marginLeft: 20 }}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px'
                          }}
                          color="secondary"
                        >
                          {'Town Country :  '}
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
                          {staff.staffContract.townContract}
                        </Typography>
                      </div>
                    </div>
                    <div className={classes.divInline}>
                      <Avatar>
                        <Ionicon icon="md-person" />
                      </Avatar>
                      <div style={{ marginLeft: 20 }}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px'
                          }}
                          color="secondary"
                        >
                          {'Personal Number :  '}
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
                          {staff.staffContract.personalNumber}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'Left',
                      width: '100%',
                      marginTop: 20
                    }}
                  >
                    <div className={classes.divInline}>
                      <Avatar>
                        <Ionicon icon="md-calendar" />
                      </Avatar>
                      <div style={{ marginLeft: 20 }}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px'
                          }}
                          color="secondary"
                        >
                          {'High Date :  '}
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
                          {staff.staffContract.highDate}
                        </Typography>
                      </div>
                    </div>
                    <div className={classes.divInline}>
                      <Avatar>
                        <Ionicon icon="md-calendar" />
                      </Avatar>
                      <div style={{ marginLeft: 20 }}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px'
                          }}
                          color="secondary"
                        >
                          {'Low Date :  '}
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
                          {staff.staffContract.lowDate}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'Left',
                      width: '100%',
                      marginTop: 20
                    }}
                  >
                    <div className={classes.divInline}>
                      <Avatar>
                        <Ionicon icon="md-calendar" />
                      </Avatar>
                      <div style={{ marginLeft: 20 }}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px'
                          }}
                          color="secondary"
                        >
                          {'Registration Date :  '}
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
                          {staff.staffContract.registrationDate}
                        </Typography>
                      </div>
                    </div>
                    <div className={classes.divInline}>
                      <Avatar>
                        <Ionicon icon="md-calendar" />
                      </Avatar>
                      <div style={{ marginLeft: 20 }}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px'
                          }}
                          color="secondary"
                        >
                          {'PreContract Date :  '}
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
                          {staff.staffContract.preContractDate}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      marginTop: 20
                    }}
                    color="secondary"
                  >
                    Document :
                  </Typography>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'Left',
                      width: '100%',
                      marginTop: 20
                    }}
                  >
                    <div className={classes.divInline}>
                      <Avatar>
                        <Ionicon icon="md-document" />
                      </Avatar>
                      <div style={{ marginLeft: 20 }}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px'
                          }}
                          color="secondary"
                        >
                          {'Contract :  '}
                        </Typography>
                        <Button
                          variant="subtitle1"
                          className={classes.buttonLink}
                          onClick={() => this.handleOpenDialog('contract')}
                        >
                          {`${staff.firstName}-${staff.fatherFamilyName}-${
                            staff.motherFamilyName
                          }_Contract`}
                        </Button>
                      </div>
                    </div>
                    <div className={classes.divInline}>
                      <Avatar>
                        <Ionicon icon="md-document" />
                      </Avatar>
                      <div style={{ marginLeft: 20 }}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px'
                          }}
                          color="secondary"
                        >
                          {'Internal Rules :  '}
                        </Typography>
                        <Button
                          variant="subtitle1"
                          className={classes.buttonLink}
                          onClick={() => this.handleOpenDialog('internalRules')}
                        >
                          {`${staff.firstName}-${staff.fatherFamilyName}-${
                            staff.motherFamilyName
                          }_Internal-Rules`}
                        </Button>
                      </div>
                    </div>
                  </div>
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
  showProfile: PropTypes.func.isRequired
};

export default withStyles(styles)(StaffProfile);
