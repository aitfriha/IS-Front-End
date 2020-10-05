import React from 'react';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'dan-components';
import { withStyles } from '@material-ui/core/styles';
import brand from 'dan-api/dummy/brand';
import styles from './serviceType-jss';
import ServiceTypeBlock from './serviceTypeBlock';
import AddServiceType from './addServiceType';

class ServicesType extends React.Component {
  render() {
    const title = brand.name + ' - Service Type';
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
        <PapperBlock title="Services Types" noMargin>
          <AddServiceType />
          <ServiceTypeBlock />
        </PapperBlock>
      </div>
    );
  }
}
export default withStyles(styles)(ServicesType);
