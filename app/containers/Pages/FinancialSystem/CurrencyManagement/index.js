import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import CurrencyBlock from './CurrencyBlock';

class CurrencyManagement extends React.Component {
  render() {
    const title = brand.name + ' - Companies';
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
        <PapperBlock title="Currency Management" icon="ios-person" noMargin overflowX>
          <CurrencyBlock />
        </PapperBlock>
      </div>
    );
  }
}

export default CurrencyManagement;
