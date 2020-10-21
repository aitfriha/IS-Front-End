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
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider
} from '@material-ui/core';
import Ionicon from 'react-ionicons';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import PropTypes from 'prop-types';
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';
import VisibilityIcon from '@material-ui/icons/Visibility';
import styles from './staff-jss';
import FunctionalStructureService from '../../Services/FunctionalStructureService';
import avatarApi from '../../../api/images/avatars';
import StaffProfileEconomicContractInformation from './StaffProfileEconomicContractInformation';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

export class StaffProfile extends Component {
  state = {
    value: 0,
    isOpenDocument: false,
    documentType: '',
    docExtension: '',
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
      FunctionalStructureService.getLevelTree(staff.level.levelId).then(
        ({ data }) => {
          console.log(data);
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
    console.log(staff.staffContract.contractDoc);
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

  handleOpenDialog = (documentType, docExtension) => {
    this.setState({
      isOpenDocument: true,
      documentType,
      docExtension
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

  render() {
    const { classes, staff } = this.props;
    const {
      value,
      isOpenDocument,
      numPages,
      pageNumber,
      functionalStructureTree,
      docExtension
    } = this.state;
    console.log(staff.staffDocuments);
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
                height: '300px',
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
                      marginTop: 10
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
                          {'Company :  '}
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
                          {staff.companyName}
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
                      marginTop: 10
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
                      marginTop: 10
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
                      marginTop: 10
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
                      marginTop: 10
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
                      marginTop: 10
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
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      marginTop: 10
                    }}
                    color="secondary"
                  >
                    Document :
                  </Typography>
                  <Table className={classes.table} aria-label="">
                    <TableHead>
                      <TableRow>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Number</TableCell>
                        <TableCell align="right">Expedition Date</TableCell>
                        <TableCell align="right">Expiration Date</TableCell>
                        <TableCell />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {staff.staffDocuments ? (
                        staff.staffDocuments.map(row => (
                          <TableRow key={row.staffDocumentsId}>
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="right">{row.number}</TableCell>
                            <TableCell align="right">
                              {row.expeditionDate}
                            </TableCell>
                            <TableCell align="right">
                              {row.expirationDate}
                            </TableCell>
                            <TableCell align="right">
                              <IconButton
                                onClick={() => this.handleOpenDialog(
                                  row.name,
                                  row.docExtension
                                )
                                }
                              >
                                <VisibilityIcon color="gray" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow />
                      )}
                    </TableBody>
                  </Table>
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
                          onClick={() => this.handleOpenDialog('contract', 'pdf')
                          }
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
                          onClick={() => this.handleOpenDialog('internalRules', 'pdf')
                          }
                        >
                          {`${staff.firstName}-${staff.fatherFamilyName}-${
                            staff.motherFamilyName
                          }_Internal-Rules`}
                        </Button>
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
                          {'PreContract :  '}
                        </Typography>
                        <Button
                          variant="subtitle1"
                          className={classes.buttonLink}
                          onClick={() => this.handleOpenDialog('preContract', 'pdf')
                          }
                        >
                          {`${staff.firstName}-${staff.fatherFamilyName}-${
                            staff.motherFamilyName
                          }_PreContract`}
                        </Button>
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
  showProfile: PropTypes.func.isRequired
};

export default withStyles(styles)(StaffProfile);
