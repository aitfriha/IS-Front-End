import React from 'react';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'dan-components';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import brand from 'dan-api/dummy/brand';
import styles from './Contact-jss';
import ContactBlock from './ContactBlock';

class Contact extends React.Component {
  render() {
    const title = brand.name + ' - Sectors';
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
        <PapperBlock title="Contacts" icon="ios-people-outline" desc="" noMargin>
          <ContactBlock />
        </PapperBlock>
      </div>
    );
  }
}
Contact.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Contact);
