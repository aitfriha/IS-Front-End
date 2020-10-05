import React from 'react';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'dan-components';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import brand from 'dan-api/dummy/brand';
import styles from './levels-jss';
import LevelsBlock from './LevelsBlock';

class FunctionalStructure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  render() {
    const title = brand.name + ' - Functional Structures';
    const description = brand.desc;
    const { data } = this.state;
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
        <PapperBlock
          title="Functional Structure Levels"
          icon="ios-person"
          noMargin
        >
          <LevelsBlock levelsConfig={data} />
        </PapperBlock>
      </div>
    );
  }
}
FunctionalStructure.propTypes = {
  classes: PropTypes.object.isRequired,
  setLevelConfig: PropTypes.func.isRequired,
  levelsConfig: PropTypes.array.isRequired
};

export default withStyles(styles)(FunctionalStructure);
