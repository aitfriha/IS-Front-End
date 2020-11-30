import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { ThemeContext } from '../../App/ThemeWrapper';
import LevelsBlock from './LevelsBlock';

class AdministrativeStructure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    const { changeTheme } = this.props;
    changeTheme('blueCyanTheme');
  }

  render() {
    const title = brand.name + ' - Administrative Structures';
    const description = brand.desc;
    const { data } = this.state;
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

        <LevelsBlock levelsConfig={data} />
      </div>
    );
  }
}

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  return <AdministrativeStructure changeTheme={changeTheme} />;
};
