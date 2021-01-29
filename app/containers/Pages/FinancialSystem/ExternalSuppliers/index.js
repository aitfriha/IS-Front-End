import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import ExternalSuppliersBlock from './ExternalSuppliersBlock';

class ExternalSuppliersManagement extends React.Component {
  render() {
    const title = brand.name + ' - External Suppliers';
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
        <PapperBlock title="External Suppliers List" icon="ios-cash" noMargin overflowX>
          <ExternalSuppliersBlock />
        </PapperBlock>
      </div>
    );
  }
}

export default ExternalSuppliersManagement;
