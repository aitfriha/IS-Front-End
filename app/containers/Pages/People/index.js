import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import PeopleBlock from './PeopleBlock';
import ClientInfoService from '../../Services/ClientInfoService';

class People extends React.Component {

  componentDidMount() {
    ClientInfoService.getClientInfo().then(res => {
      console.log(res.data.split('=')[3]);
      console.log(res.data.split('\n'));
    });
  }

  render() {
    const title = brand.name + ' - Workers';
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
        <PapperBlock title="Peoples" desc="The company Workers" icon="ios-people-outline" noMargin >
          <PeopleBlock />
        </PapperBlock>
      </div>
    );
  }
}
People.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default People;
