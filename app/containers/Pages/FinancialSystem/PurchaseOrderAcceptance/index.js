import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import PurchaseOrderBlock from './PurchaseOrderBlock';

class TypeOfCurrencyManagement extends React.Component {
  render() {
    const title = brand.name + ' - Purchase Order Acceptance';
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
        <PapperBlock title="Purchase Order Acceptance" icon="ios-cash" noMargin overflowX>
          <PurchaseOrderBlock />
        </PapperBlock>
      </div>
    );
  }
}

export default TypeOfCurrencyManagement;
