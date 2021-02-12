import React, { useContext } from 'react';
import MUIDataTable from 'mui-datatables';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DetailsIcon from '@material-ui/icons/Details';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { toUpper } from 'lodash/string';
import { ThemeContext } from '../../../App/ThemeWrapper';
import PurchaseOrderService from '../../../Services/PurchaseOrderService';
import CustomToolbar from '../../../../components/CustomToolbar/CustomToolbar';
import styles from '../Company/companies-jss';
import FinancialCompanyService from '../../../Services/FinancialCompanyService';
import ExternalSuppliersService from '../../../Services/ExternalSuppliersService';
import CurrencyService from '../../../Services/CurrencyService';
import IvaService from '../../../Services/IvaService';

const useStyles = makeStyles(styles);

class PurchaseOrderBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchaseOrderId: '',
      companyDataEmit: '',
      companyLogo: '',
      internLogo: '',
      companyNIF: '',
      companyAddress: '',
      receptionSupplierExternal: '',
      receptionSupplierInternal: '',
      receptionSupplierType: '',
      supplierNIF: '',
      supplierResponsible: '',
      supplierAddress: '',
      supplierContractCode: '',
      externalSuppliers: [],
      companies: [],
      currencies: [],
      ivasCountries: [],
      ivaStates: [],
      ivaState: '',
      nbrConcepts: ['1'],
      termsListe: ['1'],
      itemNames: [],
      description: [],
      unityValue: [],
      unity: [],
      valor: [0],
      unityNumber: [],
      givingDate: [],
      paymentDate: [],
      billingDate: [],
      termTitle: [],
      termDescription: [],
      totalEuro: 0,
      totalLocal: 0,
      valueIVAEuro: 0,
      valueIVALocal: 0,
      totalAmountEuro: 0,
      totalAmountLocal: 0,
      factor: 0,
      ivaRetentions: '',
      totalAmountRetentions: '',
      totalIvaRetention: '',
      paymentMethod: '',
      localCurrency: '',
      openPopUp: false,
      datas: [],
      columns: [
        {
          name: 'companyEmit',
          label: 'Company Data Emit ',
          options: {
            filter: true,
            customBodyRender: (companyEmit) => (
              <React.Fragment>
                {
                  companyEmit.name
                }
              </React.Fragment>
            ),
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'companyNIF',
          label: 'Tax Number',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'companyLogo',
          label: 'Logo',
          options: {
            filter: true,
            customBodyRender: (value) => {
              const { classes } = this.props;
              return (
                <React.Fragment>
                  <Avatar alt="Logo " src={value} className={classes.medium} />
                </React.Fragment>
              );
            },
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'receptionSupplierType',
          label: 'Supplier Type',
          options: {
            filter: true,
            customBodyRender: (value) => (
              <React.Fragment>
                {
                  value ? toUpper(value) : '---'
                }
              </React.Fragment>
            ),
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'internalSupplierReception',
          label: 'Internal Reception Supplier',
          options: {
            filter: true,
            customBodyRender: (value) => (
              <React.Fragment>
                {
                  value ? value.name : '---'
                }
              </React.Fragment>
            ),
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'internalSupplierReception',
          label: 'Supplier Logo',
          options: {
            filter: true,
            customBodyRender: (value) => (
              <React.Fragment>
                {
                  value ? (<Avatar alt="Logo " src={value.logo} />) : '---'
                }
              </React.Fragment>
            ),
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'externalSupplierReception',
          label: 'External Reception Supplier',
          options: {
            filter: true,
            customBodyRender: (value) => (
              <React.Fragment>
                {
                  value ? value.companyName : '---'
                }
              </React.Fragment>
            ),
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'supplierResponsible',
          label: 'Supplier Responsible',
          options: {
            filter: true,
            customBodyRender: (value) => (
              <React.Fragment>
                {
                  value || '---'
                }
              </React.Fragment>
            ),
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'supplierNIF',
          label: 'Supplier NIF',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'paymentMethod',
          label: 'Payment Method',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'totalAmountLocal',
          label: 'Total Amount (L)',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'currency',
          label: 'Currency',
          options: {
            filter: true,
            customBodyRender: (value) => (
              <React.Fragment>
                {
                  value ? value.typeOfCurrency.currencyCode : ''
                }
              </React.Fragment>
            ),
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'totalAmountEuro',
          label: 'Total Amount (€)',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          label: 'I.V.A Retentions %',
          name: 'ivaRetentions',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          label: 'Total Amount Retentions %',
          name: 'totalAmountRetentions',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          label: 'Total Iva + Retentions %',
          name: 'totalIvaRetention',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'Actions',
          label: ' Actions',
          options: {
            filter: false,
            sort: false,
            empty: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
            customBodyRender: (value, tableMeta) => (
              <React.Fragment>
                <IconButton onClick={() => this.handleDetails(tableMeta)}>
                  <DetailsIcon color="secondary" />
                </IconButton>
                <IconButton onClick={() => this.handleDelete(tableMeta)}>
                  <DeleteIcon color="primary" />
                </IconButton>
              </React.Fragment>
            )
          }
        }
      ]
    };
  }

  componentDidMount() {
    PurchaseOrderService.getPurchaseOrder().then(result => {
      console.log(result);
      this.setState({ datas: result.data });
    });
    FinancialCompanyService.getCompany().then(result => {
      this.setState({ companies: result.data });
    });
    ExternalSuppliersService.getExternalSuppliers().then(result => {
      this.setState({ externalSuppliers: result.data });
    });
    CurrencyService.getFilteredCurrency().then(result => {
      this.setState({ currencies: result.data });
    });
    IvaService.getIvaCountries().then(result => {
      console.log(result.data);
      this.setState({ ivasCountries: result.data });
    });
    const {
      // eslint-disable-next-line react/prop-types
      changeTheme
    } = this.props;
    changeTheme('greyTheme');
  }

  // eslint-disable-next-line react/sort-comp
  handleDetails = (tableMeta) => {
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
        + tableMeta.rowIndex;
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const id = this.state.datas[index].purchaseOrderId;
    PurchaseOrderService.getPurchaseOrderById(id).then(result => {
      console.log(result.data);
      this.setState({
        externalSupplierId: id,
        companyName: result.data.companyName,
        code: result.data.code,
        taxNumber: result.data.taxNumber,
        email: result.data.email,
        firstName: result.data.firstName,
        fatherFamilyName: result.data.fatherFamilyName,
        motherFamilyName: result.data.motherFamilyName,
        URL: result.data.url,
        address: result.data.address,
        addressId: result.data.address.addressId,
        postCode: result.data.address.postCode,
        fullAddress: result.data.address.fullAddress,
        openPopUp: true
      });
    });
  }

  handleDelete = (tableMeta) => {
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
        + tableMeta.rowIndex;
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const id = this.state.datas[index].purchaseOrderId;
    PurchaseOrderService.deletePurchaseOrder(id).then(result => {
      console.log(result.data);
      this.setState({ datas: result.data });
    });
  };

  handleSave = () => {
    const {
      externalSupplierId, code, companyName, firstName, fatherFamilyName, motherFamilyName, email, currentCity, postCode, fullAddress, taxNumber, URL
    } = this.state;
    const city = { _id: currentCity };
    const address = {
      postCode, city, fullAddress
    };
    const ExternalSupplier = {
      externalSupplierId, companyName, code, firstName, fatherFamilyName, motherFamilyName, URL, taxNumber, email, address
    };
    PurchaseOrderService.updatePurchaseOrder(ExternalSupplier).then(result => {
      this.setState({ datas: result.data, openPopUp: false });
    });
  };

  handleClose = () => {
    this.setState({ openPopUp: false });
  };

    handleChange = (ev) => {
      if (ev.target.name === 'companyDataEmit') {
        // eslint-disable-next-line array-callback-return,react/destructuring-assignment
        this.state.companies.map(row => {
          if (row.financialCompanyId === ev.target.value) {
            this.setState({
              companyLogo: row.logo,
              companyNIF: row.taxNumber,
              companyAddress: row.address.fullAddress.concat(' ' + row.address.city.cityName).concat(' ' + row.address.city.stateCountry.country.countryName)
            });
          }
        });
      }
      if (ev.target.name === 'receptionSupplierExternal') {
        // eslint-disable-next-line array-callback-return,react/destructuring-assignment
        this.state.externalSuppliers.map(row => {
          if (row.externalSupplierId === ev.target.value) {
            this.setState({
              receptionSupplierInternal: '',
              supplierResponsible: row.firstName.concat(' ' + row.fatherFamilyName.concat(' ' + row.motherFamilyName)),
              supplierNIF: row.taxNumber,
              supplierAddress: row.address.fullAddress.concat(' ' + row.address.city.cityName).concat(' ' + row.address.city.stateCountry.country.countryName)
            });
          }
        });
      }
      if (ev.target.name === 'receptionSupplierInternal') {
        // eslint-disable-next-line array-callback-return,react/destructuring-assignment
        this.state.companies.map(row => {
          if (row.financialCompanyId === ev.target.value) {
            this.setState({
              receptionSupplierExternal: '',
              internLogo: row.logo,
              supplierNIF: row.taxNumber,
              supplierAddress: row.address.fullAddress.concat(' ' + row.address.city.cityName).concat(' ' + row.address.city.stateCountry.country.countryName)
            });
          }
        });
      }
      if (ev.target.name === 'ivaState') {
        const id = ev.target.value;
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const local = this.state.totalLocal; const { factor } = this.state;
        let iva = 0;
        // eslint-disable-next-line react/destructuring-assignment,array-callback-return
        this.state.ivaStates.map(row => {
          if (row.ivaId === id) iva = row.value;
        });
        this.setState({
          valueIVALocal: (iva * local) / 100, valueIVAEuro: ((iva * local) / 100) * factor, totalAmountLocal: local + ((iva * local) / 100), totalAmountEuro: (local + ((iva * local) / 100)) * factor
        });
      }
      if (ev.target.name === 'localCurrency') {
        const id = ev.target.value;
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const local = this.state.totalLocal;
        let factor = 0;
        // eslint-disable-next-line react/destructuring-assignment,array-callback-return
        this.state.currencies.map(row => {
          if (row.currencyId === id) factor = row.changeFactor;
        });
        this.setState({ totalEuro: factor * local, factor });
      }
      if (ev.target.name === 'ivaCountry') {
        const country = ev.target.value;
        console.log(country);
        IvaService.getIvaStates(country).then(result => {
          console.log(result.data);
          this.setState({ ivaStates: result.data });
        });
      }
      this.setState({ [ev.target.name]: ev.target.value });
    };

    handleConcept = (event, row) => {
      let total = 0;
      if (event.target.name === 'description') {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const tab = this.state.description;
        tab[0] = 0;
        tab[row] = event.target.value;
        this.setState({ description: tab });
      }
      if (event.target.name === 'itemNames') {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const tab = this.state.itemNames;
        tab[0] = 0;
        tab[row] = event.target.value;
        this.setState({ itemNames: tab });
      }
      if (event.target.name === 'unity') {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const tab = this.state.unity;
        tab[0] = 0;
        tab[row] = event.target.value;
        this.setState({ unity: tab });
      }
      if (event.target.name === 'unityNumber') {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const tab = this.state.unityNumber; const value = this.state.unityValue; const val = this.state.valor;
        tab[0] = 0;
        tab[row] = event.target.value;
        val[row] = event.target.value * value[row];
        // eslint-disable-next-line array-callback-return,no-shadow
        val.map(row => { total += row; });
        this.setState({ unityNumber: tab, valor: val, totalLocal: total });
      }
      if (event.target.name === 'givingDate') {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const tab = this.state.givingDate;
        tab[0] = 0;
        tab[row] = event.target.value;
        this.setState({ givingDate: tab });
      }
      if (event.target.name === 'paymentDate') {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const tab = this.state.paymentDate;
        tab[0] = 0;
        tab[row] = event.target.value;
        this.setState({ paymentDate: tab });
      }
      if (event.target.name === 'billingDate') {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const tab = this.state.billingDate;
        tab[0] = 0;
        tab[row] = event.target.value;
        this.setState({ billingDate: tab });
      }
      if (event.target.name === 'unityValue') {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const tab = this.state.unityValue;
        tab[0] = 0;
        tab[row] = event.target.value;
        this.setState({ unityValue: tab });
      }
    }

    handleOpenConcept = () => {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const newElement = this.state.nbrConcepts.length + 1;
      // eslint-disable-next-line react/destructuring-assignment
      this.state.nbrConcepts.push(newElement);
      this.setState({ openDoc: true });
    }

    handleDeleteConcept = (row) => {
      // eslint-disable-next-line react/destructuring-assignment
      if (this.state.nbrConcepts.length > 1) {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const newDocs = this.state.nbrConcepts.filter(rows => rows !== row);
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const newDocs2 = this.state.description.filter((e, i) => i !== (row));
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const newDocs3 = this.state.unityValue.filter((e, i) => i !== (row));
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const newDocs4 = this.state.itemNames.filter((e, i) => i !== (row));
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const newDocs5 = this.state.unity.filter((e, i) => i !== (row));
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const newDocs6 = this.state.unityNumber.filter((e, i) => i !== (row));
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const newDocs7 = this.state.givingDate.filter((e, i) => i !== (row));
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const newDocs8 = this.state.paymentDate.filter((e, i) => i !== (row));
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const newDocs9 = this.state.billingDate.filter((e, i) => i !== (row));
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const newDocs10 = this.state.valor.filter((e, i) => i !== (row));
        this.setState({
          nbrConcepts: newDocs,
          description: newDocs2,
          unityValue: newDocs3,
          itemNames: newDocs4,
          unity: newDocs5,
          unityNumber: newDocs6,
          givingDate: newDocs7,
          paymentDate: newDocs8,
          billingDate: newDocs9,
          valor: newDocs10
        });
      }
    }

    handleTerms = (event, row) => {
      if (event.target.name === 'termTitle') {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const tab = this.state.termTitle;
        tab[0] = 0;
        tab[row] = event.target.value;
        this.setState({ termTitle: tab });
      }
      if (event.target.name === 'termDescription') {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const tab = this.state.termDescription;
        tab[0] = 0;
        tab[row] = event.target.value;
        this.setState({ termDescription: tab });
      }
    }

    handleAddTerms = () => {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const newElement = this.state.termsListe.length + 1;
      // eslint-disable-next-line react/destructuring-assignment
      this.state.termsListe.push(newElement);
      this.setState({ openDoc: true });
    }

    handleDeleteTerms = (row) => {
      // eslint-disable-next-line react/destructuring-assignment
      if (this.state.termsListe.length > 1) {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const newDocs = this.state.termsListe.filter(rows => rows !== row);
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const newDocs2 = this.state.termTitle.filter((e, i) => i !== (row));
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const newDocs3 = this.state.termDescription.filter((e, i) => i !== (row));
        this.setState({
          termsListe: newDocs, termTitle: newDocs2, termDescription: newDocs3
        });
      }
    }

    render() {
      console.log(this.state);
      const { classes } = this.props;
      const {
        datas, columns, openPopUp,
      } = this.state;
      const options = {
        filter: true,
        selectableRows: false,
        filterType: 'dropdown',
        responsive: 'stacked',
        rowsPerPage: 10,
        customToolbar: () => (
          <CustomToolbar
            csvData={datas}
            url="/app/gestion-financial/Add Purchase-Order"
            tooltip="Add New Purchase Order"
          />
        )
      };

      return (
        <div>
          <MUIDataTable
            title="The Purchase Order List"
            data={datas}
            columns={columns}
            options={options}
          />
          <Dialog
            open={openPopUp}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth="md"
            maxWidth="md"
          >
            <DialogTitle id="alert-dialog-slide-title"> View Details</DialogTitle>
            <DialogContent dividers>
              tt
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={this.handleClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSave}
              >
                save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
}
PurchaseOrderBlock.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = () => ({
});
const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

const ExternalSuppliersBlockMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(PurchaseOrderBlock);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <ExternalSuppliersBlockMapped changeTheme={changeTheme} classes={classes} />;
};
