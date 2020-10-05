import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import { withStyles } from '@material-ui/core/styles';
import {
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

class AssignStaffToLevel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10,
      data: []
    };
  }

  componentDidMount() {
    FunctionalStructureService.getLevels().then(({ data }) => {
      this.setState({ data });
    });
  }

  handleChange = ev => {
    console.log(ev.target.name);
    console.log(ev.target.value);
    if (ev.target.name === 'adCountry') {
      this.setState({ phone: ev.target.value.phonePrefix });
    }
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleCheck = (ev, id) => {
    const { sectorConfig } = this.state;
    const newSectorConfig = sectorConfig;
    newSectorConfig.forEach(config => {
      if (config.sectorConfigId === id) {
        config.choose = ev.target.checked;
      }
    });
    this.setState({ sectorConfig: newSectorConfig });
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
    const { page, rowsPerPage } = this.state;

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
                {data.length > 0 ? (
                  data.map((row, index) => (
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
AssignStaffToLevel.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(AssignStaffToLevel);
