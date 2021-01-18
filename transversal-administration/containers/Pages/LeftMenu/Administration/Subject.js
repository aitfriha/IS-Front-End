import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import MaterialTable from 'material-table';
import { PropTypes } from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { bindActionCreators } from 'redux';
import { isEmpty, isString } from 'lodash';
import { connect } from 'react-redux';
import HelmetCustom from '../../../../../app/components/HelmetCustom/HelmetCustom';
import localizationMaterialTable from '../../../../../app/api/localizationMaterialUI/localizationMaterialTable';
import notification from '../../../../../app/components/Notification/Notification';
import {
    addSubject,
    deleteSubject,
    getAllSubjects,
    updateSubject
} from '../../../../redux/subjects/actions';

const styles = {};

class Subject extends React.Component {
    constructor(props) {
        super(props);

        const { intl } = props;
        this.editingPromiseResolve = () => {
        };
        this.state = {
            columns: [
                {
                    title: intl.formatMessage({ id: 'subject.code' }) + '*',
                    field: 'subjectCode',
                    cellStyle: {
                        width: 140,
                        maxWidth: 140
                    },
                    headerStyle: {
                        width: 200,
                        maxWidth: 200
                    }
                },
                {
                    title: intl.formatMessage({ id: 'subject.type' }),
                    field: 'subjectType',
                    lookup: {
                        module: <FormattedMessage
                            id="module"
                        />,
                        'sub-module': <FormattedMessage
                            id="sub_module"
                        />,
                        form: <FormattedMessage
                            id="form"
                        />,
                        table: <FormattedMessage
                            id="table"
                        />,
                        field: <FormattedMessage
                            id="field"
                        />
                    },
                    cellStyle: {
                        width: 140,
                        maxWidth: 140
                    },
                    headerStyle: {
                        width: 200,
                        maxWidth: 200
                    }
                },
                {
                    title: intl.formatMessage({ id: 'subject.parent' }) + '*',
                    field: 'subjectParent.subjectCode',
                    lookup: { without_subject_parent: <FormattedMessage id="subject.without_subject_parent" /> },
                    cellStyle: {
                        width: 140,
                        maxWidth: 140
                    },
                    headerStyle: {
                        width: 200,
                        maxWidth: 200
                    }
                },
                {
                    title: intl.formatMessage({ id: 'textfield.description' }),
                    field: 'subjectDescription',
                    cellStyle: {
                        width: 140,
                        maxWidth: 140
                    },
                    headerStyle: {
                        width: 200,
                        maxWidth: 200
                    }
                },
                {
                    title: intl.formatMessage({ id: 'date.creation_date' }),
                    field: 'subjectCreatedAt',
                    type: 'date',
                    editable: 'never',
                    cellStyle: {
                        width: 140,
                        maxWidth: 140
                    },
                    headerStyle: {
                        width: 200,
                        maxWidth: 200
                    }
                },
                {
                    title: intl.formatMessage({ id: 'date.last_update_date' }),
                    field: 'subjectUpdatedAt',
                    type: 'date',
                    editable: 'never',
                    cellStyle: {
                        width: 200,
                        maxWidth: 140
                    },
                    headerStyle: {
                        width: 200,
                        maxWidth: 200
                    }
                },
            ]
        };
    }

    static getDerivedStateFromProps(props, state) {
        const subjectColumnLookupAdapter = (allSubjects) => {
            const lookup = {};
            lookup.without_subject_parent = props.intl.formatMessage({ id: 'subject.without_subject_parent' });
            allSubjects.forEach(m => {
                lookup[m.subjectCode] = m.subjectCode;
            });
            return lookup;
        };

        if (!isEmpty(props.allSubjects)) {
            state.columns.find(e => e.field === 'subjectParent.subjectCode').lookup = subjectColumnLookupAdapter(props.allSubjects);
            return state.columns;
        }

        // Return null if the state hasn't changed
        return null;
    }

    componentDidMount() {
        const { getAllSubjects } = this.props;
        getAllSubjects();
    }

    render() {
        const {
            location, intl, allSubjects, addSubject, errors, isLoading, subjectResponse, getAllSubjects, updateSubject, deleteSubject
        } = this.props;
        const { columns } = this.state;
        // Sent resolve to editing promises
        (!isLoading && subjectResponse) && this.editingPromiseResolve(subjectResponse);
        (!isLoading && !subjectResponse) && this.editingPromiseResolve(errors);
        return (
            <div>
                <HelmetCustom location={location} />
                <MaterialTable
                    title=""
                    columns={columns}
                    data={allSubjects && allSubjects}
                    options={{
                        exportFileName: intl.formatMessage({ id: 'subjects' }),
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
                            const values = Object.assign({}, newData, {
                                subjectParent: newData.subjectParent.subjectCode
                            });
                            console.log(values);
                            addSubject(values);
                            this.editingPromiseResolve = resolve;
                        }).then((result) => {
                            if (isString(result)) {
                                // Fetch data
                                getAllSubjects();
                                notification('success', result);
                            } else {
                                notification('danger', result);
                            }
                        }),
                        onRowUpdate: (newData) => new Promise((resolve) => {
                            // update Subject action
                            updateSubject(newData);
                            this.editingPromiseResolve = resolve;
                        }).then((result) => {
                            if (isString(result)) {
                                // Fetch data
                                getAllSubjects();
                                notification('success', result);
                            } else {
                                notification('danger', result);
                            }
                        }),
                        onRowDelete: oldData => new Promise((resolve) => {
                            // delete Subject action
                            deleteSubject(oldData.subjectId);
                            this.editingPromiseResolve = resolve;
                        }).then((result) => {
                            if (isString(result)) {
                                // Fetch data
                                getAllSubjects();
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


Subject.propTypes = {
    /** Location */
    location: PropTypes.object.isRequired,
    /** intl */
    intl: PropTypes.object.isRequired,
    /** Errors */
    errors: PropTypes.object.isRequired,
    /** isLoading */
    isLoading: PropTypes.bool.isRequired,
    /** getAllSubjects */
    getAllSubjects: PropTypes.func.isRequired,
    /** allSubjects */
    allSubjects: PropTypes.array.isRequired,
    /** addSubject */
    addSubject: PropTypes.func.isRequired,
    /** subject Response */
    subjectResponse: PropTypes.string.isRequired,
    /** addSubject */
    updateSubject: PropTypes.func.isRequired,
    /** deleteSubject */
    deleteSubject: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
    allSubjects: state.getIn(['subject']).allSubjects,
    subjectResponse: state.getIn(['subject']).subjectResponse,
    isLoading: state.getIn(['subject']).isLoading,
    errors: state.getIn(['subject']).errors
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addSubject,
    deleteSubject,
    getAllSubjects,
    updateSubject
}, dispatch);

export default withStyles(styles)(connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Subject)));
