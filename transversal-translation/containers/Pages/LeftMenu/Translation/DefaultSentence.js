import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { PropTypes } from 'prop-types';
import MaterialTable from 'material-table';
import { injectIntl } from 'react-intl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isString } from 'lodash';
import HelmetCustom from '../../../../../app/components/HelmetCustom/HelmetCustom';
import {
  addDefaultSentence,
  deleteDefaultSentence,
  getAllDefaultSentences,
  updateDefaultSentence
} from '../../../../redux/defaultSentences/actions';
import notification from '../../../../../app/components/Notification/Notification';
import localizationMaterialTable from '../../../../../app/api/localizationMaterialUI/localizationMaterialTable';

const styles = {};

class DefaultSentence extends React.Component {
  constructor(props) {
    super(props);
    const { intl } = props;
    this.editingPromiseResolve = () => {
    };

    this.state = {
      columns: [
        {
          field: 'code',
          title: intl.formatMessage({ id: 'sentence.code' }),
          // hidden: !Ability.can('consult', 'code')
        },
        {
          field: 'value',
          title: intl.formatMessage({ id: 'sentence.default_value' })
        }

      ]
    };
  }

  componentDidMount() {
    const { getAllDefaultSentences } = this.props;
    getAllDefaultSentences();
  }

  render() {
    const {
      location, addDefaultSentence, errors, isLoading, defaultSentenceResponse, getAllDefaultSentences, allDefaultSentences, updateDefaultSentence, deleteDefaultSentence, intl
    } = this.props;
    const { columns } = this.state;

    // Sent resolve to editing promises
    (!isLoading && defaultSentenceResponse) && this.editingPromiseResolve(defaultSentenceResponse);
    (!isLoading && !defaultSentenceResponse) && this.editingPromiseResolve(errors);

    return (
      <div>
        <HelmetCustom location={location} />
        <MaterialTable
          title=""
          columns={columns}
          data={allDefaultSentences && allDefaultSentences}
          options={{
            // TODO: add this option exportAllData & doubleHorizontalScroll to all material-tables
            // TODO: create a component where we can generalize material-table instead of putting the same code in many components
            exportAllData: true,
            doubleHorizontalScroll: true,
            grouping: true,
            filtering: true,
            draggable: true,
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
              // add sentence action
              addDefaultSentence(newData);
              this.editingPromiseResolve = resolve;
            }).then((result) => {
              if (isString(result)) {
                // Fetch data
                getAllDefaultSentences();
                notification('success', result);
              } else {
                notification('danger', result);
              }
            }),
            onRowUpdate: (newData) => new Promise((resolve) => {
              // update sentence action
              updateDefaultSentence(newData);
              this.editingPromiseResolve = resolve;
            }).then((result) => {
              if (isString(result)) {
                // Fetch data
                getAllDefaultSentences();
                notification('success', result);
              } else {
                notification('danger', result);
              }
            }),
            onRowDelete: oldData => new Promise((resolve) => {
              // delete sentence action
              deleteDefaultSentence(oldData.defaultSentenceId);
              this.editingPromiseResolve = resolve;
            }).then((result) => {
              if (isString(result)) {
                // Fetch data
                getAllDefaultSentences();
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

DefaultSentence.propTypes = {
  /** Location */
  location: PropTypes.object.isRequired,
  /** Errors */
  errors: PropTypes.object.isRequired,
  /** IsLoading */
  isLoading: PropTypes.bool.isRequired,
  /** DefaultSentenceResponse */
  defaultSentenceResponse: PropTypes.string.isRequired,
  /** AllDefaultSentences */
  allDefaultSentences: PropTypes.array.isRequired,
  /** AddDefaultSentence */
  addDefaultSentence: PropTypes.func.isRequired,
  /** UpdateDefaultSentence */
  updateDefaultSentence: PropTypes.func.isRequired,
  /** DeleteDefaultSentence */
  deleteDefaultSentence: PropTypes.func.isRequired,
  /** GetAllDefaultSentences */
  getAllDefaultSentences: PropTypes.func.isRequired,
  /** intl */
  intl: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  allDefaultSentences: state.getIn(['defaultSentences']).allDefaultSentences,
  defaultSentenceResponse: state.getIn(['defaultSentences']).defaultSentenceResponse,
  isLoading: state.getIn(['defaultSentences']).isLoading,
  errors: state.getIn(['defaultSentences']).errors
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addDefaultSentence,
  updateDefaultSentence,
  deleteDefaultSentence,
  getAllDefaultSentences
}, dispatch);

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(DefaultSentence)));
