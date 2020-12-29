import React, { useContext } from 'react';
import MUIDataTable from 'mui-datatables';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'dan-components';
import brand from 'dan-api/dummy/brand';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  makeStyles,
  Button,
  Tooltip,
  Typography
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import HourglassEmptyOutlinedIcon from '@material-ui/icons/HourglassEmptyOutlined';
import { isString } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';
import { ThemeContext } from '../../App/ThemeWrapper';
import styles from './absenceRequest-jss';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
import {
  getAllAbsenceRequest,
  updateAbsenceRequest
} from '../../../redux/absenceRequest/actions';
import notification from '../../../components/Notification/Notification';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

const useStyles = makeStyles(styles);

class AbsenceRequest extends React.Component {
  state = {
    isOpenDocument: false,
    isOpenDocumentsList: false,
    docExtension: '',
    docIndex: 0,
    pageNumber: 1,
    absenceRequestSelected: {},
    responseType: '',
    isRespondDialog: false,
    selectedRequestId: '',
    isConfirmProcess: false
  };

  editingPromiseResolve = () => {};

  columns = [
    {
      name: 'absenceRequestId',
      label: 'Absence Request Id',
      options: {
        display: false,
        filter: false
      }
    },
    {
      name: 'state',
      label: '',
      options: {
        customBodyRender: (value, tableMeta) => (
          <React.Fragment>{this.renderStateAvatar(value)}</React.Fragment>
        )
      }
    },
    {
      name: 'absenceTypeName',
      label: 'Absence Type',
      options: {
        filter: true
      }
    },
    {
      label: 'Staff',
      name: 'staffName',
      options: {
        filter: true
      }
    },
    {
      label: 'Start Date',
      name: 'startDate',
      options: {
        filter: true
      }
    },
    {
      label: 'End Date',
      name: 'endDate',
      options: {
        filter: true
      }
    },
    {
      label: 'Absence Days',
      name: 'absenceDays',
      options: {
        filter: true
      }
    },
    {
      label: 'Absence Hours Rate',
      name: 'hourRate',
      options: {
        filter: true
      }
    },
    {
      label: 'Document',
      name: 'documentList',
      options: {
        customBodyRender: (value, tableMeta) => (
          <React.Fragment>
            {value && value[0] ? (
              <IconButton
                onClick={() => this.handleOpenDocumentListDialog(tableMeta)}
              >
                <VisibilityIcon color="secondary" />
              </IconButton>
            ) : (
              <div>-</div>
            )}
          </React.Fragment>
        )
      }
    },
    {
      label: ' ',
      name: 'state',
      options: {
        customBodyRender: (value, tableMeta) => (
          <React.Fragment>
            {value === 'In progress' && (
              <div>
                <Tooltip title="Accept">
                  <IconButton
                    onClick={() => this.handleOpenRespondDialog(tableMeta, 'Accept')
                    }
                  >
                    <DoneIcon color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Reject">
                  <IconButton
                    onClick={() => this.handleOpenRespondDialog(tableMeta, 'Reject')
                    }
                  >
                    <ClearIcon color="primary" />
                  </IconButton>
                </Tooltip>
              </div>
            )}
          </React.Fragment>
        )
      }
    }
  ];

  componentDidMount() {
    const { changeTheme, getAllAbsenceRequest } = this.props;
    changeTheme('blueCyanTheme');
    getAllAbsenceRequest();
  }

  renderStateAvatar = state => {
    if (state === 'In progress') {
      return (
        <Avatar style={{ backgroundColor: '#67615A' }}>
          <HourglassEmptyOutlinedIcon />
        </Avatar>
      );
    }
    if (state === 'Accepted') {
      return (
        <Avatar style={{ backgroundColor: '#008000' }}>
          <DoneIcon />
        </Avatar>
      );
    }
    if (state === 'Rejected') {
      return (
        <Avatar style={{ backgroundColor: '#F10006' }}>
          <ClearIcon />
        </Avatar>
      );
    }
  };

  handleOpenRespondDialog = (tableMeta, responseType) => {
    this.setState({
      isRespondDialog: true,
      responseType,
      selectedRequestId: tableMeta.rowData[0]
    });
  };

  handleUpdateRequest = () => {
    const { getAllAbsenceRequest, updateAbsenceRequest } = this.props;
    const { responseType, selectedRequestId } = this.state;
    let absenceRequest = {};
    this.setState({
      isConfirmProcess: true
    });
    if (responseType === 'Accept') {
      absenceRequest = {
        absenceRequestId: selectedRequestId,
        state: 'Accepted'
      };
    } else if (responseType === 'Reject') {
      absenceRequest = {
        absenceRequestId: selectedRequestId,
        state: 'Rejected'
      };
    }

    const promise = new Promise(resolve => {
      console.log('execute update');
      updateAbsenceRequest(absenceRequest);
      this.editingPromiseResolve = resolve;
    });
    promise.then(result => {
      console.log('result');
      console.log(result);
      if (isString(result)) {
        notification('success', result);
        getAllAbsenceRequest();
        this.handleCloseResponseDialog();
      } else {
        notification('danger', result);
      }
      this.setState({
        isConfirmProcess: false
      });
    });
  };

  handleOpenDocumentDialog = index => {
    const { absenceRequestSelected } = this.state;
    console.log(absenceRequestSelected);
    this.setState({
      isOpenDocument: true,
      docExtension: absenceRequestSelected.docExtensionList[index],
      docIndex: index
    });
  };

