import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { ThemeContext } from '../../App/ThemeWrapper';
import SelectionTypesBlock from './SelectionTypesBlock';

class SelectionTypeEvaluation extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { changeTheme } = this.props;
    changeTheme('blueCyanTheme');
  }

  render() {
    const title = brand.name + ' - Selection Type Evaluation';
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

        <SelectionTypesBlock />
      </div>
    );
  }
}

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  return <SelectionTypeEvaluation changeTheme={changeTheme} />;
};
