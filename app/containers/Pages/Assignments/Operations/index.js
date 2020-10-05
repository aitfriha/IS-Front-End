import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import PropTypes from 'prop-types';
import OperationBlock from './OperationBlock';


class Operation extends React.Component {
  render() {
    const title = brand.name + ' - Assignments';
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
        <PapperBlock title="Workers Assignment" desc="" icon="ios-more">
          <OperationBlock />
        </PapperBlock>
      </div>
    );
  }
}
Operation.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default Operation;
