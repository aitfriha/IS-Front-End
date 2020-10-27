import React, { useContext } from 'react';
import {
  Grid,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { PapperBlock } from 'dan-components';
import AutoComplete from '../../../components/AutoComplete';
import styles from './legalCategoryType-jss';
import { ThemeContext } from '../../App/ThemeWrapper';
import history from '../../../utils/history';
import '../Configurations/map/app.css';
import LegalCategoryTypeService from '../../Services/LegalCategoryTypeService';

const useStyles = makeStyles(styles);

class AddLegalCategoryType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      functions: '',
      company: {},
      legalCategoryTypes: []
    };
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleChangeCompany = ev => {
    LegalCategoryTypeService.getAllLegalCategoryTypesByCompany(
      ev.target.value
    ).then(({ data }) => {
      this.setState({
        legalCategoryTypes: data,
        [ev.target.name]: ev.target.value
      });
    });
  };

  handleSubmitLegalCategoryType = () => {
    const { name, functions, companyName } = this.state;
    const legalCategoryType = { name, functions, companyName };
    LegalCategoryTypeService.saveLegalCategoryType(legalCategoryType).then(
      () => {
        history.push('/app/hh-rr/legalCategoryType');
      }
    );
  };

  handleValueChange = (value, type) => {
    console.log(value, type);
    this.setState({ [type]: value });
  };

  render() {
    const { classes } = this.props;
    const {
      name, functions, companyName, legalCategoryTypes
    } = this.state;
    const companies = [
      { name: 'TechniU', phone: '+21265482154', email: 'techniU@gmail.com' },
      {
        name: 'Implemental Systems',
        phone: '+21265482154',
        email: 'implemental@gmail.com'
      },
      {
        name: 'International GDE',
        phone: '+21265482154',
        email: 'internationalgde@gmail.com'
      }
    ];
    return (
      <div>
        <PapperBlock
          title="Add legal category type"
          icon="ios-paper-outline"
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
              md={8}
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 6
              }}
            >
              <FormControl
                className={classes.formControl}
                style={{ width: '40%' }}
              >
                <InputLabel>Company</InputLabel>
                <Select
                  name="companyName"
                  value={companyName}
                  onChange={this.handleChangeCompany}
                >
                  {companies.map(company => (
                    <MenuItem key={company.name} value={company.name}>
                      {company.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              md={8}
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                marginBottom: 6
              }}
            >
              <div style={{ width: '40%' }}>
                <AutoComplete
                  value={this.handleValueChange}
                  placeholder="Name"
                  data={legalCategoryTypes}
                  type="name"
                  attribute="name"
                />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              md={8}
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 6
              }}
            >
              <TextField
                id="outlined-basic"
                label="Functions"
                variant="outlined"
                name="functions"
                value={functions}
                style={{ width: '40%' }}
                required
                multiline
                className={classes.textField}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={8}
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
                onClick={this.handleSubmitLegalCategoryType}
                disabled={!functions || !name || !companyName}
              >
                Save Type
              </Button>
            </Grid>
          </Grid>
        </PapperBlock>
      </div>
    );
  }
}

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <AddLegalCategoryType changeTheme={changeTheme} classes={classes} />;
};
