import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import getHtmlTitle from 'dan-api/dummy/getHtmlTitle';
import brand from 'dan-api/dummy/brand';

class HelmetCustom extends React.Component {
  render() {
    const { location } = this.props;
    const title = brand.name + getHtmlTitle(location);
    const description = brand.desc;
    return (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Helmet>
    );
  }
}
HelmetCustom.propTypes = {
  location: PropTypes.object.isRequired
};
export default HelmetCustom;
