import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import ContractBlock from './ContractBlock';

class Contract extends React.Component {
  render() {
    const title = brand.name + ' - Client Contracts';
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
        <PapperBlock title="Client Contracts" icon="ios-paper" noMargin overflowX>
          <ContractBlock />
        </PapperBlock>
      </div>
    );
  }
}

export default Contract;
