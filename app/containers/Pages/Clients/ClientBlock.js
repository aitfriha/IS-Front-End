import React, { useContext } from 'react';
import MUIDataTable from 'mui-datatables';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import DetailsIcon from '@material-ui/core/SvgIcon/SvgIcon';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
import EditClient from './EditClient';
import styles from './clients-jss';

import {
  deleteClient, getAllClient, updateClient, addClientCommercial
} from '../../../redux/client/actions';
import { getAllStateByCountry } from '../../../redux/stateCountry/actions';
import { getAllCityByState } from '../../../redux/city/actions';
import { ThemeContext } from '../../App/ThemeWrapper';

const useStyles = makeStyles(styles);
class ClientBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openPopUp: false,
      data: [],
      selectedClient: [],
      columns: [
        {
          name: 'clientId',
          label: 'clientId',
          options: {
            display: 'excluded'
          }
        },
        {
          name: 'name',
          label: 'Name',
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
            })
          }
        },
        {
          name: 'email',
          label: 'email',
          options: {
            display: 'excluded'
          }
        },
        {
          name: 'phone',
          label: 'phone',
          options: {
            display: 'excluded'
          }
        },
        {
          name: 'webSite',
          label: 'webSite',
          options: {
            display: 'excluded'
          }
        },
        {
          label: ' ',
          name: 'isActive',
          options: {
            customBodyRender: (value) => (
              <React.Fragment>
                <IconButton size="small">
                  <RadioButtonUncheckedIcon style={{
                    backgroundColor: value === 'Yes' ? 'green' : 'red',
                    color: value === 'Yes' ? 'green' : 'red',
                    borderRadius: '100%',
                    width: '15px',
                    height: '15px'
                  }}
                  />
                </IconButton>
              </React.Fragment>
            )
          }
        },
        {
          label: ' ',
          name: 'logo',
          options: {
            customBodyRender: (value) => {
              const { classes } = this.props;
              return (
                <React.Fragment>
                  <Avatar alt="User Name" src={value} className={classes.medium} />
                </React.Fragment>
              );
            }
          }
        },
        {
          name: 'addressName',
          label: 'addressName',
          options: {
            display: 'excluded'
          }
        },
        {
          name: 'postCode',
          label: 'postCode',
          options: {
            display: 'excluded'
          }
        },

        {
          label: 'Code Client',
          name: 'code',
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
            })
          }
        },
        /*        {
          label: 'Sector Leader',
          name: 'sectorLeader',
          options: {
            filter: true,
          }
        }, */
