import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid, TextField, Button, Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { PapperBlock } from 'dan-components';
import styles from './contractType-jss';
import history from '../../../utils/history';
import '../Configurations/map/app.css';
import ContractTypeService from '../../Services/ContractTypeService';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addLevelConfig } from '../../../redux/actions/FunctionalStructureConfigActions';

class AddContractType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      name: '',
      description: ''
    };
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleSubmitContractType = () => {
    const { code, name, description } = this.state;
    const contractType = { code, name, description };
    ContractTypeService.saveContractType(contractType).then(() => {
      history.push('/app/hh-rr/contractType');
    });
  };

  render() {
    const { classes } = this.props;
    const { code, name, description } = this.state;
    return (
      <div>
        <PapperBlock
          title="Add contract type"
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
                justifyContent: 'space-around',
                marginBottom: 12
              }}
            >
              <TextField
                id="outlined-basic"
                label="Code"
                variant="outlined"
                name="code"
                value={code}
                style={{ width: '40%' }}
                required
                className={classes.textField}
                onChange={this.handleChange}
              />

              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                name="name"
                value={name}
                style={{ width: '40%' }}
                required
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
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                name="description"
                value={description}
                style={{ width: '40%' }}
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
                onClick={this.handleSubmitContractType}
                disabled={!code || !name}
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
AddContractType.propTypes = {
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

const AddContractTypeMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddContractType);
export default withStyles(styles)(AddContractTypeMapped);
