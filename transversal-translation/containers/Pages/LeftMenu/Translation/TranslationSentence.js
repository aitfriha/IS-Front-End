import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { PropTypes } from 'prop-types';
import MaterialTable from 'material-table';
import Box from '@material-ui/core/Box';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import * as CountryLanguage from 'country-language';
import Slide from '@material-ui/core/Slide';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { isString } from 'lodash';
import HelmetCustom from '../../../../../app/components/HelmetCustom/HelmetCustom';
import {
  getAllTranslateSentencesByCountryLanguage,
  updateTranslateSentence
} from '../../../../redux/translateSentences/actions';
import notification from '../../../../../app/components/Notification/Notification';
import localizationMaterialTable from '../../../../../app/api/localizationMaterialUI/localizationMaterialTable';


const styles = {
  gridSizing: {
    marginTop: '1%'
  },
  buttonSpacing: {
    minHeight: 90,
    minWidth: 200
  },
  gridStyle: {
    paddingBottom: 10,
    paddingTop: 10,
  },
};

class TranslationSentence extends React.Component {
  constructor(props) {
    super(props);

    this.editingPromiseResolve = () => {
    };
    const { intl } = props;
    this.state = {
      country: null,
      language: null,
      columns: [
        {
          field: 'defaultSentenceCode',
          title: intl.formatMessage({ id: 'sentence.default_sentence_code' }),
          editable: 'never'
        },
        {
          field: 'defaultSentenceValue',
          title: intl.formatMessage({ id: 'sentence.default-sentence_value' }),
          editable: 'never'
        },
        {
          field: 'countryLanguageCode',
          title: intl.formatMessage({ id: 'sentence.country_language_code' }),
          editable: 'never'
        },
        {
          field: 'translation',
          title: intl.formatMessage({ id: 'sentence.translation' }),
        },

      ],
      showTable: false
    };
  }

    getCountriesList = () => CountryLanguage.getCountries()
      .map(value => ({
        code: value.code_2,
        name: value.name
      }));

    getCountryLanguagesList = (country) => {
      const list = [];

      CountryLanguage.getCountryLanguages(country, (err, languages) => {
        languages.forEach((languageCodes) => {
          languageCodes.iso639_1
                && CountryLanguage.getLanguage(languageCodes.iso639_1, (err, language) => {
                  list.push({
                    code: languageCodes.iso639_1,
                    name: language.name[0]
                  });
                });
        });
      });

      return list;
    };

    onChangeCountry = (e, value) => {
      this.setState({
        country: value,
        language: null,
        showTable: false
      });
    };


    onChangeLanguage = (e, value) => {
      this.setState({
        language: value,
        showTable: false
      });
    };

    showTable = () => {
      const { language, country } = this.state;
      const { getAllTranslateSentencesByCountryLanguage } = this.props;

      getAllTranslateSentencesByCountryLanguage(language.code + '-' + country.code);
      this.setState({
        showTable: true
      });
    };

    onClickLoad = () => {
      this.showTable();
    };

    render() {
      const {
        location, classes, isLoading, errors, allTranslateSentencesByCountryLanguage,
        getAllTranslateSentencesByCountryLanguage, translateSentenceResponse, updateTranslateSentence, intl
      } = this.props;
      const {
        columns, showTable, country, language
      } = this.state;

      // Sent resolve to editing promises
      (!isLoading && translateSentenceResponse) && this.editingPromiseResolve(translateSentenceResponse);
      (!isLoading && !translateSentenceResponse) && this.editingPromiseResolve(errors);

      return (
        <div>
          <HelmetCustom location={location} />
          <Grid
            className={classes.gridSizing}
            container
            spacing={10}
            alignItems="center"
            justify="center"
          >
            <Grid
              item
              xs={12}
              sm={3}
            />
            <Grid
              style={{ padding: '30px' }}
              item
              xs={12}
              sm={3}
            >
              <Box
                boxShadow={6}
                border={0}
                borderRadius={10}
                bgcolor="background.paper"
                p={1}
              >
                <Autocomplete
                  options={this.getCountriesList()}
                  getOptionLabel={option => option.name}
                  onChange={this.onChangeCountry}
                  renderInput={params => (
                    <TextField
                      style={{ width: '100%' }}
                      {...params}
                      label={(<FormattedMessage id="sentence.country" />)}
                      variant="outlined"
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid
              style={{ padding: '30px' }}
              item
              xs={12}
              sm={3}
            >
              <Box
                boxShadow={6}
                border={0}
                borderRadius={10}
                bgcolor="background.paper"
                p={1}
              >
                <Autocomplete
                  options={country ? this.getCountryLanguagesList(country.code) : []}
                  onChange={this.onChangeLanguage}
                  getOptionLabel={option => option.name}
                  value={language}
                  renderInput={params => (
                    <TextField
                      style={{ width: '100%' }}
                      {...params}
                      label={(<FormattedMessage id="sentence.language" />)}
                      variant="outlined"
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
            />
            <Button
              variant="contained"
              disabled={!country || !language}
              color="primary"
              onClick={this.onClickLoad}
              className={classes.loadstyle}
            >
              <FormattedMessage id="button.load_translation_table.label" />
            </Button>
          </Grid>
          <Slide direction="up" in={showTable} mountOnEnter unmountOnExit>
            <div>
              <MaterialTable
                title={language && country && (
                  <FormattedMessage
                    id="sentence.translation_table_from_en_us_to"
                    values={{ countryLanguage: language.code + '-' + country.code }}
                  />
                )}
                columns={columns}
                data={allTranslateSentencesByCountryLanguage && allTranslateSentencesByCountryLanguage}
                options={{
                  filtering: true,
                  draggable: true,
                  exportButton: true,
                  pageSize: 10,
                  grouping: true,
                  actionsCellStyle: {
                    paddingLeft: 30,
                    width: 120,
                    maxWidth: 120,
                  },
                }}
                editable={{
                  onRowUpdate: (newData) => new Promise((resolve) => {
                    // update sentence action
                    updateTranslateSentence(newData);
                    this.editingPromiseResolve = resolve;
                  }).then((result) => {
                    if (isString(result)) {
                      // Fetch data
                      getAllTranslateSentencesByCountryLanguage(language.code + '-' + country.code);
                      notification('success', result);
                    } else {
                      notification('danger', result);
                    }
                  })
                }}
                localization={localizationMaterialTable(intl)}
              />
            </div>
          </Slide>
        </div>
      );
    }
}

TranslationSentence.propTypes = {
  location: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  allTranslateSentencesByCountryLanguage: PropTypes.array.isRequired,
  translateSentenceResponse: PropTypes.string.isRequired,
  getAllTranslateSentencesByCountryLanguage: PropTypes.func.isRequired,
  updateTranslateSentence: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  translateSentenceResponse: state.getIn(['translateSentences']).translateSentenceResponse,
  allTranslateSentencesByCountryLanguage: state.getIn(['translateSentences']).allTranslateSentencesByCountryLanguage,
  isLoading: state.getIn(['translateSentences']).isLoading,
  errors: state.getIn(['translateSentences']).errors
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllTranslateSentencesByCountryLanguage,
  updateTranslateSentence
}, dispatch);

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(TranslationSentence)));
