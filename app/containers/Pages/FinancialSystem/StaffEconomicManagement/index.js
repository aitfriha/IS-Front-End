import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import EconomicStaffBlock from './EconomicStaffBlock';

class StaffEconomicManagement extends React.Component {
  render() {
    const title = brand.name + ' - Economic Staff';
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
        <PapperBlock title="Economic Staff" icon="ios-person" noMargin overflowX>
          <EconomicStaffBlock />
        </PapperBlock>
      </div>
    );
  }
}

export default StaffEconomicManagement;
