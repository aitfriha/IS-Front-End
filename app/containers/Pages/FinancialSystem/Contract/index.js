import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import { ThemeContext } from '../../../App/ThemeWrapper';
import ContractBlock from './ContractBlock';

class Contract extends React.Component {
  componentDidMount() {
    const { changeTheme } = this.props;
    changeTheme('redTheme');
  }

  render() {
    const title = brand.name + ' - Contracts';
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
        <PapperBlock title="Contracts" icon="ios-paper" noMargin overflowX>
          <ContractBlock />
        </PapperBlock>
      </div>
    );
  }
}

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  return <Contract changeTheme={changeTheme} />;
};
