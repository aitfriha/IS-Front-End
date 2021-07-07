import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { connect } from 'react-redux';
import classNames from 'classnames';
import MenuButtons from 'dan-components/MenuButtons/MenuButtons';
import Typography from '@material-ui/core/Typography';
import Ionicon from 'react-ionicons';
import { Redirect } from 'react-router-dom';
import { ThemeContext } from '../../App/ThemeWrapper';
import history from '../../../utils/history';
import welcomecommercialpic from '../Welcome/welcomeCommercial.png';
import welcomefinancialpic from '../Welcome/welcomeFinancial.png';
import welcomeRhpic from '../Welcome/welcomeRh.png';
import welcomeOperative from '../Welcome/welcomeOperatingSystem.png';
import welcomeAdministration from '../Welcome/welcomeAdministration.png';
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
class BlankPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this._confirm);
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = this._backConfirm;
  }

  _backConfirm = async () => {
    history.push({
      pathname: '/app',
      search: '?the=search',
      state: { picture: welcomecommercialpic, moduleName: 'Welcome to commercial module', theme: 'redTheme' }
    });
  }

  gowTo= (data) => {
    if (data === 'commercial') {
      history.push({
        pathname: '/app/gestion-commercial/welcome',
        search: '?the=search',
        state: { picture: welcomecommercialpic, moduleName: 'Welcome to commercial module', theme: 'redTheme' }
      });
      localStorage.setItem('picture', welcomecommercialpic);
      localStorage.setItem('moduleName', 'Welcome to commercial module');
    }
    if (data === 'financial') {
      history.push({
        pathname: '/app/gestion-commercial/welcome',
        search: '?the=search',
        state: { picture: welcomefinancialpic, moduleName: 'Welcome to financial module', theme: 'greyTheme' }
      });
      localStorage.setItem('picture', welcomefinancialpic);
      localStorage.setItem('moduleName', 'Welcome to financial module');
    }
    if (data === 'rh') {
      history.push({
        pathname: '/app/gestion-commercial/welcome',
        search: '?the=search',
        state: { picture: welcomeRhpic, moduleName: 'Welcome to human resources module', theme: 'blueCyanTheme' }
      });
      localStorage.setItem('picture', welcomeRhpic);
      localStorage.setItem('moduleName', 'Welcome to human resources module');
    }
    if (data === 'operative module') {
      history.push({
        pathname: '/app/gestion-commercial/welcome',
        search: '?the=search',
        state: { picture: welcomeOperative, moduleName: 'Welcome to operating systems module', theme: 'greenTheme' }
      });
      localStorage.setItem('picture', welcomeOperative);
      localStorage.setItem('moduleName', 'Welcome to operating systems module');
    }
    if (data === 'administration') {
      history.push({
        pathname: '/app/gestion-commercial/welcome',
        search: '?the=search',
        state: { picture: welcomeAdministration, moduleName: 'Welcome to administration module', theme: 'purpleRedTheme' }
      });
      localStorage.setItem('picture', welcomeAdministration);
      localStorage.setItem('moduleName', 'Welcome to administration module');
    }
  }

  render() {
    const {
      logedUser
    } = this.props;
    const thelogedUser = JSON.parse(logedUser);
    const {
      whiteBg,
      noMargin,
      colorMode,
      overflowX,
    } = this.props;
    const { classes } = this.props;
    const title = brand.name + ' - Blank Page';
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
        <PapperBlock title="Welcome to internal systems" desc="">
          <div className="MuiGrid-root jss2678 MuiGrid-container">
            <Grid container spacing={1}>
              <Grid container item xs={12} spacing={3}>
                { thelogedUser.userRoles[0].actionsNames.commercial_titleType_access ? (
                  <Grid item xs={4} onClick={() => this.gowTo('commercial')}>
                    <MenuButtons
                    /*      buttonPath="/app/gestion-commercial/welcome" */
                      buttonTitle="Commercial"
                      color="red"
                      icon="ios-folder-open-outline"
                      disabled={false}
                    /* onClick={() => this.gowTo('commercial', 'commercial')} */
                    />
                  </Grid>
                )
                  : (
                    <Grid item xs={4} >
                      <MenuButtons
                      /*      buttonPath="/app/gestion-commercial/welcome" */
                        buttonTitle="Commercial"
                        color="red"
                        icon="ios-folder-open-outline"
                        disabled={true}
                      /* onClick={() => this.gowTo('commercial', 'commercial')} */
                      />
                    </Grid>
                  )}
                { thelogedUser.userRoles[0].actionsNames.financialModule_expensesManagement_access ? (
                  <Grid item xs={4} onClick={() => this.gowTo('financial')}>
                    <MenuButtons
                      buttonPath="/app/gestion-financial/Contracts"
                      buttonTitle="financial"
                      color="#90A4AE"
                      icon="ios-cash-outline"
                      disabled={false}
                    />
                  </Grid>
                )
                  : (
                    <Grid item xs={4} >
                      <MenuButtons
                        buttonPath="/app/gestion-financial/Contracts"
                        buttonTitle="financial"
                        color="#90A4AE"
                        icon="ios-cash-outline"
                        disabled={true}
                      />
                    </Grid>
                  )}
                { thelogedUser.userRoles[0].actionsNames.hh_absenceRequest_access ? (
                  <Grid item xs={4} onClick={() => this.gowTo('rh')}>
                    <MenuButtons
                      buttonPath="/app/hh-rr/staff"
                      buttonTitle="hh.rr system"
                      color="#00BCD4"
                      icon="ios-people-outline"
                      disabled={false}
                    />
                  </Grid>
                ) : (
                  <Grid item xs={4} >
                    <MenuButtons
                      buttonPath="/app/hh-rr/staff"
                      buttonTitle="hh.rr system"
                      color="#00BCD4"
                      icon="ios-people-outline"
                      disabled={true}
                    />
                  </Grid>
                ) }
              </Grid>
              <Grid container item xs={12} spacing={3}>
                { thelogedUser.userRoles[0].actionsNames.operativeModule_AssignmentType_access ? (
                  <Grid item xs={4} onClick={() => this.gowTo('operative module')}>
                    <MenuButtons
                      buttonPath="/app/operative-system/staff-assignment"
                      buttonTitle="operative module"
                      color="#689F38"
                      icon="ios-briefcase-outline"
                      disabled={false}
                    />
                  </Grid>
                )
                  : (
                    <Grid item xs={4} >
                      <MenuButtons
                        buttonPath="/app/operative-system/staff-assignment"
                        buttonTitle="operative module"
                        color="#689F38"
                        icon="ios-briefcase-outline"
                        disabled={true}
                      />
                    </Grid>
                  )}
                { thelogedUser.userRoles[0].actionsNames.admin_roles_management_access ? (
                  <Grid item xs={4} onClick={() => this.gowTo('administration')}>
                    <MenuButtons
                      buttonPath="/app/data/administration/users"
                      buttonTitle="administration"
                      color="#B388FF"
                      icon="ios-person"
                      disabled={false}
                    />
                  </Grid>
                ) : (
                  <Grid item xs={4} >
                    <MenuButtons
                      buttonPath="/app/data/administration/users"
                      buttonTitle="administration"
                      color="#B388FF"
                      icon="ios-person"
                      disabled={true}
                    />
                  </Grid>
                ) }
                <Grid item xs={4}>
                  <MenuButtons
                    buttonPath="/app/translation/default-sentences"
                    buttonTitle="translation"
                    icon="ios-globe-outline"
                  />
                </Grid>
              </Grid>
            </Grid>
          </div>
        </PapperBlock>
      </div>
    );
  }
}
PapperBlock.defaultProps = {
  whiteBg: false,
  noMargin: false,
  colorMode: false,
  overflowX: false,
  icon: 'ios-bookmark-outline',
  desc: ''
};
const mapStateToProps = () => ({
  logedUser: localStorage.getItem('logedUser')
});
const BlankPageMapped = connect(
  mapStateToProps,
  null
)(BlankPage);
// export default BlankPage;
export default () => {
  // const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <BlankPageMapped classes={classes} />;
};
