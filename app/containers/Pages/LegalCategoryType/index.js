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
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import styles from './legalCategoryType-jss';
import { ThemeContext } from '../../App/ThemeWrapper';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
import LegalCategoryTypeService from '../../Services/LegalCategoryTypeService';

const useStyles = makeStyles(styles);

class LegalCategoryType extends React.Component {
  state = {
    data: [],
    name: '',
    functions: '',
    companyName: '',
    isDialogOpen: false,
    legalCategoryTypeIndex: 0
  };

  columns = [
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true
      }
    },
    {
      label: 'Functions',
      name: 'functions',
      options: {
        filter: true
      }
    },
    {
      label: 'Company',
      name: 'companyName',
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
    LegalCategoryTypeService.getAllLegalCategoryTypes().then(({ data }) => {
      this.setState({
        data
      });
    });
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleUpdate = () => {
    const {
      name,
      functions,
      companyName,
      data,
      legalCategoryTypeIndex
    } = this.state;
    const legalCategoryType = { name, functions, companyName };
    console.log(data[legalCategoryTypeIndex]);
    LegalCategoryTypeService.updateLegalCategoryType(
      data[legalCategoryTypeIndex].legalCategoryTypeId,
      legalCategoryType
    ).then(() => {
      const types = JSON.parse(JSON.stringify(data));
      types[legalCategoryTypeIndex] = {
        ...types[legalCategoryTypeIndex],
        name,
        functions,
        companyName
      };
      console.log(types);
      this.setState({
        data: types,
        isDialogOpen: false
      });
    });
  };

  handleOpenDialog = tableMeta => {
    const { data } = this.state;
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
      + tableMeta.rowIndex;
    this.setState({
      legalCategoryTypeIndex: index,
      name: data[index].name,
      functions: data[index].functions,
      companyName: data[index].companyName,
      isDialogOpen: true
    });
  };

  handleClose = () => {
    this.setState({
      isDialogOpen: false
    });
  };

  handleDeleteType = tableMeta => {
    const { data } = this.state;
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
      + tableMeta.rowIndex;
    LegalCategoryTypeService.deleteLegalCategoryType(
      data[index].legalCategoryTypeId
    ).then(() => {
      this.setState({
        data: data.length > 1 ? data.splice(index, 1) : []
      });
    });
  };

  render() {
    const { classes } = this.props;
    const {
      data, name, functions, companyName, isDialogOpen
    } = this.state;
    const title = brand.name + ' - Types of legal category';
    const { desc } = brand;
    const options = {
      filter: true,
      selectableRows: 'none',
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
      customToolbar: () => (
        <CustomToolbar
          csvData={data}
          url="/app/hh-rr/legalCategoryType/create-legal-category-type"
          tooltip="add new legal category type"
        />
      )
    };
    const companies = [
      { name: 'TechniU', phone: '+21265482154', email: 'techniU@gmail.com' },
      {
        name: 'Implemental Systems',
        phone: '+21265482154',
        email: 'implemental@gmail.com'
      },
      {
        name: 'International GDE',
        phone: '+21265482154',
        email: 'internationalgde@gmail.com'
      }
    ];
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
            Edit Legal Category Type
          </DialogTitle>
          <DialogContent>
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
              label="Functions"
              variant="outlined"
              name="functions"
              value={functions}
              fullWidth
              required
              className={classes.textField}
              onChange={this.handleChange}
            />
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel>Company</InputLabel>
              <Select
                name="companyName"
                value={companyName}
                onChange={this.handleChange}
              >
                {companies.map(company => (
                  <MenuItem key={company.name} value={company.name}>
                    {company.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button autoFocus color="primary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={this.handleUpdate}
              disabled={!functions || !name || !companyName}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
        <PapperBlock
          title="Types of Legal Category"
          icon="ios-paper-outline"
          noMargin
        >
          <MUIDataTable
            title=""
            data={data}
            columns={this.columns}
            options={options}
          />
        </PapperBlock>
      </div>
    );
  }
}

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <LegalCategoryType changeTheme={changeTheme} classes={classes} />;
};
