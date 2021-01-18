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
    addMachine,
    deleteMachine,
    getAllMachines,
    updateMachine
} from '../../../../redux/machines/actions';

const styles = {};

class Machine extends React.Component {
    constructor(props) {
        super(props);

        const { intl } = props;
        this.editingPromiseResolve = () => {
        };
        this.state = {
            columns: [
                {
                    title: intl.formatMessage({ id: 'textfield.type' }) + '*',
                    field: 'machineType',
                    cellStyle: {
                        width: 140,
                        maxWidth: 140
                    },
                    headerStyle: {
                        width: 140,
                        maxWidth: 140
                    }
                },
                {
                    title: intl.formatMessage({ id: 'machine.brand' }),
                    field: 'machineBrand',
                    cellStyle: {
                        width: 140,
                        maxWidth: 140
                    },
                    headerStyle: {
                        width: 140,
                        maxWidth: 140
                    }
                },
                {
                    title: intl.formatMessage({ id: 'machine.model' }),
                    field: 'machineModel',
                    cellStyle: {
                        width: 140,
                        maxWidth: 140
                    },
                    headerStyle: {
                        width: 140,
                        maxWidth: 140
                    }
                },
                {
                    title: intl.formatMessage({ id: 'machine.address_mac' }) + '*',
                    field: 'machineMacAddress',
                    cellStyle: {
                        width: 140,
                        maxWidth: 140
                    },
                    headerStyle: {
                        width: 140,
                        maxWidth: 140
                    }
                },
                {
                    title: intl.formatMessage({ id: 'machine.serial_number' }) + '*',
                    field: 'machineSerialNumber',
                    cellStyle: {
                        width: 140,
                        maxWidth: 140
                    },
                    headerStyle: {
                        width: 140,
                        maxWidth: 140
                    }
                },
                {
                    title: intl.formatMessage({ id: 'machine.netbios_name' }),
                    field: 'machineNetBiosName',
                    cellStyle: {
                        width: 140,
                        maxWidth: 140
                    },
                    headerStyle: {
                        width: 140,
                        maxWidth: 140
                    }
                },
                {
                    title: intl.formatMessage({ id: 'date.creation_date' }),
                    field: 'machineCreatedAt',
                    type: 'date',
                    editable: 'never',
                    cellStyle: {
                        width: 140,
                        maxWidth: 140
                    },
                    headerStyle: {
                        width: 140,
                        maxWidth: 140
                    }
                },
                {
                    title: intl.formatMessage({ id: 'date.last_update_date' }),
                    field: 'machineUpdatedAt',
                    type: 'date',
                    editable: 'never',
                    cellStyle: {
                        width: 140,
                        maxWidth: 140
                    },
                    headerStyle: {
                        width: 140,
                        maxWidth: 140
                    }
                },
            ]
        };
    }

    componentDidMount() {
        const { getAllMachines } = this.props;
        getAllMachines();
    }

    render() {
        const {
            location, intl, allMachines, addMachine, errors, isLoading, machineResponse, getAllMachines, updateMachine, deleteMachine
        } = this.props;
        const { columns } = this.state;
        // Sent resolve to editing promises
        (!isLoading && machineResponse) && this.editingPromiseResolve(machineResponse);
        (!isLoading && !machineResponse) && this.editingPromiseResolve(errors);
        return (
            <div>
                <HelmetCustom location={location} />
                <MaterialTable
                    title=""
                    columns={columns}
                    data={allMachines && allMachines}
                    options={{
                        exportFileName: intl.formatMessage({ id: 'machines' }),
                        filtering: true,
                        grouping: true,
                        exportButton: true,
                        pageSize: 10,
                        actionsCellStyle: {
                            paddingLeft: 30,
                            width: 140,
                            maxWidth: 140,
                        },
                    }}

                    editable={{
                        onRowAdd: newData => new Promise((resolve) => {
                            // add Machine action
                            addMachine(newData);
                            this.editingPromiseResolve = resolve;
                        }).then((result) => {
                            if (isString(result)) {
                                // Fetch data
                                getAllMachines();
                                notification('success', result);
                            } else {
                                notification('danger', result);
                            }
                        }),
                        onRowUpdate: (newData) => new Promise((resolve) => {
                            // update Machine action
                            updateMachine(newData);
                            this.editingPromiseResolve = resolve;
                        }).then((result) => {
                            if (isString(result)) {
                                // Fetch data
                                getAllMachines();
                                notification('success', result);
                            } else {
                                notification('danger', result);
                            }
                        }),
                        onRowDelete: oldData => new Promise((resolve) => {
                            // delete Machine action
                            console.log(oldData.machineId);
                            deleteMachine(oldData.machineId);
                            this.editingPromiseResolve = resolve;
                        }).then((result) => {
                            if (isString(result)) {
                                // Fetch data
                                getAllMachines();
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


Machine.propTypes = {
    /** Location */
    location: PropTypes.object.isRequired,
    /** intl */
    intl: PropTypes.object.isRequired,
    /** Errors */
    errors: PropTypes.object.isRequired,
    /** isLoading */
    isLoading: PropTypes.bool.isRequired,
    /** getAllMachines */
    getAllMachines: PropTypes.func.isRequired,
    /** allMachines */
    allMachines: PropTypes.array.isRequired,
    /** addMachine */
    addMachine: PropTypes.func.isRequired,
    /** machine Response */
    machineResponse: PropTypes.string.isRequired,
    /** addMachine */
    updateMachine: PropTypes.func.isRequired,
    /** deleteMachine */
    deleteMachine: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
    allMachines: state.getIn(['machine']).allMachines,
    machineResponse: state.getIn(['machine']).machineResponse,
    isLoading: state.getIn(['machine']).isLoading,
    errors: state.getIn(['machine']).errors
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addMachine,
    deleteMachine,
    getAllMachines,
    updateMachine
}, dispatch);

export default withStyles(styles)(connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Machine)));
