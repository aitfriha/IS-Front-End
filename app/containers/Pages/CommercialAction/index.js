import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from '../Clients/clients-jss';


class CommercialAction extends React.Component {
  render() {
    const title = brand.name + ' - Clients';
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
        <PapperBlock
          title="Actions"
          desc="commercial summary"
          icon="ios-people-outline"
          noMargin
          overflowX
        >
        </PapperBlock>
      </div>
    );
  }
}
CommercialAction.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CommercialAction);
