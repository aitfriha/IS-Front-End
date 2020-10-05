import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import IvaBlock from './ivaBlock';

class IVA extends React.Component {
  render() {
    const title = brand.name + ' - Blank Page';
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
        <PapperBlock title="IVA Taxes" icon="ios-settings" desc="configuration of IVA taxes for every country.">
          <IvaBlock />
        </PapperBlock>
      </div>
    );
  }
}

export default IVA;
