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
import { ThemeContext } from '../../App/ThemeWrapper';
import history from "../../../utils/history";
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
  gowTo= (data, aaa) => {
    history.push('/app/data/administration/role-actions');
  }
  render() {
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
                <Grid item xs={4}>
                  <Paper
                    style={{ background: 'red', cursor: 'pointer' }}
                    className={classNames(classes.root, noMargin && classes.noMargin, colorMode && classes.colorMode)}
                    elevation={0}
                    onClick={this.gowTo}
                  >
                    <div className={classes.descBlock}>
                      <span className={classes.iconTitle}>
                        <Ionicon icon="ios-folder-open-outline" style={{ color: '#fff', height: '60px', width: '100px' }} />
                      </span>
                      <div className={classes.titleText} style={{ textAlign: 'center', color: '#fff' }}>
                        <Typography variant="h6" component="h2" className={classes.title}>
                          Commercial
                        </Typography>
                      </div>
                    </div>
                    <br />
                    {' '}
                    <br />
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <MenuButtons
                    buttonPath="/app/commercial-losses-monitoring/client-consumption-analysis/statistical-analysis"
                    buttonTitle="financial"
                    color="#90A4AE"
                    icon="ios-cash-outline"
                  />
                </Grid>
                <Grid item xs={4}>
                  <MenuButtons
                    buttonPath="/app/commercial-losses-monitoring/client-consumption-analysis/statistical-analysis"
                    buttonTitle="hh.rr system"
                    color="#00BCD4"
                    icon="ios-people-outline"
                  />
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={4}>
                  <Paper
                      style={{ background: '#689F38', cursor: 'pointer' }}
                      className={classNames(classes.root, noMargin && classes.noMargin, colorMode && classes.colorMode)}
                      elevation={0}
                      onClick={this.gowTo}
                  >
                    <div className={classes.descBlock}>
                      <span className={classes.iconTitle}>
                        <Ionicon icon="ios-briefcase-outline" style={{ color: '#fff', height: '60px', width: '100px' }} />
                      </span>
                      <div className={classes.titleText} style={{ textAlign: 'center', color: '#fff' }}>
                        <Typography variant="h6" component="h2" className={classes.title}>
                          operative system
                        </Typography>
                      </div>
                    </div>
                    <br />
                    {' '}
                    <br />
                  </Paper>
 {/*                 <MenuButtons
                    buttonPath="/app/commercial-losses-monitoring/client-consumption-analysis/statistical-analysis"
                    buttonTitle="operative system"
                    color="#689F38"
                  />*/}
                </Grid>
                <Grid item xs={4}>
                  <MenuButtons
                    buttonPath="/app/commercial-losses-monitoring/client-consumption-analysis/statistical-analysis"
                    buttonTitle="administration"
                    color="#B388FF"
                    icon="ios-person"
                  />
                </Grid>
                <Grid item xs={4}>
                  <MenuButtons
                    buttonPath="/app/commercial-losses-monitoring/client-consumption-analysis/statistical-analysis"
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
const BlankPageMapped = connect(
  null,
  null
)(BlankPage);
// export default BlankPage;
export default () => {
  // const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <BlankPageMapped classes={classes} />;
};