/*        {
          label: 'Country Leader',
          name: 'countryLeader',
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
            })
          }
        },*/
        {
          label: 'Responsible Commercial',
          name: 'responsibleCommercial',
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
            })
          }
        },
        {
          label: 'Assistant Commercial',
          name: 'assistantCommercial',
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
            })
          }
        },
        {
          name: 'sector1',
          label: 'Sector 1',
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
            })
          }
        },
        {
          name: 'sector2',
          label: 'Sector 2',
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
            })
          }
        },
        {
          name: 'sector3',
          label: 'Sector 3',
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
            })
          }
        },
        {
          name: 'city',
          label: 'City',
          options: {
            filter: true,
            sort: true,
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
            })
          }
        },
        {
          name: 'country',
          label: 'Country',
          options: {
            filter: true,
            sort: true,
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
            })
          }
        },
        {
          name: 'multinational',
          label: 'Multinational',
          options: {
            filter: true,
            sort: true,
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
            })
          }
        },
        {
          name: 'type',
          label: 'Type',
          options: {
            filter: true,
            sort: true,
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
            })
          }
        },
        {
          name: 'countryId',
          label: 'countryId',
          options: {
            display: 'excluded'
          }
        },
        {
          name: 'stateId',
          label: 'stateId',
          options: {
            display: 'excluded'
          }
        },
        {
          name: 'clientId',
          label: 'clientId',
          options: {
            display: 'excluded'
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
            customBodyRender: (value, data) => (
              <div>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <IconButton onClick={() => this.handleDetails(data.rowData)}>
                      <EditIcon color="secondary" />
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
            )
          }
        }
      ]
    };
  }

  handleDetails = (data) => {
   // console.log(data);
    const { getAllStateByCountry, getAllCityByState } = this.props;
    this.setState({ selectedClient: data });
    getAllStateByCountry(data[19]);
    this.setState({ openPopUp: true });
    getAllCityByState(data[20]);
  }

  handleClose = () => {
    this.setState({ openPopUp: false });
  };

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { changeTheme,getAllClient } = this.props;
    changeTheme('redTheme');
    getAllClient();
  }

  removeByAttr = function (arr, attr, value) {
    let i = arr.length;
    while (i--) {
      if (arr[i]
          && arr[i].hasOwnProperty(attr)
          && (arguments.length > 2 && arr[i][attr] === value)) {
        arr.splice(i, 1);
      }
    }
    return arr;
  }
  /* handleAssignment = (tableMeta) => {
    const { data } = this.state;
    const { add, back } = this.props;
    const row = data[tableMeta.rowIndex];
    add(row);
    back('assignment');
  }; */

  render() {
    const {
      // eslint-disable-next-line no-shadow
      errors, isLoading, clientResponse, allClients, allStateCountrys, allCitys, logedUser
    } = this.props;
    const {
      data, columns, openPopUp, selectedClient
    } = this.state;
    const thelogedUser = JSON.parse(logedUser);
    let options = {};
    let download = false;
    if (thelogedUser.userRoles[0].actionsNames.commercial_customers_export == true) {
      download = true;
    }
    if (thelogedUser.userRoles[0].actionsNames.commercial_customers_modify == false) {
      this.removeByAttr(columns, 'name', 'Actions');
    }
    if (thelogedUser.userRoles[0].actionsNames.commercial_customers_create == true) {
      options = {
        fixedHeader: true,
        fixedSelectColumn: false,
        filter: true,
        selectableRows: false,
        filterType: 'dropdown',
        responsive: 'stacked',
        rowsPerPage: 10,
        download,
        customToolbar: () => (
          <CustomToolbar csvData={data} url="/app/gestion-commercial/clients/create-client" tooltip="Add Client" />
        )
      };
    } else {
      options = {
        fixedHeader: true,
        fixedSelectColumn: false,
        filter: true,
        selectableRows: false,
        filterType: 'dropdown',
        responsive: 'stacked',
        rowsPerPage: 10,
        download,
      };
    }
    return (
      <div>
        <MUIDataTable title="The Clients List" data={allClients && allClients} columns={columns} options={options} />
        <Dialog
          open={openPopUp}
          keepMounted
          scroll="body"
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          fullWidth=""
          maxWidth=""
        >
          <DialogTitle id="alert-dialog-slide-title"> View Details</DialogTitle>
          <DialogContent dividers>
            <EditClient selectedClient={selectedClient} allStateCountrys={allStateCountrys} allCitys={allCitys} handleClose={this.handleClose}/>
          </DialogContent>
          {/*<DialogActions>
            <Button color="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleClose}
            >
              Update
            </Button>
          </DialogActions>*/}
        </Dialog>
      </div>
    );
  }
}
ClientBlock.propTypes = {
  classes: PropTypes.object.isRequired,
  // add: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
  addClientCommercial: PropTypes.func.isRequired,
  updateClient: PropTypes.func.isRequired,
  deleteClient: PropTypes.func.isRequired,
  getAllClient: PropTypes.func.isRequired,
  allClients: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  allClients: state.getIn(['clients']).allClients,
  clientResponse: state.getIn(['clients']).clientResponse,
  isLoading: state.getIn(['clients']).isLoading,
  errors: state.getIn(['clients']).errors,

  // state
  allStateCountrys: state.getIn(['stateCountries']).allStateCountrys,
  stateCountryResponse: state.getIn(['stateCountries']).stateCountryResponse,
  isLoadingState: state.getIn(['stateCountries']).isLoading,
  errorsState: state.getIn(['stateCountries']).errors,

  // city
  allCitys: state.getIn(['cities']).allCitys,
  cityResponse: state.getIn(['cities']).cityResponse,
  isLoadingCity: state.getIn(['cities']).isLoading,
  errorsCity: state.getIn(['cities']).errors,
  logedUser: localStorage.getItem('logedUser')
});
const mapDispatchToProps = dispatch => bindActionCreators({
  addClientCommercial,
  updateClient,
  deleteClient,
  getAllClient,
  getAllStateByCountry,
  getAllCityByState
}, dispatch);

const ClientBlockMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientBlock);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return (
    <ClientBlockMapped changeTheme={changeTheme} classes={classes} />
  );
};
