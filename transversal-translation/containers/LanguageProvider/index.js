/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import {
  groupBy, isEmpty, map, zipObject
} from 'lodash';
import { bindActionCreators } from 'redux';
import { getAllDefaultSentences } from '../../redux/defaultSentences/actions';
import {
  getAllTranslateSentences,
  getAllTranslateSentencesDistinctCountryLanguage
} from '../../redux/translateSentences/actions';

const addLocaleData = require('react-intl').addLocaleData; //eslint-disable-line

export class LanguageProvider extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      sentences: {},
    };
  }

  static getDerivedStateFromProps(nextProps) {
    const mapIt = (data) => zipObject(map(data, 'code'), map(data, 'value'));

    const countryLanguageSentencesList = {};

    const { allDefaultSentences, allTranslateSentences, systemTranslateLanguages } = nextProps;


    if (!isEmpty(allDefaultSentences)) {
      // Prepare default country language sentences
      const sentences = {
        'en-US': mapIt(allDefaultSentences)
      };

      if (!isEmpty(allTranslateSentences)) {
        // Clone default sentences into translate messages
        const defaultSentencesEmptyValues = { ...sentences['en-US'] };

        // Add empty country language objects
        systemTranslateLanguages.forEach(l => {
          countryLanguageSentencesList[l] = { ...defaultSentencesEmptyValues };
        });

        // Group translate sentences
        const groupByCountryLanguage = groupBy(allTranslateSentences, 'countryLanguageCode');

        // Iterate for each country language sentences list and add the corresponding translation to it
        systemTranslateLanguages.forEach(l => {
          groupByCountryLanguage[l].forEach(s => {
            countryLanguageSentencesList[l][s.defaultSentenceCode] = s.translation;
          });

          // eslint-disable-next-line import/no-dynamic-require
          addLocaleData([...require('react-intl/locale-data/' + l.slice(0, 2))]);
        });

        return { sentences: Object.assign({}, sentences, countryLanguageSentencesList) };
      }
      return { sentences };
    }
    return null;
  }

  componentDidMount() {
    addLocaleData([...require('react-intl/locale-data/en')]);

    const { getAllDefaultSentences, getAllTranslateSentences, getAllTranslateSentencesDistinctCountryLanguage } = this.props;
    getAllDefaultSentences();
    getAllTranslateSentences();
    getAllTranslateSentencesDistinctCountryLanguage();
  }

  render() {
    const {
      locale, children
    } = this.props;

    const { sentences } = this.state;

    return (
      <Fragment>
        {!isEmpty(sentences) && (
          <IntlProvider
            locale={locale}
            key={locale}
            messages={sentences[locale]}
          >
            {React.Children.only(children)}
          </IntlProvider>
        )}
      </Fragment>
    );
  }
}

LanguageProvider.propTypes = {
  locale: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  getAllTranslateSentences: PropTypes.func.isRequired,
  getAllTranslateSentencesDistinctCountryLanguage: PropTypes.func.isRequired,
  getAllDefaultSentences: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  allTranslateSentences: state.getIn(['translateSentences']).allTranslateSentences,
  systemTranslateLanguages: state.getIn(['translateSentences']).systemTranslateLanguages,
  allDefaultSentences: state.getIn(['defaultSentences']).allDefaultSentences,
  locale: state.getIn(['translateSentences']).locale
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllDefaultSentences,
  getAllTranslateSentences,
  getAllTranslateSentencesDistinctCountryLanguage
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LanguageProvider);
