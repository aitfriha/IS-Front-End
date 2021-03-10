import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'dan-components';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import brand from 'dan-api/dummy/brand';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './sectors-jss';
import SectorsBlock from './SectorsBlock';
import SectorLeaderEdit from './SectorLeaderEdit';
import AddSector from './addSector';
import { setSectorConfig } from '../../../redux/actions/sectorConfigActions';
import SectorConfigService from '../../Services/SectorConfigService';
import { ThemeContext } from '../../App/ThemeWrapper';
const useStyles = makeStyles();
class Sector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    SectorConfigService.getConfigSectors().then(({ data }) => {
      const { setSectorConfig, changeTheme } = this.props;
      changeTheme('redTheme');
      setSectorConfig(data);
      const { sectorsConfig } = this.props;
      this.setState({ data: sectorsConfig });
    });
    axios.get('https://api.exchangeratesapi.io/latest?base=USD').then(res => {
      console.log(res.data);
    });
  }

  handleNewAdd = () => {
    const { sectorsConfig } = this.props;
    this.setState({ data: sectorsConfig });
  };

  render() {
    const title = brand.name + ' - Sectors';
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
        <PapperBlock title="Sectors" icon="ios-person" noMargin>
          <AddSector newAdd={this.handleNewAdd} />
          <SectorsBlock sectorsConfig={data} />
        </PapperBlock>
      </div>
    );
  }
}
Sector.propTypes = {
  classes: PropTypes.object.isRequired,
  setSectorConfig: PropTypes.func.isRequired,
  sectorsConfig: PropTypes.array.isRequired
};

const mapDispatchToProps = dispatch => ({
  setSectorConfig: bindActionCreators(setSectorConfig, dispatch)
});
const mapStateToProps = state => ({
  sectorsConfig: state.get('SectorConfigModule').toJS().sectorsConfig,
});
const SectorMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sector);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <SectorMapped changeTheme={changeTheme} classes={classes} />;
};
