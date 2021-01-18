import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import MaterialTable from 'material-table';
import { PropTypes } from 'prop-types';
import { injectIntl } from 'react-intl';
import { bindActionCreators } from 'redux';
import { isString } from 'lodash';
import { connect } from 'react-redux';
import HelmetCustom from '../../../../../app/components/HelmetCustom/HelmetCustom';
import localizationMaterialTable from '../../../../../app/api/localizationMaterialUI/localizationMaterialTable';
import notification from '../../../../../app/components/Notification/Notification';
import {
    addDepartment,
    deleteDepartment,
    getAllDepartments,
    updateDepartment
} from '../../../../redux/departments/actions';

const styles = {};

class Department extends React.Component {
    constructor(props) {
        super(props);

        const { intl } = props;
        this.editingPromiseResolve = () => {
        };
        this.state = {
            columns: [
                {
                    title: intl.formatMessage({ id: 'textfield.code' }) + '*',
                    field: 'departmentCode',
                    cellStyle: {
                        width: 140,
                        maxWidth: 140
                    },
                    headerStyle: {
                        width: 300,
                        maxWidth: 300
                    }
                },
                {
                    title: intl.formatMessage({ id: 'textfield.name' }),
                    field: 'departmentName',
                    cellStyle: {
                        width: 140,
                        maxWidth: 140
                    },
                    headerStyle: {
                        width: 300,
                        maxWidth: 300
                    }
                },
                {
                    title: intl.formatMessage({ id: 'textfield.description' }),
                    field: 'departmentDescription',
                    cellStyle: {
                        width: 140,
                        maxWidth: 140
                    },
                    headerStyle: {
                        width: 300,
                        maxWidth: 300
                    }
                },
                {
                    title: intl.formatMessage({ id: 'date.creation_date' }),
                    field: 'departmentCreatedAt',
                    type: 'date',
                    editable: 'never',
                    cellStyle: {
                        width: 140,
                        maxWidth: 140
                    },
                    headerStyle: {
                        width: 300,
                        maxWidth: 300
                    }
                },
                {
                    title: intl.formatMessage({ id: 'date.last_update_date' }),
                    field: 'departmentUpdatedAt',
                    type: 'date',
                    editable: 'never',
                    cellStyle: {
                        width: 300,
                        maxWidth: 140
                    },
                    headerStyle: {
                        width: 300,
                        maxWidth: 300
                    }
                },
            ]
        };
    }

    componentDidMount() {
        const { getAllDepartments } = this.props;
        getAllDepartments();
    }

    render() {
        const {
            location, intl, allDepartments, addDepartment, errors, isLoading, departmentResponse, getAllDepartments, updateDepartment, deleteDepartment
        } = this.props;
        const { columns } = this.state;
        // Sent resolve to editing promises
        (!isLoading && departmentResponse) && this.editingPromiseResolve(departmentResponse);
        (!isLoading && !departmentResponse) && this.editingPromiseResolve(errors);
        return (
            <div>
                <HelmetCustom location={location} />
                <MaterialTable
                    title=""
                    columns={columns}
                    data={allDepartments && allDepartments}
                    options={{
                        exportFileName: intl.formatMessage({ id: 'departments' }),
                        filtering: true,
                        grouping: true,
                        exportButton: true,
                        pageSize: 10,
                        actionsCellStyle: {
                            paddingLeft: 30,
                            width: 120,
                            maxWidth: 120,
                        },
                    }}

                    editable={{
                        onRowAdd: newData => new Promise((resolve) => {
                            // add Department action
                            addDepartment(newData);
                            this.editingPromiseResolve = resolve;
                        }).then((result) => {
                            if (isString(result)) {
                                // Fetch data
                                getAllDepartments();
                                notification('success', result);
                            } else {
                                notification('danger', result);
                            }
                        }),
                        onRowUpdate: (newData) => new Promise((resolve) => {
                            // update Department action
                            updateDepartment(newData);
                            this.editingPromiseResolve = resolve;
                        }).then((result) => {
                            if (isString(result)) {
                                // Fetch data
                                getAllDepartments();
                                notification('success', result);
                            } else {
                                notification('danger', result);
                            }
                        }),
                        onRowDelete: oldData => new Promise((resolve) => {
                            // delete Department action
                            console.log(oldData.departmentId);
                            deleteDepartment(oldData.departmentId);
                            this.editingPromiseResolve = resolve;
                        }).then((result) => {
                            if (isString(result)) {
                                // Fetch data
                                getAllDepartments();
                                notification('success', result);
                            } else {
                                notification('danger', result);
                            }
                        }),
                    }}
                    localization={localizationMaterialTable(intl)}
                />
            </div>
        );
    }
}


Department.propTypes = {
    /** Location */
    location: PropTypes.object.isRequired,
    /** intl */
    intl: PropTypes.object.isRequired,
    /** Errors */
    errors: PropTypes.object.isRequired,
    /** isLoading */
    isLoading: PropTypes.bool.isRequired,
    /** getAllDepartments */
    getAllDepartments: PropTypes.func.isRequired,
    /** allDepartments */
    allDepartments: PropTypes.array.isRequired,
    /** addDepartment */
    addDepartment: PropTypes.func.isRequired,
    /** department Response */
    departmentResponse: PropTypes.string.isRequired,
    /** addDepartment */
    updateDepartment: PropTypes.func.isRequired,
    /** deleteDepartment */
    deleteDepartment: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
    allDepartments: state.getIn(['department']).allDepartments,
    departmentResponse: state.getIn(['department']).departmentResponse,
    isLoading: state.getIn(['department']).isLoading,
    errors: state.getIn(['department']).errors
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addDepartment,
    deleteDepartment,
    getAllDepartments,
    updateDepartment
}, dispatch);

export default withStyles(styles)(connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Department)));
