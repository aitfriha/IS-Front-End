import React from 'react';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'dan-components';
import brand from 'dan-api/dummy/brand';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import StatusOfCommercialOperationBlock from './Block';

class StatusOfCommercialOperation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusName: '',
      statusId: '',
      createOrUpdate: true,
      status: [],
      statusDescription: ''
    }
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleSubmitStatus = () => {
    const { statusName, statusDescription, status } = this.state;
    this.setState({ status: [...status, { statusName, statusDescription }], statusDescription: '', statusName: '' })
  };

  handleCancel = () => {
    this.setState({ createOrUpdate: true, statusDescription: '', statusName: '' });
  }

  handleChangeSelectedStatus = (status) => {
    this.setState(
      {
        statusName: status.statusName,
        statusDescription: status.statusDescription,
        createOrUpdate: false
      });
  };

  render() {
    const title = brand.name + ' - Status Of Commercial Operation';
    const description = brand.desc;
    const {
      status, createOrUpdate, statusName, statusDescription
    } = this.state;
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
        <PapperBlock title="Status Of Commercial Operation" noMargin>
          <Grid
            container
            spacing={3}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid
              item
              xs={12}
              md={5}
              style={{ display: 'flex', justifyContent: 'space-between' }}
              justify="center"
              alignContent="center"
              alignItems="center"
            >
              <Typography variant="subtitle2" color="primary" style={{ width: '20%' }}>Status of Commercial Operation</Typography>
              <div style={{ width: '75%' }}>
                <TextField
                  id="outlined-basic"
                  label="Status Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={statusName}
                  name="statusName"
                  onChange={this.handleChange}
                />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              md={5}
              style={{ display: 'flex', justifyContent: 'space-between' }}
              justify="center"
              alignContent="center"
              alignItems="center"
            >
              <Typography variant="subtitle2" color="primary" style={{ width: '15%' }}>Description</Typography>
              <div style={{ width: '80%' }}>
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  required
                  value={statusDescription}
                  name="statusDescription"
                  onChange={this.handleChange}
                />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              md={7}
              style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}
            >
              <Button
                color="primary"
                variant="contained"
                size="medium"
                onClick={this.handleSubmitStatus}
              >
                {
                  createOrUpdate ? 'Save Status' : 'Update Status'
                }
              </Button>
              {
                !createOrUpdate ? (
                  <Button
                    color="secondary"
                    variant="contained"
                    size="medium"
                    onClick={this.handleCancel}
                  >
                    Cancel
                  </Button>
                ) : (<div />)
              }
            </Grid>
          </Grid>
          <StatusOfCommercialOperationBlock  onSelected={this.handleChangeSelectedStatus} status={status} />
        </PapperBlock>
      </div>
    );
  }
}
export default (StatusOfCommercialOperation);
