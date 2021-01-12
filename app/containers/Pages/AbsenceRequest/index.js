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
  makeStyles,
  Button
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { isString } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';
import Transition from '../../../components/Transition/transition';
import { ThemeContext } from '../../App/ThemeWrapper';
import styles from './absenceRequest-jss';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
import {
  getAllAbsenceRequest,
  deleteAbsenceRequest
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
    absenceRequestSelected: {}
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
      label: 'Request State',
      name: 'state',
      options: {
        filter: true
      }
    },
    {
      label: ' ',
      name: ' ',
      options: {
        customBodyRender: (value, tableMeta) => (
          <React.Fragment>
            <IconButton onClick={() => this.handleDeleteRequest(tableMeta)}>
              <DeleteIcon color="primary" />
            </IconButton>
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

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleDeleteRequest = tableMeta => {
    const { getAllAbsenceRequest, deleteAbsenceRequest } = this.props;
    const promise = new Promise(resolve => {
      deleteAbsenceRequest(tableMeta.rowData[0]);
      this.editingPromiseResolve = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        notification('success', result);
        getAllAbsenceRequest();
      } else {
        notification('danger', result);
      }
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
      docExtension
    } = this.state;
    const title = brand.name + ' - Staff absence requests';
    const { desc } = brand;
    const options = {
      filter: true,
      selectableRows: 'none',
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
      customToolbar: () => (
        <CustomToolbar
          csvData={allAbsenceRequest}
          url="/app/hh-rr/absenceRequest/create-absence-request"
          tooltip="create new absence request"
        />
      )
    };

    console.log(absenceRequestSelected && absenceRequestSelected.documentList);
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
          maxWidth="xs"
          TransitionComponent={Transition}
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
          TransitionComponent={Transition}
          fullWidth
          scroll="body"
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
    deleteAbsenceRequest
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
