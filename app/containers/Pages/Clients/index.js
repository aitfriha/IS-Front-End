import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from './clients-jss';
import ClientBlockMapped from './ClientBlock';

class Client extends React.Component {
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
          title="Clients"
          desc="The company Clients"
          icon="ios-people-outline"
          noMargin
          overflowX
        >
          <ClientBlockMapped />
        </PapperBlock>
      </div>
    );
  }
}
Client.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Client);
