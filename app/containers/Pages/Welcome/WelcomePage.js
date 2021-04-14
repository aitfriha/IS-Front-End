import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { connect } from 'react-redux';
import MenuButtons from 'dan-components/MenuButtons/MenuButtons';
import { PropTypes } from 'prop-types';
import { isEmpty } from 'lodash';
import history from '../../../utils/history';
import welcomecommercialpic from './welcomeCommercial.png';
import LeftSidebarLayout from '../../Templates/layouts/LeftSidebarLayout';
import { ThemeContext } from '../../App/ThemeWrapper';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
class WelcomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: ''
    };
  }

  componentDidMount() {
    //console.log(this.props.moduleName);
   // history.push('/app/gestion-commercial/welcome?the=search');
    const { changeTheme } = this.props;
    changeTheme(history.location.state.theme);
  }

  render() {
    const {moduleName,picture}=this.props;
    const title = brand.name + ' - Blank Page';
    const description = brand.desc;
    const titleException = ['/app', '/app/crm-dashboard', '/app/crypto-dashboard'];
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
        <PapperBlock title={moduleName} desc="">
          <img src={picture} alt="dd" />
          <div style={{ display: 'none' }}>
            <LeftSidebarLayout
              history={history}
              moduleName={moduleName}
              titleException={titleException}
            />
          </div>
        </PapperBlock>
      </div>
    );
  }
}
WelcomePage.propTypes = {
  /** Location */
  location: PropTypes.object.isRequired,
};
PapperBlock.defaultProps = {
  whiteBg: false,
  noMargin: false,
  colorMode: false,
  overflowX: false,
  icon: 'ios-bookmark-outline',
  desc: ''
};
const mapStateToProps = () => ({
  moduleName: localStorage.getItem('moduleName'),
  picture: localStorage.getItem('picture')
});
const WelcomePageMapped = connect(
  mapStateToProps,
  null
)(WelcomePage);
// export default BlankPage;
export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <WelcomePageMapped changeTheme={changeTheme} classes={classes} />;
};
