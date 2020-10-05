import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Slide } from '@material-ui/core';
import StaffBlock from './StaffBlock';
import StaffProfile from './StaffProfile';

class People extends React.Component {
  state = {
    isShowProfile: false,
    staff: {}
  };

  showStaffProfile = (isShowProfile, staff) => {
    this.setState({
      isShowProfile,
      staff
    });
  };

  render() {
    const title = brand.name + ' - Staff';
    const description = brand.desc;
    const { staff, isShowProfile } = this.state;
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
        <PapperBlock
          title="Staff"
          desc="The company Staff"
          icon="ios-people-outline"
        >
          <Slide
            direction="right"
            in={!isShowProfile}
            style={{ transitionDelay: !isShowProfile ? '500ms' : '0ms' }}
            noMargin={!isShowProfile}
            mountOnEnter
            unmountOnExit
          >
            <StaffBlock showProfile={this.showStaffProfile} />
          </Slide>
          <Slide
            direction="right"
            in={isShowProfile}
            style={{ transitionDelay: isShowProfile ? '500ms' : '0ms' }}
            mountOnEnter
            unmountOnExit
          >
            <StaffProfile staff={staff} showProfile={this.showStaffProfile} />
          </Slide>
        </PapperBlock>
      </div>
    );
  }
}
People.propTypes = {
  classes: PropTypes.object.isRequired
};

export default People;
