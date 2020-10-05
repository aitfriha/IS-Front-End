import React from 'react';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'dan-components';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import brand from 'dan-api/dummy/brand';
import styles from './levels-jss';
import LevelsBlock from './LevelsBlock';
import editLevel from './editLevel';
import DragAndDropTest from './DragAndDropTest';

class FunctionalStructure extends React.Component {
  render() {
    const title = brand.name + ' - Functional Structure';
    const description = brand.desc;
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
        <PapperBlock title="Levels" icon="ios-person" noMargin overflowX>
          <LevelsBlock />
        </PapperBlock>
      </div>
    );
  }
}
FunctionalStructure.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FunctionalStructure);