  handleOpenDocumentListDialog = tableMeta => {
    const { allAbsenceRequest } = this.props;
    const absenceRequestSelected = allAbsenceRequest.filter(
      absenceRequest => absenceRequest.absenceRequestId === tableMeta.rowData[0]
    )[0];
    this.setState({
      isOpenDocumentsList: true,
      absenceRequestSelected
    });
  };

  handleCloseDocumentListDialog = () => {
    this.setState({
      isOpenDocumentsList: false,
      absenceRequestSelected: {}
    });
  };

  handleCloseDocumentDialog = () => {
    this.setState({
      isOpenDocument: false,
      docExtension: '',
      docIndex: 0
    });
  };

  handleCloseResponseDialog = () => {
    this.setState({
      isRespondDialog: false
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
    const { absenceRequestSelected, docExtension, docIndex } = this.state;
    console.log(docExtension);
    return `data:${this.handleFileDataType(docExtension)};base64,${
      absenceRequestSelected.documentList[docIndex]
    }`;
  };

  handleDownload = () => {
    const { absenceRequestSelected, docIndex, docExtension } = this.state;
    const doc = absenceRequestSelected.documentList[docIndex];
    const docName = `${absenceRequestSelected.name}_Document`;

    const documentBase64 = this.fileToBase64(doc);
    const documentBlob = new Blob([documentBase64], {
      type: this.handleFileDataType(docExtension)
    });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(documentBlob);
    link.download = docName;
    link.click();
  };

  render() {
    const {
      classes,
      allAbsenceRequest,
      isLoadingAbsenceRequest,
      absenceRequestResponse,
      errorAbsenceRequest
    } = this.props;
    const {
      pageNumber,
      isOpenDocumentsList,
      isOpenDocument,
      absenceRequestSelected,
      docExtension,
      responseType,
      isRespondDialog,
      isConfirmProcess
    } = this.state;
    const title = brand.name + ' - Absence Consult';
    const { desc } = brand;
    const options = {
      filter: true,
      selectableRows: 'none',
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10
    };
    !isLoadingAbsenceRequest
      && absenceRequestResponse
      && this.editingPromiseResolve(absenceRequestResponse);
    !isLoadingAbsenceRequest
      && !absenceRequestResponse
      && this.editingPromiseResolve(errorAbsenceRequest);
    console.log(allAbsenceRequest);
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={desc} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={desc} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={desc} />
        </Helmet>
        <Dialog
          open={isRespondDialog}
          onClose={this.handleCloseResponseDialog}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-title">{`${responseType} absence request`}</DialogTitle>
          <DialogContent>
            <Typography
              variant="subtitle1"
              style={{
                fontFamily: 'sans-serif , Arial',
                fontSize: '17px'
              }}
            >
              {`Are you sure you want to ${responseType} this absence request?`}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              color="primary"
              onClick={this.handleCloseResponseDialog}
              disabled={isConfirmProcess}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={this.handleUpdateRequest}
              disabled={isConfirmProcess}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          maxWidth="xs"
          fullWidth
          scroll="paper"
          aria-labelledby="changeProfilePic"
          open={isOpenDocumentsList}
          classes={{
            paper: classes.paper
          }}
        >
          <DialogTitle id="docList">List of docuemnts</DialogTitle>
          <DialogContent>
            {absenceRequestSelected && absenceRequestSelected.documentList && (
              <div
                style={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}
              >
                {absenceRequestSelected.documentList.map((doc, index) => (
                  <IconButton
                    onClick={() => this.handleOpenDocumentDialog(index)}
                  >
                    <VisibilityIcon color="secondary" />
                  </IconButton>
                ))}
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={this.handleCloseDocumentListDialog}
              color="primary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
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
            {absenceRequestSelected && docExtension !== '' ? (
              docExtension === 'pdf' ? (
                <Document
                  file={this.renderFile()}
                  onLoadSuccess={this.onDocumentLoadSuccess}
                  onLoadError={console.error}
                >
                  <Page pageNumber={pageNumber} />
                </Document>
              ) : (
                <img src={this.renderFile()} alt="Document" />
              )
            ) : (
              <div />
            )}
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={this.handleCloseDocumentDialog}
              color="primary"
            >
              Close
            </Button>
            <Button onClick={this.handleDownload} color="primary">
              Download
            </Button>
          </DialogActions>
        </Dialog>
        <PapperBlock
          title="Staff Absence Requests"
          icon="ios-paper-outline"
          noMargin
        >
          <MUIDataTable
            title=""
            data={allAbsenceRequest}
            columns={this.columns}
            options={options}
          />
        </PapperBlock>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allAbsenceRequest: state.getIn(['absenceRequests']).allAbsenceRequest,
  absenceRequestResponse: state.getIn(['absenceRequests'])
    .absenceRequestResponse,
  isLoadingAbsenceRequest: state.getIn(['absenceRequests']).isLoading,
  errorAbsenceRequest: state.getIn(['absenceRequests']).errors
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getAllAbsenceRequest,
    updateAbsenceRequest
  },
  dispatch
);

const AbsenceRequestMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(AbsenceRequest);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <AbsenceRequestMapped changeTheme={changeTheme} classes={classes} />;
};
