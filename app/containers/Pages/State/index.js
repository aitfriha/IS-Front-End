import React from 'react';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'dan-components';
import brand from 'dan-api/dummy/brand';
import csc from 'country-state-city';
import MUIDataTable from 'mui-datatables';
// import SaveAltIcon from '@material-ui/icons/SaveAlt';
import {
  Button, FormControl, withStyles,
} from '@material-ui/core';
import Select from 'react-select';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
// import { isString } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isString } from 'lodash';
import { CSVReader } from 'react-papaparse';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import MaterialTable, { MTableToolbar } from 'material-table';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import styles from '../StaffContract/people-jss';
import notification from '../../../components/Notification/Notification';
import { addCity, getAllCitys, importCity } from '../../../redux/city/actions';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
const buttonRef = React.createRef();
const fs = require('fs');
class StateCountry extends React.Component {
  countries = csc.getAllCountries();

  updatedCountries = this.countries.map(country => ({
    label: country.name,
    value: country.id,
    ...country
  }));


  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => {
    };
    this.state = {
      columns: [

        {
          name: 'countryName',
          label: 'Country',
        },
        {
          name: 'stateName',
          label: 'State',

        },
        {
          name: 'cityName',
          label: 'City',
        },

      ],
      columns2: [
        {
          title: 'Country',
          field: 'countryName',
        },
        {
          title: 'State',
          field: 'stateName',

        },
        {
          title: 'City',
          field: 'cityName',
        }
      ],
    };
  }

  componentDidMount() {
    const { getAllCitys } = this.props;
    getAllCitys();
  }

  updatedCities = stateId => csc.getCitiesOfState(stateId).map(city => ({ label: city.name, value: city.id, ...city }));

  updatedStates = countryId => csc.getStatesOfCountry(countryId).map(state => ({
    label: state.name,
    value: state.id,
    ...state
  }));

  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  }

  handleOnFileLoad = (data) => {
    const {
      // eslint-disable-next-line no-shadow
      getAllCitys, importCity
    } = this.props;
    // country
    const newData = [];

    data.forEach(
      (val) => {
        if (val.data[0] !== '') {
          newData.push(Object.assign({ countryName: val.data[0] }, { phonePrefix: val.data[1] }, { countryCode: val.data[2] }, { stateName: val.data[3] }, { cityName: val.data[4] }));
        }
      }
    );
    const promise = new Promise((resolve) => {
      importCity(newData.slice(1));
      this.editingPromiseResolve = resolve;
    });
    promise.then((result) => {
      notification('success', result);
      getAllCitys();
    });
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  }

  handleOnRemoveFile = (data) => {
  }

  handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  }

  render() {
    const title = brand.name + ' - State Country';
    const description = brand.desc;
    // eslint-disable-next-line no-shadow
    const {
      // eslint-disable-next-line no-shadow
      classes, allCitys, cityResponse, isLoading, errors, addCity, getAllCitys
    } = this.props;

    const { columns, columns2 } = this.state;
    const options = {
      filter: true,
      option: 'none',
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
      customToolbar: () => (
        <CustomToolbar
          exportFileName="Coutries States Cities"
          csvData={allCitys && allCitys}
          url="/app/hh-rr/staff/create-staff"
          tooltip="add new worker"
        />
      )
    };
    // Sent resolve to editing promises
    (!isLoading && cityResponse) && this.editingPromiseResolve(cityResponse);
    (!isLoading && !cityResponse) && this.editingPromiseResolve(errors);
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
        <PapperBlock title="Counries States Cities" desc="" noMargin>
          {/*   <CSVReader
            ref={buttonRef}
            onFileLoad={this.handleOnFileLoad}
            noClick
            noDrag
            onRemoveFile={this.handleOnRemoveFile}
          >
            {({ file }) => (
              <aside
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: 10,
                }}
              >
                <Button
                  variant="contained"
                  color="default"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                  onClick={this.handleOpenDialog}
                  style={{
                    marginRight: 10
                  }}
                >
                  import
                </Button>
                <div
                  style={{
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#ccc',
                    height: 36,
                    lineHeight: 1.5,
                    marginTop: 1,
                    marginBottom: 5,
                    paddingLeft: 13,
                    paddingTop: 3,
                    width: '60%'
                  }}
                >
                  {file && file.name}
                </div>
                <Button
                  style={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    paddingLeft: 20,
                    paddingRight: 20
                  }}
                  type="button"
                  className={classes.heightImport}
                  onClick={this.handleRemoveFile}
                >
                   <FormattedMessage
                    id="button.remove.label"
                  />
                  remove
                </Button>
              </aside>
            )}
          </CSVReader> */}
          <Formik
            enableReinitialize
            initialValues={{
              country: null,
              state: null,
              city: null
            }}
            //  onSubmit: values => StateService.saveState((JSON.stringify(values))).then(({ data }) => {
            onSubmit={async (values) => {
              const datafinal = {
                // country
                countryName: values.country.name,
                countryCode: values.country.sortname,
                phonePrefix: values.country.phonecode,
                // state
                stateName: values.state.name,
                // city
                cityName: values.city.name,
              };
              const promise = new Promise((resolve) => {
                // get client information
                addCity(datafinal);
                this.editingPromiseResolve = resolve;
              });
              promise.then((result) => {
                if (isString(result)) {
                  notification('success', result);
                  getAllCitys();
                } else {
                  notification('danger', result);
                }
              });
            }}
          >
            {props => {
              const {
                values,
                handleSubmit,
                setFieldValue,
              } = props;
              return (
                <form
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                >
                  <FormControl className={classes.formControl} fullWidth>
                    <Select
                      id="country"
                      name="country"
                      label="country"
                      options={this.updatedCountries}
                      value={values.country}
                      onChange={value => {
                        setFieldValue('country', value);
                        setFieldValue('state', null);
                        setFieldValue('city', null);
                      }}
                      placeholder="Country"
                      /*   onChange={value => {
                          setValues({ country: value, state: null, city: null }, false);
                        }} */
                    />
                  </FormControl>
                  <p />
                  <FormControl className={classes.formControl} fullWidth>
                    <Select
                      id="state"
                      name="state"
                      options={this.updatedStates(values.country ? values.country.value : null)}
                      value={values.state}
                      /*   onChange={value => {
                        setValues({ state: value, city: null }, false);
                      }} */
                      placeholder="state"
                      onChange={value => {
                        setFieldValue('state', value);
                        setFieldValue('city', null);
                      }}
                    />
                  </FormControl>
                  <p />
                  <FormControl className={classes.formControl} fullWidth>
                    <Select
                      id="city"
                      name="city"
                      options={this.updatedCities(values.state ? values.state.value : null)}
                      value={values.city}
                      // onChange={value => setFieldValue('city', value)}
                      placeholder="City"
                      onChange={value => {
                        setFieldValue('city', value);
                      }}
                    />
                  </FormControl>
                  <div className={classes.btnCenter} style={{ marginTop: 5 }}>
                    <Button
                      className={classes.textField}
                      color="primary"
                      variant="contained"
                      size="small"
                      type="submit"
                    >
                      Save
                    </Button>
                  </div>
                  {/*                  <div style={{ marginTop: 20 }}>
                    <MUIDataTable
                      title=""
                      data={allCitys && allCitys}
                      columns={columns}
                      options={options}
                    />
                  </div> */}
                  <div style={{ marginTop: 20 }}>
                    <MaterialTable
                      title=""
                      columns={columns2}
                      data={allCitys && allCitys}
                      actions={[
                        {
                          icon: 'save_alt',
                          tooltip: 'Export excel',
                          isFreeAction: true,
                          onClick: () => {
                            const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                            const fileExtension = '.xlsx';
                              console.log(allCitys);
                            const ws = XLSX.utils.json_to_sheet(allCitys);
                              ws["F1"]="";
                            console.log(ws);
                            const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
                            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
                            const data1 = new Blob([excelBuffer], { type: fileType });
                            FileSaver.saveAs(data1, 'Country State City' + fileExtension);
                          }
                        }
                      ]}
                      options={{
                        exportFileName: 'page.isic.title',
                        importFileName: 'page.national.title',
                        filtering: true,
                        grouping: true,
                        exportButton: false,
                        importButton: true,
                        draggable: true,
                        pageSize: 10,
                        actionsCellStyle: {
                          paddingLeft: 30,
                          width: 120,
                          maxWidth: 120,
                        }
                      }}
                      components={{
                        Toolbar: props => (
                          <div>
                            <MTableToolbar {...props} />
                            <div style={{
                              padding: '-50px 50px', marginTop: '-42px', marginLeft: '20px', marginBottom: '20px', width: '50%'
                            }}
                            >
                              <CSVReader
                                ref={buttonRef}
                                onFileLoad={this.handleOnFileLoad}
                                noClick
                                noDrag
                                onRemoveFile={this.handleOnRemoveFile}
                              >
                                {({ file }) => (
                                  <aside
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      marginBottom: 10,
                                    }}
                                  >
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      component="span"
                                      className={classes.heightImport}
                                      startIcon={<CloudUploadIcon />}
                                      onClick={this.handleOpenDialog}
                                      style={{
                                        marginRight: 10
                                      }}
                                    >

                                        Import

                                    </Button>
                                    <div
                                      style={{
                                        borderWidth: 1,
                                        borderStyle: 'solid',
                                        borderColor: '#ccc',
                                        height: 36,
                                        lineHeight: 1.5,
                                        marginTop: 1,
                                        marginBottom: 5,
                                        paddingLeft: 13,
                                        paddingTop: 3,
                                        width: '60%'
                                      }}
                                    >
                                      {file && file.name}
                                    </div>
                                    <Button
                                      style={{
                                        borderRadius: 0,
                                        marginLeft: 0,
                                        marginRight: 0,
                                        paddingLeft: 20,
                                        paddingRight: 20
                                      }}
                                      type="button"
                                      className={classes.heightImport}
                                      onClick={this.handleRemoveFile}
                                    >
                                      remove
                                    </Button>
                                  </aside>
                                )}
                              </CSVReader>
                            </div>
                          </div>
                        ),
                      }}
                    />
                  </div>
                  <p>{JSON.stringify(csc.get)}</p>
                </form>
              );
            }}
          </Formik>
        </PapperBlock>
      </div>
    );
  }
}
StateCountry.propTypes = {
  classes: PropTypes.object.isRequired,
  getAllCitys: PropTypes.func.isRequired,
  allCitys: PropTypes.array.isRequired,
  cityResponse: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  addCity: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  allCitys: state.getIn(['cities']).allCitys,
  cityResponse: state.getIn(['cities']).cityResponse,
  isLoading: state.getIn(['cities']).isLoading,
  errors: state.getIn(['cities']).errors
});
const mapDispatchToProps = dispatch => bindActionCreators({
  addCity,
  getAllCitys,
  importCity,
}, dispatch);

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(StateCountry));