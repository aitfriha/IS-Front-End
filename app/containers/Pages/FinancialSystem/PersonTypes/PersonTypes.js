import React, { useContext } from 'react';
import {
  Grid,
  Card,
  CardContent
} from '@material-ui/core';

import MaterialTable, { MTableEditRow, MTableToolbar } from 'material-table';

import { injectIntl } from 'react-intl';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isString } from 'lodash';
//import HelmetCustom from '../../../../components/HelmetCustom/HelmetCustom';
import notification from '../../../../components/Notification/Notification';

import {
  getAllPersonTypes,
  addPersonType,
  updatePersonType,
  deletePersonType
} from '../../../../redux/personType/actions';

const styles = {};


import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeContext } from '../../../App/ThemeWrapper';

const useStyles = makeStyles((theme) => {

});
const title = brand.name + ' - Person Types';
const description = brand.desc;

class PersonTypes extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => { };
    self = this;
    this.state = {
      personTypesColumns: [
        {
          title: 'Code', // intl.formatMessage({ id: 'connection.id' }),
          field: 'code',
          minWidth: 120,
          width: 120,
          maxWidth: 120,
          searchable: true
        },
        {
          title: 'Name', // intl.formatMessage({ id: 'connection.id' }),
          field: 'name',
          minWidth: 150,
          searchable: true
        },
        {
          title: 'Description', // intl.formatMessage({ id: 'connection.id' }),
          field: 'description',
          minWidth: 200,
          searchable: true
        }
      ]
    };
  }

  componentDidMount() {
    const { changeTheme } = this.props;
    changeTheme('greyTheme');

    const { getAllPersonTypes } = this.props;
    getAllPersonTypes();
  }

  componentWillUnmount() {

  }


  //----------------------------------------------------------------------------------------------

  render() {
    const {
      location, intl, errors, isLoading, addPersonType, updatePersonType, deletePersonType, getAllPersonTypes, personTypes, personTypeResponse, logedUser
    } = this.props;
    const thelogedUser = JSON.parse(logedUser);
    const { personTypesColumns } = this.state;

    (!isLoading && personTypeResponse) && this.editingPromiseResolve(personTypeResponse);
    (!isLoading && !personTypeResponse) && this.editingPromiseResolve(errors);

    return (
      <div>
        {/* <HelmetCustom location={location} /> */}
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <Card>
          <CardContent>
            <Grid item xs={12} md={12} style={{ marginTop: '10px' }}>
              <MaterialTable
                title="Person types list associated with expenses"
                columns={personTypesColumns}
                data={personTypes && personTypes}
                options={{
                  actionsColumnIndex: -1,
                  actionsCellStyle: {
                    paddingLeft: 10,
                    minWidth: 80,
                    width: 80
                  }
                }}
                style={{ marginTop: '10px' }}
                editable={{
                  isDeletable: rowData => rowData.removable,
                  onRowAdd: thelogedUser.userRoles[0].actionsNames.financialModule_personsTypes_create ? (newData => new Promise((resolve) => {
                    // add person type action
                    addPersonType(newData);
                    this.editingPromiseResolve = resolve;
                  }).then((result) => {
                    if (isString(result)) {
                      // Fetch data
                      getAllPersonTypes();
                      notification('success', result);
                    } else {
                      notification('danger', result);
                    }
                  })) : null,
                  onRowUpdate: thelogedUser.userRoles[0].actionsNames.financialModule_personsTypes_modify ? (newData => new Promise((resolve) => {
                    // update person type action
                    updatePersonType(newData);
                    this.editingPromiseResolve = resolve;
                  }).then((result) => {
                    if (isString(result)) {
                      // Fetch data
                      getAllPersonTypes();
                      notification('success', result);
                    } else {
                      notification('danger', result);
                    }
                  })) : null,
                  onRowDelete: thelogedUser.userRoles[0].actionsNames.financialModule_personsTypes_delete ? (oldData => new Promise((resolve) => {
                    // delete assignment type action
                    deletePersonType(oldData.id);
                    this.editingPromiseResolve = resolve;
                  }).then((result) => {
                    if (isString(result)) {
                      // Fetch data
                      getAllPersonTypes();
                      notification('success', result);
                    } else {
                      notification('danger', result);
                    }
                  })) : null
                }}
              />
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}

PersonTypes.propTypes = {
  errors: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  personTypeResponse: PropTypes.string.isRequired,

  intl: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  personTypes: state.getIn(['personType']).personTypes,
  personTypeResponse: state.getIn(['personType']).personTypeResponse,
  isLoading: state.getIn(['personType']).isLoading,
  errors: state.getIn(['personType']).errors,
  logedUser: localStorage.getItem('logedUser')
});

const mapDispatchToProps = dispatch => bindActionCreators({

  getAllPersonTypes,
  addPersonType,
  updatePersonType,
  deletePersonType

}, dispatch);

const PersonTypesMapped = connect(mapStateToProps, mapDispatchToProps)(injectIntl(PersonTypes));

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <PersonTypesMapped changeTheme={changeTheme} classes={classes} />;
};

//export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(injectIntl(PersonTypes)));
