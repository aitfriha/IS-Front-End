import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import MaterialTable from 'material-table';
import { PropTypes } from 'prop-types';
import { injectIntl } from 'react-intl';
import { bindActionCreators } from 'redux';
import { isEmpty, isString } from 'lodash';
import { connect } from 'react-redux';
import HelmetCustom from '../../../../../app/components/HelmetCustom/HelmetCustom';
import localizationMaterialTable from '../../../../../app/api/localizationMaterialUI/localizationMaterialTable';
import notification from '../../../../../app/components/Notification/Notification';
import {
    addSubjectField,
    deleteSubjectField,
    getAllSubjectFields,
    updateSubjectField
} from '../../../../redux/subjectFields/actions';
import { getAllSubjects } from '../../../../redux/subjects/actions';

const styles = {};

class SubjectField extends React.Component {
    constructor(props) {
        super(props);

        const { intl } = props;
        this.editingPromiseResolve = () => {
        };
        this.state = {
            columns: [
                {
                    title: intl.formatMessage({ id: 'textfield.code' }) + '*',
                    field: 'subjectFieldCode',
                    cellStyle: {
                        width: 140,
                        maxWidth: 140
                    },
                    headerStyle: {
                        width: 230,
                        maxWidth: 230
                    }
                },
                {
                    title: intl.formatMessage({ id: 'subject' }) + '*',
                    field: 'subjectCode',
                    /* lookup: {
                        1: 'M_CDM',
                        2: 'SM_APP',
                        3: 'SM_CON',
                        4: 'FO_APP'
                    }, */
                    cellStyle: {
                        width: 140,
                        maxWidth: 140
                    },
                    headerStyle: {
                        width: 230,
                        maxWidth: 230
                    }
                },
                {
                    title: intl.formatMessage({ id: 'textfield.description' }),
                    field: 'subjectFieldDescription',
                    cellStyle: {
                        width: 140,
                        maxWidth: 140
                    },
                    headerStyle: {
                        width: 230,
                        maxWidth: 230
                    }
                },
                {
                    title: intl.formatMessage({ id: 'date.creation_date' }),
                    field: 'subjectFieldCreatedAt',
                    type: 'date',
                    editable: 'never',
                    cellStyle: {
                        width: 140,
                        maxWidth: 140
                    },
                    headerStyle: {
                        width: 230,
                        maxWidth: 230
                    }
                },
                {
                    title: intl.formatMessage({ id: 'date.last_update_date' }),
                    field: 'subjectFieldUpdatedAt',
                    type: 'date',
                    editable: 'never',
                    cellStyle: {
                        width: 230,
                        maxWidth: 140
                    },
                    headerStyle: {
                        width: 230,
                        maxWidth: 230
                    }
                },
            ]
        };
    }

    static getDerivedStateFromProps(props, state) {
        const { allSubjects } = props;
        const subjectColumnLookupAdapter = (allSubjects) => {
            const lookup = {};
            allSubjects.forEach(m => {
                lookup[m.subjectCode] = m.subjectCode;
            });
            return lookup;
        };
        if (!isEmpty(allSubjects)) {
            state.columns.find(e => e.field === 'subjectCode').lookup = subjectColumnLookupAdapter(allSubjects);
            return state.columns;
        }

        // Return null if the state hasn't changed
        return null;
    }

    componentDidMount() {
        const { getAllSubjectFields, getAllSubjects } = this.props;
        getAllSubjectFields();
        getAllSubjects();
    }

    render() {
        const {
            location, intl, allSubjectFields, addSubjectField, errors, isLoading, subjectFieldsResponse, getAllSubjectFields, updateSubjectField, deleteSubjectField
        } = this.props;
        const { columns } = this.state;
        // Sent resolve to editing promises
        (!isLoading && subjectFieldsResponse) && this.editingPromiseResolve(subjectFieldsResponse);
        (!isLoading && !subjectFieldsResponse) && this.editingPromiseResolve(errors);
        return (
            <div>
                <HelmetCustom location={location} />
                <MaterialTable
                    title=""
                    columns={columns}
                    data={allSubjectFields && allSubjectFields}
                    options={{
                        exportFileName: intl.formatMessage({ id: 'fields' }),
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
                            // add SubjectField action
                            addSubjectField(newData);
                            this.editingPromiseResolve = resolve;
                        }).then((result) => {
                            if (isString(result)) {
                                // Fetch data
                                getAllSubjectFields();
                                notification('success', result);
                            } else {
                                notification('danger', result);
                            }
                        }),
                        onRowUpdate: (newData) => new Promise((resolve) => {
                            // update SubjectField action
                            updateSubjectField(newData);
                            this.editingPromiseResolve = resolve;
                        }).then((result) => {
                            if (isString(result)) {
                                // Fetch data
                                getAllSubjectFields();
                                notification('success', result);
                            } else {
                                notification('danger', result);
                            }
                        }),
                        onRowDelete: oldData => new Promise((resolve) => {
                            // delete SubjectField action
                            console.log(oldData.subjectFieldId);
                            deleteSubjectField(oldData.subjectFieldId);
                            this.editingPromiseResolve = resolve;
                        }).then((result) => {
                            if (isString(result)) {
                                // Fetch data
                                getAllSubjectFields();
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


SubjectField.propTypes = {
    /** Location */
    location: PropTypes.object.isRequired,
    /** intl */
    intl: PropTypes.object.isRequired,
    /** Errors */
    errors: PropTypes.object.isRequired,
    /** isLoading */
    isLoading: PropTypes.bool.isRequired,
    /** getAllSubjectFields */
    getAllSubjectFields: PropTypes.func.isRequired,
    /** allSubjectFields */
    allSubjectFields: PropTypes.array.isRequired,
    /** addSubjectField */
    addSubjectField: PropTypes.func.isRequired,
    /** subjectField Response */
    subjectFieldsResponse: PropTypes.string.isRequired,
    /** addSubjectField */
    updateSubjectField: PropTypes.func.isRequired,
    /** deleteSubjectField */
    deleteSubjectField: PropTypes.func.isRequired,
    /** getAllSubjects */
    getAllSubjects: PropTypes.func.isRequired,
    /** allSubjects */
    allSubjects: PropTypes.array.isRequired,
};


const mapStateToProps = state => ({
    allSubjects: state.getIn(['subject']).allSubjects,
    allSubjectFields: state.getIn(['subjectFields']).allSubjectFields,
    subjectFieldsResponse: state.getIn(['subjectFields']).subjectFieldsResponse,
    isLoading: state.getIn(['subjectFields']).isLoading,
    errors: state.getIn(['subjectFields']).errors
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addSubjectField,
    deleteSubjectField,
    getAllSubjectFields,
    updateSubjectField,
    getAllSubjects
}, dispatch);

export default withStyles(styles)(connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(SubjectField)));
