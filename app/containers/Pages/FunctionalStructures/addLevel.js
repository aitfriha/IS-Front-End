import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid, TextField, Button, Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { PapperBlock } from 'dan-components';
import styles from './levels-jss';
import FunctionalStructureConfigService from '../../Services/FunctionalStructureConfigService';
import '../Configurations/map/app.css';
import AutoComplete from '../../../components/AutoComplete';
import FunctionalStructureService from '../../Services/FunctionalStructureService';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
import MUIDataTable from 'mui-datatables';
import { addLevelConfig } from '../../../redux/actions/FunctionalStructureConfigActions';

const columns = [
  {
    name: 'level1',
    label: 'Level 1',
    options: {
      filter: true
    }
  },
  {
    label: 'Level 2',
    name: 'level2',
    options: {
      filter: true
    }
  },
  {
    label: 'Level 3',
    name: 'level3',
    options: {
      filter: true
    }
  }
];
class AddLevel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description1: '',
      description2: '',
      description3: '',
      level1: '',
      level2: '',
      level3: '',
      levels1: [],
      levels2: [],
      levels3: [],
      data: []
    };
  }

  componentDidMount() {
    FunctionalStructureService.getLevels().then(({ data }) => {
      const levels1 = data.filter(sect => sect.type === 'Level 1');
      const levels2 = data.filter(sect => sect.type === 'Level 2');
      const levels3 = data.filter(sect => sect.type === 'Level 3');
      console.log(data.filter(sect => sect.name === 'Level 3'));
      this.setState({ levels3, levels2, levels1 });
    });
    FunctionalStructureConfigService.getAllLevelConfig().then(({ data }) => {
      console.log(data);
      this.setState({ data });
    });
  }

  handleChange = ev => {
    if (ev.target.name === 'level1') {
      FunctionalStructureConfigService.getLevelConfigByLevel1(
        ev.target.value.name
      ).then(({ data }) => {
        const datas = [];
        data.forEach(da => {
          const dat = da;
          const newSect = {
            levelConfigId: dat.levelConfigId,
            level1: dat.level1,
            level2: dat.level2,
            level3: dat.level3
          };
          datas.push(newSect);
        });
        this.setState({ levelConfig: datas });
      });
    }
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleSubmitLevel = () => {
    const {
      level1,
      level2,
      level3,
      description1,
      description2,
      description3
    } = this.state;
    const { addNew, newAdd } = this.props;
    if (level1 && level3 && level2) {
      const funcStructureConfig = {
        level1,
        level2,
        level3
      };
      const lvl1 = {
        name: level1,
        description: description1,
        type: 'Level 1'
      };
      const lvl2 = {
        name: level2,
        description: description2,
        type: 'Level 2'
      };
      const lvl3 = {
        name: level3,
        description: description3,
        type: 'Level 3'
      };
      const objects = [funcStructureConfig, lvl1, lvl2, lvl3];
      FunctionalStructureService.saveLevel(objects).then(() => {
        history.push('/app/hh-rr/functionalStructure');
      });
    }
  };

  handleCheck = (ev, id) => {
    const { levelConfig } = this.state;
    const newLevelConfig = levelConfig;
    newLevelConfig.forEach(config => {
      if (config.levelConfigId === id) {
        config.choose = ev.target.checked;
      }
    });
    this.setState({ levelConfig: newLevelConfig });
  };

  handleValueChange = (value, type) => {
    console.log(value, type);
    this.setState({ [type]: value });
  };

  render() {
    const { classes, levelsConfig } = this.props;
    console.log(levelsConfig);
    const {
      description1,
      levels1,
      levels2,
      levels3,
      level1,
      level2,
      level3,
      description2,
      description3,
      data
    } = this.state;
    const options = {
      filter: true,
      selectableRows: false,
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
      customToolbar: () => (
        <CustomToolbar
          csvData={data}
          url="/app/hh-rr/functionalStructure/create-level"
          tooltip="add new Level"
        />
      )
    };
    return (
      <div>
        <PapperBlock
          title="Functional Structure Levels"
          icon="ios-person"
          noMargin
          whiteBg
        >
          <Grid
            container
            spacing={6}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid
              item
              xs={12}
              md={7}
              style={{ display: 'flex', justifyContent: 'space-between' }}
              justify="center"
              alignContent="center"
              alignItems="center"
            >
              <Typography
                variant="subtitle2"
                color="primary"
                style={{ width: '12%' }}
              >
                Level 1
              </Typography>
              <div style={{ width: '35%' }}>
                <AutoComplete
                  value={this.handleValueChange}
                  placeholder="First Level Name"
                  data={levels1}
                  type="level1"
                />
              </div>
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                name="description1"
                value={description1}
                style={{ width: '48%' }}
                required
                className={classes.textField}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={7}
              style={{ display: 'flex', justifyContent: 'space-between' }}
              justify="center"
              alignContent="center"
              alignItems="center"
            >
              <Typography
                variant="subtitle2"
                color="primary"
                style={{ width: '12%' }}
              >
                Level 2
              </Typography>
              <div style={{ width: '35%' }}>
                <AutoComplete
                  value={this.handleValueChange}
                  placeholder="Second Level Name"
                  data={levels2}
                  type="level2"
                />
              </div>
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                name="description2"
                value={description2}
                style={{ width: '48%' }}
                required
                className={classes.textField}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={7}
              style={{ display: 'flex', justifyContent: 'space-between' }}
              justify="center"
              alignContent="center"
              alignItems="center"
            >
              <Typography
                variant="subtitle2"
                color="primary"
                style={{ width: '12%' }}
              >
                Level 3
              </Typography>
              <div style={{ width: '35%' }}>
                <AutoComplete
                  value={this.handleValueChange}
                  placeholder="Third Level Name"
                  data={levels3}
                  type="level3"
                />
              </div>
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                name="description3"
                value={description3}
                style={{ width: '48%' }}
                required
                className={classes.textField}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={7}
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 12
              }}
            >
              <Button
                color="primary"
                variant="contained"
                size="medium"
                onClick={this.handleSubmitLevel}
                disabled={!level2 || !level1 || !level3}
              >
                Save Level
              </Button>
            </Grid>
          </Grid>
        </PapperBlock>
        <div>
          <MUIDataTable
            title="The Functional Structures List"
            data={data}
            columns={columns}
            options={options}
          />
        </div>
      </div>
    );
  }
}
AddLevel.propTypes = {
  classes: PropTypes.object.isRequired,
  addNew: PropTypes.func.isRequired,
  newAdd: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  levelsConfig: state.get('FunctionalStructureConfigModule').toJS().levelsConfig
});

const mapDispatchToProps = dispatch => ({
  addNew: bindActionCreators(addLevelConfig, dispatch)
});

const AddLevelMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddLevel);
export default withStyles(styles)(AddLevelMapped);
