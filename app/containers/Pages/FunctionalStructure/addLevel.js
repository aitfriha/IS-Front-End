import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination
} from '@material-ui/core';
import PropTypes from 'prop-types';
import TablePaginationActions from '../Table/TablePaginationActions';
import history from '../../../utils/history';
import styles from './levels-jss';
import '../Configurations/map/app.css';
import FunctionalStructureService from '../../Services/FunctionalStructureService';
import FunctionalStructureConfigService from '../../Services/FunctionalStructureConfigService';

const levelTypes = ['Level 1', 'Level 2', 'Level 3'];

class AddLevel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10,
      name: '',
      description: '',
      type: '',
      parent: 'none',
      level1: [],
      level2: [],
      level3: []
    };
  }

  componentDidMount() {
    FunctionalStructureService.getLevelByType('Level 1').then(({ data }) => {
      this.setState({
        level1: data
      });
    });
    FunctionalStructureService.getLevelByType('Level 2').then(({ data }) => {
      this.setState({
        level2: data
      });
    });
    FunctionalStructureService.getLevelByType('Level 3').then(({ data }) => {
      this.setState({
        level3: data
      });
    });
  }

  handleChange = ev => {
    if (ev.target.name === 'adCountry') {
      this.setState({ phone: ev.target.value.phonePrefix });
    }
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleSubmitLevel = () => {
    const {
      name, description, type, parent
    } = this.state;

    /* switch (type) {
      case 'Level 1': {
        FunctionalStructureConfigService.saveLevelConfig({level1: name})
      };
      case 'Level 2': {
        FunctionalStructureConfigService.saveLevelConfig({level1: parent, level2: name})
      };
      case 'Level 3':{
        FunctionalStructureConfigService.saveLevelConfig({level12: parent, level3: name})
      };
      default:;
    } */
    const level = {
      name,
      description,
      type
    };
    FunctionalStructureService.saveLevel(level, parent).then(() => {
      history.push('/app/hh-rr/functionalStructure');
    });
  };

  getLevelsToShow = () => {
    const {
      type, level1, level2, level3
    } = this.state;
    switch (type) {
      case 'Level 1':
        return level1;
      case 'Level 2':
        return level2;
      case 'Level 3':
        return level3;
      default:
        return [];
    }
  };

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage
    });
  };

  handleChangeRowsPerPage = event => {
    this.setState({
      rowsPerPage: event.target.value,
      page: 0
    });
  };

  render() {
    const title = brand.name + ' - Functional structure';
    const { desc } = brand;
    const { classes } = this.props;
    const {
      name,
      description,
      type,
      parent,
      level1,
      level2,
      page,
      rowsPerPage
    } = this.state;

    const levels = this.getLevelsToShow();

    const options = {
      filter: true,
      selectableRows: 'none',
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10
    };

    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={desc} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={desc} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={desc} />
        </Helmet>
        <PapperBlock
          title="New Level"
          desc="Please, Fill in the all field"
          icon="ios-person"
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
            >
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                name="name"
                value={name}
                style={{ width: '48%' }}
                required
                className={classes.textField}
                onChange={this.handleChange}
              />
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                name="description"
                value={description}
                style={{ width: '48%' }}
                className={classes.textField}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={7}
              style={
                type === 'Level 1' || type === ''
                  ? { display: 'flex', justifyContent: 'center' }
                  : { display: 'flex', justifyContent: 'space-between' }
              }
            >
              <FormControl
                className={classes.formControl}
                style={{ width: '48%' }}
                required
              >
                <InputLabel>Type</InputLabel>
                <Select name="type" value={type} onChange={this.handleChange}>
                  {levelTypes.map(tp => (
                    <MenuItem key={tp} value={tp}>
                      {tp}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {type === 'Level 1' || type === '' ? (
                <div />
              ) : (
                <FormControl
                  className={classes.formControl}
                  style={{ width: '48%' }}
                  required
                >
                  <InputLabel>Parent</InputLabel>
                  <Select
                    name="parent"
                    value={parent}
                    onChange={this.handleChange}
                  >
                    {type === 'Level 2'
                      ? level1.map(item => (
                        <MenuItem key={item.name} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))
                      : level2.map(item => (
                        <MenuItem key={item.name} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              md={7}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Button
                color="primary"
                variant="contained"
                size="medium"
                onClick={this.handleSubmitLevel}
                disabled={!(parent !== 'none' || type === 'Level 1')}
              >
                Save Level
              </Button>
            </Grid>
          </Grid>
        </PapperBlock>
        <Paper elevation={3}>
          <div style={{ padding: 20 }}>
            <Table aria-label="Formulas">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="left">Type</TableCell>
                  <TableCell align="center">Parent</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {levels.length > 0 ? (
                  levels.map((row, index) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell align="left">{row.type}</TableCell>
                      <TableCell align="left">{row.parent}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <div />
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={levels.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </div>
        </Paper>
      </div>
    );
  }
}
AddLevel.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(AddLevel);
