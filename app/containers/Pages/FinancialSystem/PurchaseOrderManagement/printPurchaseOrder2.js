import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import {
  Grid, TextField, Typography
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';


class PrintPurchaseOrder2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchaseOrder: {
        _id: '',
        purchaseOrderId: '',
        purchaseNumber: '',
        companyEmit: { name: '' },
        companyLogo: '',
        internLogo: '',
        companyNIF: '',
        companyAddress: '',
        currency: { typeOfCurrency: '' },
        client: { name: '' },
        financialContract: { name: '', taxeIdentityNumber: '' },
        iva: { stateCountry: { country: { countryName: '' } } },
        receptionSupplierExternal: { companyName: '' },
        receptionSupplierInternal: { name: '' },
        receptionSupplierType: '',
        supplierNIF: '',
        supplierResponsible: '',
        supplierAddress: '',
        supplierContractCode: '',
        nbrConcepts: ['1'],
        termsListe: ['1'],
        itemNames: [],
        description: [],
        unityValue: [],
        unity: [],
        valor: [0],
        unityNumber: [],
        givingDate: [],
        paymentDate: [],
        billingDate: [],
        termTitle: [],
        termDescription: [],
        totalEuro: 0,
        totalLocal: 0,
        valueIVAEuro: 0,
        valueIVALocal: 0,
        totalAmountEuro: 0,
        totalAmountLocal: 0,
        ivaRetentions: '',
        totalAmountRetentions: '',
        totalIvaRetention: '',
        paymentMethod: ''
      }
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(props) {
    console.log(props);
    // eslint-disable-next-line react/prop-types
    const purchaseOrder = props.Purchase;
    if (purchaseOrder) {
      console.log(purchaseOrder);
      this.setState({
        purchaseOrder
      });
    }
  }

  render() {
    console.log(this.state);
    // eslint-disable-next-line react/prop-types
    const { purchaseOrder } = this.state;
    return (
      <div style={{ width: '210mm' }}>
        <Grid
          container
          spacing={2}
          alignItems="flex-start"
          direction="row"
        >
          <Grid item xs={12} md={4} />
          <Grid item xs={12} md={5} />
          <Grid item xs={12} md={3}>
            <Grid
              container
              spacing={2}
              alignItems="flex-start"
              direction="row"
            >
              <Grid item xs={12}>
                <TextField
                  id="purchaseNumber"
                  label="Purchase  Order  Number"
                  name="purchaseNumber"
                  value={purchaseOrder.purchaseNumber}
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="client"
                  label="Client  Name"
                  name="client"
                  value={purchaseOrder.client ? purchaseOrder.client.name : ''}
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                {
                  (purchaseOrder.financialContract) ? (
                    <TextField
                      id="financialContractId"
                      label="Contract  NIF"
                      name="financialContractId"
                      value={purchaseOrder.financialContract.taxeIdentityNumber}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  ) : (<div />)
                }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={8}
          alignItems="flex-start"
          direction="row"
        >
          <Grid item xs={12} md={4}>
            <Grid
              container
              spacing={2}
              alignItems="flex-start"
              direction="row"
            >
              <Grid item xs={6}>
                {
                  purchaseOrder.companyLogo ? (
                    <Avatar alt="Company Logo" src={purchaseOrder.companyLogo} />
                  ) : (<div />)
                }
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="companyDataEmit"
                  label="Company Emit"
                  name="companyDataEmit"
                  value={purchaseOrder.companyEmit ? purchaseOrder.companyEmit.name : ''}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="companyNIF"
                  label="Company NIF"
                  name="companyNIF"
                  value={purchaseOrder.companyNIF}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="companyAddress"
                  label="Address"
                  name="companyAddress"
                  value={purchaseOrder.companyAddress}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={1} />
          <Grid item xs={12} md={4}>
            {
              purchaseOrder.receptionSupplierType === 'external' ? (
                <Grid
                  container
                  spacing={2}
                  alignItems="flex-start"
                  direction="row"
                >
                  <Grid item xs={12}>
                    <TextField
                      id="receptionSupplierExternal"
                      label="Reception Supplier"
                      name="receptionSupplierExternal"
                      value={purchaseOrder.externalSupplierReception ? purchaseOrder.externalSupplierReception.companyName : ''}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="supplierNIF"
                      label="Supplier NIF"
                      name="supplierNIF"
                      value={purchaseOrder.supplierNIF}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="supplierResponsible"
                      label="Supplier's Responsible"
                      name="supplierResponsible"
                      value={purchaseOrder.supplierResponsible ? purchaseOrder.supplierResponsible : ''}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="supplierAddress"
                      label="Address"
                      name="supplierAddress"
                      value={purchaseOrder.supplierAddress}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
              ) : (<div />)
            }
            {
              purchaseOrder.receptionSupplierType === 'internal' ? (
                <Grid
                  container
                  spacing={2}
                  alignItems="flex-start"
                  direction="row"
                >
                  <Grid item xs={12} />
                  <Grid item xs={12} />
                  <Grid item xs={12} />
                  <Grid item xs={12}>
                    <TextField
                      id="receptionSupplierInternal"
                      label="Reception Supplier"
                      name="receptionSupplierInternal"
                      value={purchaseOrder.internalSupplierReception ? purchaseOrder.internalSupplierReception.name : ''}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="supplierNIF"
                      label="Supplier NIF"
                      name="supplierNIF"
                      value={purchaseOrder.supplierNIF}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="supplierAddress"
                      label="Address"
                      name="supplierAddress"
                      value={purchaseOrder.supplierAddress}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
              ) : (<div />)
            }
          </Grid>
        </Grid>
        <br />
        <Typography variant="subtitle2" component="h2" color="primary">
          ►   ITEMS
        </Typography>
        <br />
        {purchaseOrder.nbrConcepts ? purchaseOrder.nbrConcepts.map((row) => (
          <Grid
            container
            spacing={1}
            alignItems="flex-start"
            direction="row"
          >
            <Grid item xs={5}>
              <Grid
                container
                spacing={1}
                alignItems="flex-start"
                direction="row"
              >
                <Grid item xs={4}>
                  <TextField
                    id="itemNames"
                    label="Name"
                    name="itemNames"
                    value={purchaseOrder.itemNames[row]}
                    multiline
                    fullWidth
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    id="description"
                    label="Description"
                    name="description"
                    value={purchaseOrder.description[row]}
                    multiline
                    fullWidth
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <TextField
                id="unityValue"
                label="Unity Value"
                name="unityValue"
                value={Number(purchaseOrder.unityValue[row]).toFixed(2)}
                type="number"
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <Grid
                container
                spacing={1}
                alignItems="flex-start"
                direction="row"
              >
                <Grid item xs={5}>
                  <TextField
                    id="unity"
                    label="Unity"
                    name="unity"
                    value={purchaseOrder.unity[row]}
                    fullWidth
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={7}>
                  <TextField
                    id="unityNumber"
                    label="N° Unity"
                    name="unityNumber"
                    value={purchaseOrder.unityNumber[row]}
                    fullWidth
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <TextField
                id="valor"
                label="Value"
                name="valor"
                value={Number(purchaseOrder.valor[row]).toFixed(2)}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid
                container
                spacing={1}
                alignItems="flex-start"
                direction="row"
              >
                <Grid item xs={6}>
                  <TextField
                    id="givingDate"
                    label="Giving  Date"
                    name="givingDate"
                    value={purchaseOrder.givingDate[row]}
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="billingDate"
                    label="Billing  Date"
                    name="billingDate"
                    value={purchaseOrder.billingDate[row]}
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )) : ''}
        <br />
        <Grid
          container
          spacing={2}
          alignItems="flex-start"
          direction="row"
          justify="center"
        >
          <Grid item xs={12} md={3} sm={3}>
            <TextField
              id="totalLocal"
              label="Total Value in Local Currency"
              name="totalLocal"
              value={Number(purchaseOrder.totalLocal).toFixed(2)}
              type="number"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={3} sm={3}>
            <TextField
              id="localCurrency"
              label="Local Currency"
              name="localCurrency"
              value={purchaseOrder.currency ? purchaseOrder.currency.typeOfCurrency.currencyName : ''}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={3} sm={3}>
            <TextField
              id="totalEuro"
              label="Total Value in EURO"
              name="totalEuro"
              value={Number(purchaseOrder.totalEuro).toFixed(2)}
              type="number"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>
        <br />
        <Typography variant="subtitle2" component="h2" color="primary">
          ►   I.V.A
        </Typography>
        <Grid
          container
          spacing={2}
          alignItems="flex-start"
          direction="row"
          justify="center"
        >
          <Grid item xs={12} md={3} sm={3}>
            <TextField
              id="ivaValue"
              label="I.V.A Value %"
              name="ivaValue"
              value={purchaseOrder.iva ? purchaseOrder.iva.value : ''}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={3} sm={3}>
            <TextField
              id="totalIVALocal"
              label="I.V.A Value in Local Currency"
              name="totalIVALocal"
              value={Number(purchaseOrder.valueIVALocal).toFixed(2)}
              type="number"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={3} sm={3}>
            <TextField
              id="totalIVAEuro"
              label="I.V.A Value in EURO"
              name="totalIVAEuro"
              value={Number(purchaseOrder.valueIVAEuro).toFixed(2)}
              type="number"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>
        <br />
        <Grid
          container
          spacing={2}
          alignItems="flex-start"
          direction="row"
          justify="space-around"
        >
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" component="h2" color="primary">
              ● Total Amount
            </Typography>
          </Grid>
          <Grid item md={2} />
          <Grid
            container
            spacing={2}
            alignItems="flex-start"
            direction="row"
            justify="center"
          >
            <Grid item xs={12} md={3} sm={3}>
              <TextField
                id="totalAmountLocal"
                label="Total Amount in Local Currency"
                name="totalAmountLocal"
                value={Number(purchaseOrder.totalAmountLocal).toFixed(2)}
                type="number"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3} sm={3}>
              <TextField
                id="localCurrency"
                label="Local Currency"
                name="localCurrency"
                value={purchaseOrder.currency ? purchaseOrder.currency.typeOfCurrency.currencyCode : ''}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3} sm={3}>
              <TextField
                id="totalAmountEuro"
                label="Total Amount in EURO"
                name="totalAmountEuro"
                value={Number(purchaseOrder.totalAmountEuro).toFixed(2)}
                type="number"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <br />
        <Typography variant="subtitle2" component="h2" color="primary">
          ►   Retentions
        </Typography>
        <br />
        <Grid
          container
          spacing={2}
          alignItems="flex-start"
          justify="center"
          direction="row"
        >
          <Grid item md={0} />
          <Grid item xs={10} md={3}>
            <TextField
              id="ivaRetentions"
              label="I.V.A Retentions %"
              name="ivaRetentions"
              value={purchaseOrder.ivaRetentions}
              type="number"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={10} md={3}>
            <TextField
              id="totalAmountRetentions"
              label="Total Amount Retentions %"
              name="totalAmountRetentions"
              value={purchaseOrder.totalAmountRetentions}
              type="number"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={10} md={3}>
            <TextField
              id="totalIvaRetention"
              label="Total Retentions + I.V.A %"
              name="totalIvaRetention"
              value={purchaseOrder.totalIvaRetention}
              type="number"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={10} md={3}>
            <TextField
              id="paymentMethod"
              label="Payment Method"
              name="paymentMethod"
              value={purchaseOrder.paymentMethod}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>
        <Typography variant="subtitle2" component="h2" color="primary">
          ►   Terms And Conditions
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} />
          {
            purchaseOrder.termsListe ? purchaseOrder.termsListe.map((row) => (
              <Grid container spacing={2}>
                <Grid item xs={2} />
                <Grid item xs={3}>
                  <TextField
                    label="Term Title"
                    name="termTitle"
                    value={purchaseOrder.termTitle[row]}
                    fullWidth
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    label="Description"
                    name="termDescription"
                    value={purchaseOrder.termDescription[row]}
                    fullWidth
                    multiline
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} />
              </Grid>
            )) : ''
          }
        </Grid>
      </div>
    );
  }
}
export default withStyles()(connect(
)(PrintPurchaseOrder2));
