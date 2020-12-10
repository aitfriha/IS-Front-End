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
  TextField,
  makeStyles,
  Button,
  Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PublishIcon from '@material-ui/icons/Publish';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { isString } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';
import { ThemeContext } from '../../App/ThemeWrapper';
import styles from './absenceType-jss';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
import {
  getAllAbsenceType,
  updateAbsenceType,
  deleteAbsenceType
} from '../../../redux/absenceType/actions';
import { getAllStaff } from '../../../redux/staff/actions';
import notification from '../../../components/Notification/Notification';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

const useStyles = makeStyles(styles);

const inputDoc = React.createRef();

const extList = ['pdf', 'jpg', 'jpeg', 'png', 'tiff'];

class AbsenceType extends React.Component {
  state = {
    code: '',
    name: '',
    description: '',
    isDialogOpen: false,
    absenceTypeIndex: 0,
    absenceResponsible: null,
    inCopyResponsible: null,
    doc: {},
    docExtension: '',
    docId: '',
    pageNumber: 1
  };

  editingPromiseResolve = () => {};

  columns = [
    {
      name: 'code',
      label: 'Code',
      options: {
        filter: true
      }
    },
    {
      label: 'Name',
      name: 'name',
      options: {
        filter: true
      }
    },
    {
      label: 'Description',
      name: 'description',
      options: {
        filter: true
      }
    },
    {
      label: 'Duration type',
      name: 'durationType',
      options: {
        filter: true
      }
    },
    {
      label: 'Documents mandatory',
      name: 'documentsMandatory',
      options: {
        filter: true
      }
    },
    {
      label: 'Absence responsible',
      name: 'absenceResponsibleName',
      options: {
        filter: true
      }
    },
    {
      label: 'InCopy responsible',
      name: 'inCopyResponsibleName',
      options: {
        filter: true
      }
    },
    {
      label: 'Country',
      name: 'countryName',
      options: {
        filter: true
      }
    },
    {
      label: 'State',
      name: 'stateName',
      options: {
        filter: true
      }
    },
    {
      label: 'Document',
      name: 'document',
      options: {
        customBodyRender: (value, tableMeta) => (
          <React.Fragment>
            {value ? (
              <IconButton
                onClick={() => this.handleOpenDocumentDialog(tableMeta)}
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
      name: ' ',
      options: {
        customBodyRender: (value, tableMeta) => (
          <React.Fragment>
            <IconButton onClick={() => this.handleOpenDialog(tableMeta)}>
              <EditIcon color="secondary" />
            </IconButton>
            <IconButton onClick={() => this.handleDeleteType(tableMeta)}>
              <DeleteIcon color="primary" />
            </IconButton>
          </React.Fragment>
        )
      }
    }
  ];

  componentDidMount() {
    const { changeTheme, getAllAbsenceType, getAllStaff } = this.props;
    changeTheme('blueCyanTheme');
    getAllStaff();
    getAllAbsenceType();
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleUpdate = () => {
    const { allAbsenceType, getAllAbsenceType, updateAbsenceType } = this.props;
    const {
      code,
      name,
      description,
      absenceTypeIndex,
      absenceResponsible,
      inCopyResponsible,
      docExtension,
      doc
    } = this.state;
    const absenceTypeData = allAbsenceType[absenceTypeIndex];
    const absenceType = {
      absenceTypeId: absenceTypeData.absenceTypeId,
      code,
      name,
      description,
      absenceResponsibleId: absenceResponsible.staffId,
      inCopyResponsibleId: inCopyResponsible.staffId,
      docExtension
    };

    const formData = new FormData();
    if (doc.constructor !== Object) {
      formData.append('doc', doc);
    } else {
      formData.append(
        'doc',
        new Blob([JSON.stringify({})], {
          type: 'application/json'
        })
      );
    }
    Object.keys(absenceType).forEach(e => formData.append(e, absenceType[e]));

    const promise = new Promise(resolve => {
      updateAbsenceType(formData);
      this.editingPromiseResolve = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        notification('success', result);
        getAllAbsenceType();
        console.log(result);
        this.setState({
          isDialogOpen: false
        });
      } else {
        console.log(result);
        notification('danger', result);
      }
    });
  };

  handleOpenDialog = tableMeta => {
    const { allAbsenceType, allStaff } = this.props;
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
      + tableMeta.rowIndex;
    this.setState({
      absenceTypeIndex: index,
      code: allAbsenceType[index].code,
      name: allAbsenceType[index].name,
      description: allAbsenceType[index].description,
      isDialogOpen: true,
      absenceResponsible: allStaff.filter(
        staff => staff.staffId === allAbsenceType[index].absenceResponsibleId
      )[0],
      inCopyResponsible: allStaff.filter(
        staff => staff.staffId === allAbsenceType[index].inCopyResponsibleId
      )[0]
    });
  };

  handleOpenDocumentDialog = tableMeta => {
    const { allAbsenceType } = this.props;
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
      + tableMeta.rowIndex;
    this.setState({
      isOpenDocument: true,
      docExtension: allAbsenceType[index].docExtension,
      absenceTypeIndex: index
    });
  };

  handleClose = () => {
    this.setState({
      isDialogOpen: false,
      isOpenDocument: false,
      absenceTypeIndex: 0,
      doc: {}
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
    const { allAbsenceType } = this.props;
    const { absenceTypeIndex, docExtension } = this.state;
    console.log(docExtension);
    return `data:${this.handleFileDataType(docExtension)};base64,${
      allAbsenceType[absenceTypeIndex].document
    }`;
  };

  handleDeleteType = tableMeta => {
    const { allAbsenceType, getAllAbsenceType, deleteAbsenceType } = this.props;
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
      + tableMeta.rowIndex;
    const promise = new Promise(resolve => {
      deleteAbsenceType(allAbsenceType[index].absenceTypeId);
      this.editingPromiseResolve = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        notification('success', result);
        getAllAbsenceType();
      } else {
        notification('danger', result);
      }
    });
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({
      numPages
    });
  };

  handleDownload = () => {
    const { allAbsenceType } = this.props;
    const { absenceTypeIndex } = this.state;
    const doc = allAbsenceType[absenceTypeIndex].document;
    const docName = `${allAbsenceType[absenceTypeIndex].name}_Document`;

    const documentBase64 = this.fileToBase64(doc);
    const documentBlob = new Blob([documentBase64], {
      type: this.handleFileDataType(
        allAbsenceType[absenceTypeIndex].docExtension
      )
    });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(documentBlob);
    link.download = docName;
    link.click();
  };

  handleChangeAbsenceResponsible = (ev, value) => {
    this.setState({ absenceResponsible: value });
  };

  handleChangeInCopyResponsible = (ev, value) => {
    this.setState({ inCopyResponsible: value });
  };

  handleUploadDocClick = () => {
    inputDoc.current.click();
  };

  handleDocChange = () => {
    const lastDot = inputDoc.current.files[0].name.lastIndexOf('.');
    const ext = inputDoc.current.files[0].name
      .substring(lastDot + 1)
      .toLowerCase();
    if (extList.includes(ext)) {
      this.setState({
        doc: inputDoc.current.files[0],
        docExtension: ext
      });
    }
  };

  render() {
    const {
      classes,
      allAbsenceType,
      isLoadingAbsenceType,
      absenceTypeResponse,
      errorAbsenceType,
      allStaff
    } = this.props;
    const {
      code,
      name,
      description,
      isDialogOpen,
      isOpenDocument,
      absenceTypeIndex,
      absenceResponsible,
      inCopyResponsible,
      doc,
      pageNumber
    } = this.state;
    const title = brand.name + ' - Types of staff absence';
    const { desc } = brand;
    const options = {
      filter: true,
      selectableRows: 'none',
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
      customToolbar: () => (
        <CustomToolbar
          csvData={allAbsenceType}
          url="/app/hh-rr/absenceType/create-absence-type"
          tooltip="add new staff absence type"
        />
      )
    };
    !isLoadingAbsenceType
      && absenceTypeResponse
      && this.editingPromiseResolve(absenceTypeResponse);
    !isLoadingAbsenceType
      && !absenceTypeResponse
      && this.editingPromiseResolve(errorAbsenceType);
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
            {allAbsenceType[absenceTypeIndex] ? (
              allAbsenceType[absenceTypeIndex].docExtension === 'pdf' ? (
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
            <Button autoFocus onClick={this.handleClose} color="primary">
              Close
            </Button>
            <Button onClick={this.handleDownload} color="primary">
              Download
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={isDialogOpen}
          disableBackdropClick
          disableEscapeKeyDown
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-title">
            Edit Staff Absence Type
          </DialogTitle>
          <DialogContent>
            <TextField
              id="outlined-basic"
              label="Code"
              variant="outlined"
              name="code"
              value={code}
              fullWidth
              required
              className={classes.textField}
              onChange={this.handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              name="name"
              value={name}
              fullWidth
              required
              className={classes.textField}
              onChange={this.handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              name="description"
              value={description}
              fullWidth
              className={classes.textField}
              onChange={this.handleChange}
            />
            <Autocomplete
              id="combo-box-demo"
              value={absenceResponsible}
              options={allStaff}
              getOptionLabel={option => `${option.firstName} ${option.fatherFamilyName} ${
                option.motherFamilyName
              }`
              }
              getOptionSelected={(option, value) => option.staffId === value.staffId
              }
              onChange={this.handleChangeAbsenceResponsible}
              style={{ width: '100%', marginTop: '15px' }}
              clearOnEscape
              renderInput={params => (
                <TextField
                  fullWidth
                  {...params}
                  label="Absence Responsible"
                  variant="outlined"
                />
              )}
            />
            <Autocomplete
              id="combo-box-demo"
              value={inCopyResponsible}
              options={allStaff}
              getOptionLabel={option => `${option.firstName} ${option.fatherFamilyName} ${
                option.motherFamilyName
              }`
              }
              getOptionSelected={(option, value) => option.staffId === value.staffId
              }
              onChange={this.handleChangeInCopyResponsible}
              style={{ width: '100%', marginTop: '15px' }}
              clearOnEscape
              renderInput={params => (
                <TextField
                  fullWidth
                  {...params}
                  label="InCopy Responsible"
                  variant="outlined"
                />
              )}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 20,
                marginBottom: 20,
                width: '100%'
              }}
            >
              <IconButton
                className={
                  doc.constructor === Object
                    ? classes.uploadAvatarEmpty
                    : classes.uploadAvatarDone
                }
                onClick={this.handleUploadDocClick}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <input
                    type="file"
                    id="file"
                    accept=".png, .jpg, .jpeg, .pdf, .tiff"
                    ref={inputDoc}
                    multiple={false}
                    style={{ display: 'none' }}
                    onChange={this.handleDocChange}
                  />
                  <PublishIcon
                    className={classes.uploadIcon}
                    color="secondary"
                  />
                  <Typography
                    variant="subtitle1"
                    className={classes.uploadText}
                  >
                    Document
                  </Typography>
                </div>
              </IconButton>
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus color="primary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={this.handleUpdate}
              disabled={!code || !name}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
        <PapperBlock
          title="Types of staff absence"
          icon="ios-paper-outline"
          noMargin
        >
          <MUIDataTable
            title=""
            data={allAbsenceType}
            columns={this.columns}
            options={options}
          />
        </PapperBlock>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allAbsenceType: state.getIn(['absenceTypes']).allAbsenceType,
  absenceTypeResponse: state.getIn(['absenceTypes']).absenceTypeResponse,
  isLoadingAbsenceType: state.getIn(['absenceTypes']).isLoading,
  errorAbsenceType: state.getIn(['absenceTypes']).errors,
  allStaff: state.getIn(['staffs']).allStaff
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    updateAbsenceType,
    getAllAbsenceType,
    deleteAbsenceType,
    getAllStaff
  },
  dispatch
);

const AbsenceTypeMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(AbsenceType);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <AbsenceTypeMapped changeTheme={changeTheme} classes={classes} />;
};
