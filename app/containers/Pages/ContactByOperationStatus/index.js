import React from 'react';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'dan-components';
import brand from 'dan-api/dummy/brand';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AutoCompleteMultiLineDisabled from './AutoCompleteWithDisabled';
import ContactByOperationStatusBlock from './Block';

class ContactByOperationStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusName: '',
      statusId: '',
      createOrUpdate: true,
      contacts: [],
      statusDescription: ''
    }
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleSubmitStatus = () => {
    const { statusName, statusDescription, contacts } = this.state;
    this.setState({ contacts: [...contacts, { statusName, statusDescription }], statusDescription: '', statusName: '' })
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
      contacts, createOrUpdate, statusName, statusDescription
    } = this.state;

    const data1 = [
      {
        label: "Qualification Process Contact "
      },
      {
        label: "Contact Of Decision maker"
      },
      {
        label: "Contact of Technical Leader"
      },
      {
        label: "Contact of person close to the decision maker"
      },
      {
        label: "Other Contact 1"
      },
      {
        label: "Other Contact 2"
      },
      {
        label: "Other Contact 3"
      },
      {
        label: "Procurement Department Contact"
      },
      {
        label: "Contact 1"
      },
      {
        label: "Contact 2"
      },
      {
        label: "Contact 3"
      },
      {
        label: "Legal Area"
      },
      {
        label: "Contact 1"
      },
      {
        label: "Contact 2"
      },
      {
        label: "Contact 3"
      }
    ]
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
              <Typography variant="subtitle2" color="primary" style={{ width: '20%' }}>Status</Typography>
              <div style={{ width: '80%' }}>
                <Autocomplete
                  id="combo-box-demo"
                  value={statusName}
                  options={contacts}
                  getOptionLabel={option => option.stateName}
                  onChange={this.handleChangeState}
                  renderInput={params => (
                    <TextField
                      fullWidth
                      {...params}
                      label="Select the status"
                      variant="outlined"
                    />
                  )}
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
              md={10}
              style={{ display: 'flex', justifyContent: 'space-between' }}
              justify="center"
              alignContent="center"
              alignItems="center"
            >
              <Typography variant="subtitle2" color="primary" style={{ width: '15%' }}>Contact</Typography>
              <div style={{ width: '80%' }}>
                <AutoCompleteMultiLineDisabled data={data1} />
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
          <ContactByOperationStatusBlock  onSelected={this.handleChangeSelectedStatus} contacts={contacts} />
        </PapperBlock>
      </div>
    );
  }
}
export default (ContactByOperationStatus);
