import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import { Slide } from '@material-ui/core';
import StaffBlock from './StaffBlock';
import { ThemeContext } from '../../App/ThemeWrapper';
import StaffProfile from './StaffProfile';

class Staff extends React.Component {
  state = {
    isShowProfile: false
  };

  componentDidMount() {
    const { changeTheme } = this.props;
    changeTheme('blueCyanTheme');
  }

  showStaffProfile = isShowProfile => {
    this.setState({
      isShowProfile
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
            /*noMargin={!isShowProfile}*/
            mountOnEnter
            unmountOnExit
          >
            <div>
              <StaffBlock showProfile={this.showStaffProfile} />
            </div>
          </Slide>
          <Slide
            direction="right"
            in={isShowProfile}
            style={{ transitionDelay: isShowProfile ? '500ms' : '0ms' }}
            mountOnEnter
            unmountOnExit
          >
            <div>
              <StaffProfile showProfile={this.showStaffProfile} />
            </div>
          </Slide>
        </PapperBlock>
      </div>
    );
  }
}

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  return <Staff changeTheme={changeTheme} />;
};
