import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel, MenuItem, Select,
  TextField
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import Tooltip from '@material-ui/core/Tooltip';
import MUIDataTable from 'mui-datatables';
import DetailsIcon from '@material-ui/icons/Details';
import { ThemeContext } from '../../App/ThemeWrapper';
import CommercialOperationService from '../../Services/CommercialOperationService';
import HistoryActionService from '../../Services/HistoryActionService';
import history from '../../../utils/history';
import PapperBlock from '../../../components/PapperBlock/PapperBlock';
const styles = theme => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});
const useStyles = makeStyles(styles);
class CommercialActionHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actionsHistory: [],
      actionsHistoryTab: [],
      commercialOperations: [],
      current: {},
      openPopUp: false,
      columns: [
        {
          name: 'staffName',
          label: 'Responsible Name',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          name: 'clientName',
          label: 'Client Name',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          name: 'operationName',
          label: 'Operation Name',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          name: 'stateName',
          label: 'Operation Status',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          name: 'actionTypeName',
          label: 'Action Status',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          name: 'sector',
          label: 'Client Sector',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          name: 'estimatedTradeVolumeInEuro',
          label: 'Trade Volume (€)',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          name: 'paymentDate',
          label: 'Operation Date',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
            customBodyRender: (value) => (
              <React.Fragment>
                {
                  value ? value.toString().slice(0, 10) : ''
                }
              </React.Fragment>
            )
          }
        },
        {
          name: 'actionDate',
          label: 'Action Date',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
            customBodyRender: (value) => (
              <React.Fragment>
                {
                  value ? value.toString().slice(0, 10) : ''
                }
              </React.Fragment>
            )
          }
        },
        {
          name: 'Actions',
          label: ' Actions',
          options: {
            filter: false,
            sort: false,
            empty: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
            customBodyRender: (value, tableMeta) => (
              <React.Fragment>
                <IconButton onClick={() => this.handleDetails(tableMeta)}>
                  <DetailsIcon color="secondary" />
                </IconButton>
              </React.Fragment>
            )
          }
        }
      ]
    };
  }

    // eslint-disable-next-line react/sort-comp
    handleDetails = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage + tableMeta.rowIndex;
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const current = this.state.actionsHistoryTab[index];
      this.setState({ openPopUp: true, current });
    }

    componentDidMount() {
    // eslint-disable-next-line react/prop-types
      const { changeTheme } = this.props;
      changeTheme('redTheme');
      HistoryActionService.getActionHistory().then(result => {
        this.setState({ actionsHistory: result.data });
      });
      CommercialOperationService.getCommercialOperation().then(result => {
        this.setState({ commercialOperations: result.data.payload });
      });
    }

    handleClose = () => {
      this.setState({ openPopUp: false });
    };

    handleGoBack = () => {
      history.push('/app/commercial-action');
    }

    handleChange = (ev) => {
      let { actionsHistoryTab } = this.state;
      if (ev.target.name === 'operationName') {
        // eslint-disable-next-line react/destructuring-assignment
        actionsHistoryTab = this.state.actionsHistory.filter(row => (row.operationName === ev.target.value));
        this.setState({ actionsHistoryTab });
      }
      this.setState({ [ev.target.name]: ev.target.value });
    }

    render() {
      console.log(this.state);
      // eslint-disable-next-line react/prop-types
      const { logedUser } = this.props;
      const thelogedUser = JSON.parse(logedUser);
      console.log(thelogedUser);
      const options = {
        filter: true,
        selectableRows: false,
        filterType: 'dropdown',
        responsive: 'stacked',
        download: true,
        print: true,
        rowsPerPage: 10
      };
      const {
        actionsHistoryTab, columns, commercialOperations, operationName, openPopUp, current
      } = this.state;
      const title = brand.name + ' - Commercial Actions History';
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
          <PapperBlock
            title="History of Commercial Actions"
            desc="Commercial actions"
            icon="ios-people-outline"
            noMargin
            overflowX
          >
            <Grid container spacing={1}>
              <Grid item xs={11} />
              <Grid item xs={1}>
                <Tooltip title="Back to List">
                  <IconButton onClick={() => this.handleGoBack()}>
                    <KeyboardBackspaceIcon color="secondary" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            <br />
            <Grid
              container
              spacing={2}
              alignItems="flex-start"
              direction="row"
              justify="center"
            >
              <Grid item xs={4}>
                <FormControl fullWidth required>
                  <InputLabel>Select Commercial Operation</InputLabel>
                  <Select
                    name="operationName"
                    value={operationName}
                    onChange={this.handleChange}
                  >
                    {
                      commercialOperations.map((clt) => (
                        <MenuItem key={clt.name} value={clt.name}>
                          {clt.name}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <MUIDataTable
              data={actionsHistoryTab}
              columns={columns}
              options={options}
            />
          </PapperBlock>
          <Dialog
            open={openPopUp}
            keepMounted
            scroll="body"
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth="md"
            maxWidth="md"
          >
            <DialogTitle id="alert-dialog-slide-title">{current.operationName ? current.operationName.toUpperCase() : ''}</DialogTitle>
            <DialogContent dividers>
              <Grid
                container
                spacing={2}
                alignItems="flex-start"
                direction="row"
              >
                <Grid item xs={12}>
                  <Card>
                    <Grid
                      container
                      spacing={2}
                      alignItems="flex-start"
                      direction="row"
                      justify="center"
                    >
                      <Grid item xs={7}>
                        <Grid
                          container
                          spacing={4}
                          alignItems="flex-start"
                          direction="row"
                        >
                          <Grid item xs={1}>
                            <CardHeader
                              avatar={(
                                <Avatar style={{ backgroundColor: '#ff0000' }}>
                                  {current.staffName ? current.staffName.substr(0, 1) : '' }
                                </Avatar>
                              )}
                            />
                          </Grid>
                          <Grid item xs={11}>
                            <CardHeader
                              variant="subtitle1"
                              color="primary"
                              title={current.staffName ? current.staffName : ''}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={5}>
                        <CardHeader
                          variant="body1"
                          color="textPrimary"
                          title={'Trade Volume : ' + (current.estimatedTradeVolumeInEuro ? (current.estimatedTradeVolumeInEuro + ' €') : '0')}
                          subheader={'Operations Status : ' + (current.stateName ? (current.stateName) : '')}
                        />
                      </Grid>
                      <Grid item xs={0} />
                      <Grid item xs={4}>
                        <TextField
                          label="Commercial Action Type"
                          value={current.actionTypeName}
                          fullWidth
                          InputProps={{
                            readOnly: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={7} />
                      <Grid item xs={3} />
                      <Grid item xs={6}>
                        <Box fontWeight={600} align="center" fontStyle="italic">
                                        Client Name:
                          {' '}
                          {current.clientName ? current.clientName : ''}
                        </Box>
                        <Box fontWeight={600} align="center" fontStyle="italic">
                                        Operation Name:
                          {' '}
                          {current.operationName ? current.operationName : ''}
                        </Box>
                        <Box fontWeight={600} align="center" fontStyle="italic">
                                        General Sector:
                          {' '}
                          {current.sector ? current.sector : ''}
                        </Box>
                      </Grid>
                      <Grid item xs={3} />
                      <Grid item xs={0} />
                      <Grid item xs={7} />
                      <Grid item xs={2}>
                        <TextField
                          id="operaDate"
                          label="Operation Date"
                          value={current.paymentDate ? current.paymentDate.substr(0, 10) : ''}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          id="actionDate"
                          label="Action Date"
                          value={current.actionDate ? current.actionDate.substr(0, 10) : ''}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={11}>
                        <Typography variant="body1" color="textPrimary" component="p">
                          <TextField
                            label="Objectives"
                            value={current.objectifs}
                            fullWidth
                            multiline
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Typography>
                      </Grid>
                      <Grid item xs={11}>
                        <Typography variant="body1" color="textPrimary" component="p">
                          <TextField
                            label="Description"
                            value={current.descriptions}
                            fullWidth
                            multiline
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Typography>
                      </Grid>
                    </Grid>
                    <br />
                    {current.nbrConclusions ? current.nbrConclusions.map((row) => (
                      <Grid
                        container
                        spacing={2}
                        alignItems="flex-start"
                        direction="row"
                        align="center"
                      >
                        <Grid item xs={0} />
                        <Grid item xs={2} align="center">
                          <Typography variant="subtitle2" component="h3" color="grey">
                            <br />
                                            Conclusion
                            {' '}
                            { row }
                          </Typography>
                        </Grid>
                        <Grid item xs={9}>
                          <TextField
                            label="Description"
                            value={current.conclusions[row]}
                            multiline
                            fullWidth
                            required
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                      </Grid>
                    )) : ''}
                    <br />
                    {current.nbrActions ? current.nbrActions.map((row) => (
                      <Grid
                        container
                        spacing={2}
                        alignItems="flex-start"
                        direction="row"
                        align="center"
                      >
                        <Grid item xs={0} />
                        <Grid item xs={2} align="center">
                          <Typography variant="subtitle2" component="h3" color="grey">
                            <br />
                                            Next Action
                            {' '}
                            { row }
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label="Description"
                            value={current.actionDescriptions[row]}
                            multiline
                            fullWidth
                            required
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            label="Action Date"
                            value={current.actionDates[row]}
                            type="date"
                            fullWidth
                            required
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                      </Grid>
                    )) : ''}
                    <br />
                  </Card>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={this.handleClose}>
                        Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
}
CommercialActionHistory.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  classes: PropTypes.object.isRequired
};

const mapStateToProps = () => ({
  logedUser: localStorage.getItem('logedUser')
});

const CommercialActionHistoryMapped = connect(
  mapStateToProps
)(CommercialActionHistory);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <CommercialActionHistoryMapped changeTheme={changeTheme} classes={classes} />;
};
