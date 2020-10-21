import React, { useContext } from 'react';
import {
  Grid,
  TextField,
  Button,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  makeStyles
} from '@material-ui/core';
import { PapperBlock } from 'dan-components';
import { ThemeContext } from '../../App/ThemeWrapper';
import history from '../../../utils/history';
import styles from './levels-jss';
import '../Configurations/map/app.css';
import AutoComplete from '../../../components/AutoComplete';
import FunctionalStructureService from '../../Services/FunctionalStructureService';
import StaffService from '../../Services/StaffService';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
import MUIDataTable from 'mui-datatables';
import Autocomplete from '@material-ui/lab/Autocomplete';

const columns = [
  {
    name: 'name',
    label: 'Name',
    options: {
      filter: true
    }
  },
  {
    label: 'Description',
    name: 'description',
    options: {
      filter: true
    }
  },
  {
    label: 'Type',
    name: 'type',
    options: {
      filter: true
    }
  },
  {
    label: 'Is production level?',
    name: 'isProductionLevel',
    options: {
      filter: true
    }
  },
  {
    label: 'Is commercial level?',
    name: 'isCommercialLevel',
    options: {
      filter: true
    }
  }
];

const useStyles = makeStyles(styles);

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
      isProductionLevel1: 'no',
      isProductionLevel2: 'no',
      isProductionLevel3: 'no',
      isCommercialLevel1: 'no',
      isCommercialLevel2: 'no',
      isCommercialLevel3: 'no',
      levels1: [],
      levels2: [],
      levels3: [],
      data: [],
      staffs: [],
      staffsOptions1: [],
      staffsOptions2: [],
      staffsOptions3: [],
      leader1: {},
      leader2: {},
      leader3: {}
    };
  }

  componentDidMount() {
    const { changeTheme } = this.props;
    changeTheme('blueCyanTheme');
    FunctionalStructureService.getLevels().then(({ data }) => {
      const levels1 = data.filter(lvl => lvl.type === 'Level 1');
      const levels2 = data.filter(lvl => lvl.type === 'Level 2');
      const levels3 = data.filter(lvl => lvl.type === 'Level 3');
      this.setState({
        levels3,
        levels2,
        levels1,
        data
      });
    });
    StaffService.getNotAssignedStaffs().then(({ data }) => {
      console.log(data);
      data.sort((a, b) => {
        const textA = a.firstName.toUpperCase();
        const textB = b.firstName.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
      console.log(data);
      if (data.length > 0) {
        this.setState({
          staffs: data,
          staffsOptions1: data,
          staffsOptions2: data,
          staffsOptions3: data
        });
      }
    });
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
    if (ev.target.name === 'isProductionLevel1' && ev.target.value === 'yes') {
      this.setState({
        isCommercialLevel1: 'no'
      });
    } else if (
      ev.target.name === 'isProductionLevel2'
      && ev.target.value === 'yes'
    ) {
      this.setState({
        isCommercialLevel2: 'no'
      });
    } else if (
      ev.target.name === 'isProductionLevel3'
      && ev.target.value === 'yes'
    ) {
      this.setState({
        isCommercialLevel3: 'no'
      });
    } else if (
      ev.target.name === 'isCommercialLevel1'
      && ev.target.value === 'yes'
    ) {
      this.setState({
        isProductionLevel1: 'no'
      });
    } else if (
      ev.target.name === 'isCommercialLevel2'
      && ev.target.value === 'yes'
    ) {
      this.setState({
        isProductionLevel2: 'no'
      });
    } else if (
      ev.target.name === 'isCommercialLevel3'
      && ev.target.value === 'yes'
    ) {
      this.setState({
        isProductionLevel3: 'no'
      });
    }
  };

  handleSubmitLevel = () => {
    const {
      level1,
      level2,
      level3,
      description1,
      description2,
      description3,
      isProductionLevel1,
      isProductionLevel2,
      isProductionLevel3,
      isCommercialLevel1,
      isCommercialLevel2,
      isCommercialLevel3
    } = this.state;
    const objects = [];
    if (level1) {
      const lvl1 = {
        name: level1,
        description: description1,
        type: 'Level 1',
        isProductionLevel: isProductionLevel1,
        isCommercialLevel: isCommercialLevel1
      };
      objects.push(lvl1);
    }
    if (level2) {
      const lvl2 = {
        name: level2,
        description: description2,
        type: 'Level 2',
        isProductionLevel: isProductionLevel2,
        isCommercialLevel: isCommercialLevel2
      };
      objects.push(lvl2);
    }
    if (level3) {
      const lvl3 = {
        name: level3,
        description: description3,
        type: 'Level 3',
        isProductionLevel: isProductionLevel3,
        isCommercialLevel: isCommercialLevel3
      };
      objects.push(lvl3);
    }
    FunctionalStructureService.saveLevel(objects).then(() => {
      history.push('/app/hh-rr/functionalStructure');
    });
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
    this.setState({ [type]: value });
  };

  handleChangeLeader1 = (ev, value) => {
    console.log(value);
    this.setState({ leader1: value });
    /* , () => {
      this.updateStaffComboLists();
    } */
  };

  handleChangeLeader2 = (ev, value) => {
    this.setState({ leader2: value }, () => {
      this.updateStaffComboLists();
    });
  };

  handleChangeLeader3 = (ev, value) => {
    this.setState({ leader3: value }, () => {
      this.updateStaffComboLists();
    });
  };

  updateStaffComboLists = () => {
    const {
      staffs, leader1, leader2, leader3
    } = this.state;
    let list1 = staffs.filter(obj => obj.staffId !== leader2.staffId);
    list1 = list1.filter(obj => obj.staffId !== leader3.staffId);
    let list2 = staffs.filter(obj => obj.staffId !== leader1.staffId);
    list2 = list2.filter(obj => obj.staffId !== leader3.staffId);
    let list3 = staffs.filter(obj => obj.staffId !== leader1.staffId);
    list3 = list3.filter(obj => obj.staffId !== leader2.staffId);
    this.setState({
      staffsOptions1: list1,
      staffsOptions2: list2,
      staffsOptions3: list3
    });
  };

  render() {
    const { classes } = this.props;
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
      isProductionLevel1,
      isProductionLevel2,
      isProductionLevel3,
      isCommercialLevel1,
      isCommercialLevel2,
      isCommercialLevel3,
      data,
      leader1,
      leader2,
      leader3,
      staffsOptions1,
      staffsOptions2,
      staffsOptions3
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
              md={11}
              style={{ display: 'flex', justifyContent: 'space-between' }}
              justify="center"
              alignContent="center"
              alignItems="center"
            >
              <Typography
                variant="subtitle2"
                color="primary"
                style={{ width: '7%' }}
              >
                Level 1
              </Typography>
              <div style={{ width: '17%' }}>
                <AutoComplete
                  value={this.handleValueChange}
                  placeholder="First Level Name"
                  data={levels1}
                  type="level1"
                  attribute="name"
                />
              </div>
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                name="description1"
                value={description1}
                style={{ width: '17%', marginRight: 10 }}
                required
                className={classes.textField}
                onChange={this.handleChange}
              />
              <Autocomplete
                id="combo-box-demo"
                value={leader1}
                options={staffsOptions1}
                getOptionLabel={option => `${option.firstName} ${option.fatherFamilyName} ${
                  option.motherFamilyName
                }`
                }
                onChange={this.handleChangeLeader1}
                style={{ width: '17%', marginTop: 7 }}
                clearOnEscape
                renderInput={params => (
                  <TextField
                    fullWidth
                    {...params}
                    label="Leader"
                    variant="outlined"
                  />
                )}
              />
              <div style={{ width: '15%' }}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Is it production level?
                  </FormLabel>
                  <RadioGroup
                    aria-label="isProductionLevel1"
                    name="isProductionLevel1"
                    value={isProductionLevel1}
                    onChange={this.handleChange}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div style={{ width: '15%' }}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Is it Commercial level?
                  </FormLabel>
                  <RadioGroup
                    aria-label="isCommercialLevel1"
                    name="isCommercialLevel1"
                    value={isCommercialLevel1}
                    onChange={this.handleChange}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              md={11}
              style={{ display: 'flex', justifyContent: 'space-between' }}
              justify="center"
              alignContent="center"
              alignItems="center"
            >
              <Typography
                variant="subtitle2"
                color="primary"
                style={{ width: '7%' }}
              >
                Level 2
              </Typography>
              <div style={{ width: '17%' }}>
                <AutoComplete
                  value={this.handleValueChange}
                  placeholder="Second Level Name"
                  data={levels2}
                  type="level2"
                  attribute="name"
                />
              </div>
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                name="description2"
                value={description2}
                style={{ width: '17%', marginRight: 10 }}
                required
                className={classes.textField}
                onChange={this.handleChange}
              />
              <Autocomplete
                id="combo-box-demo"
                value={leader2}
                options={staffsOptions2}
                getOptionLabel={option => `${option.firstName} ${option.fatherFamilyName} ${
                  option.motherFamilyName
                }`
                }
                onChange={this.handleChangeLeader2}
                style={{ width: '17%', marginTop: 7 }}
                clearOnEscape
                renderInput={params => (
                  <TextField
                    fullWidth
                    {...params}
                    label="Leader"
                    variant="outlined"
                  />
                )}
              />
              <div style={{ width: '15%' }}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Is it production level?
                  </FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="isProductionLevel2"
                    value={isProductionLevel2}
                    onChange={this.handleChange}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div style={{ width: '15%' }}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Is it Commercial level?
                  </FormLabel>
                  <RadioGroup
                    aria-label="isCommercialLevel2"
                    name="isCommercialLevel2"
                    value={isCommercialLevel2}
                    onChange={this.handleChange}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              md={11}
              style={{ display: 'flex', justifyContent: 'space-between' }}
              justify="center"
              alignContent="center"
              alignItems="center"
            >
              <Typography
                variant="subtitle2"
                color="primary"
                style={{ width: '7%' }}
              >
                Level 3
              </Typography>
              <div style={{ width: '17%' }}>
                <AutoComplete
                  value={this.handleValueChange}
                  placeholder="Third Level Name"
                  data={levels3}
                  type="level3"
                  attribute="name"
                />
              </div>
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                name="description3"
                value={description3}
                style={{ width: '17%', marginRight: 10 }}
                required
                className={classes.textField}
                onChange={this.handleChange}
              />
              <Autocomplete
                id="combo-box-demo"
                value={leader3}
                options={staffsOptions3}
                getOptionLabel={option => `${option.firstName} ${option.fatherFamilyName} ${
                  option.motherFamilyName
                }`
                }
                onChange={this.handleChangeLeader3}
                style={{ width: '17%', marginTop: 7 }}
                clearOnEscape
                renderInput={params => (
                  <TextField
                    fullWidth
                    {...params}
                    label="Leader"
                    variant="outlined"
                  />
                )}
              />
              <div style={{ width: '15%' }}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Is it production level?
                  </FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="isProductionLevel3"
                    value={isProductionLevel3}
                    onChange={this.handleChange}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div style={{ width: '15%' }}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Is it Commercial level?
                  </FormLabel>
                  <RadioGroup
                    aria-label="isCommercialLevel3"
                    name="isCommercialLevel3"
                    value={isCommercialLevel3}
                    onChange={this.handleChange}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              md={10}
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
                disabled={
                  !level1 || (!level2 && level3) || (!level1 && !level2)
                }
              >
                Save Level
              </Button>
            </Grid>
          </Grid>
        </PapperBlock>
        <div style={{ marginTop: 20 }}>
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

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <AddLevel changeTheme={changeTheme} classes={classes} />;
};