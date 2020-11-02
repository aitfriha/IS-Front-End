import React from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import converter from './converter.css';

const styles = theme => ({});

class Converter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      amount: 1,
      currencies: []
    };
  }

  componentDidMount() {
    axios
      .get('https://api.exchangeratesapi.io/latest')
      .then(response => {
        const currencyAr = ['EUR'];
        for (const key in response.data.rates) {
          currencyAr.push(key);
        }
        this.setState({ currencies: currencyAr });
      })
      .catch(err => {
        console.log('oppps', err);
      });
  }

  convertHandler = (some) => {
    const { callbackFromParent } = this.props;
    let result;
    if (this.state.fromCurrency !== this.state.toCurrency) {
      axios
        .get(
          `https://api.exchangeratesapi.io/latest?base=${
            some
          }&symbols=${this.state.toCurrency}`
        )
        .then(response => {
          result = this.state.amount * response.data.rates[this.state.toCurrency];
          this.setState({ result: result.toFixed(5) });
          callbackFromParent(this.state.amount, this.state.fromCurrency,result.toFixed(5));
        })
        .catch(error => {
          console.log('Opps', error.message);
        });
    } else {
      this.setState({ result: 'You cant convert the same currency!' });
    }
  };

  selectHandler = event => {
    this.setState({ fromCurrency: event.target.value });
    this.convertHandler(event.target.value);
  };

  onChangeEstimatedValue = event => {

    this.setState({ amount: event.target.value });
    this.convertHandler(this.state.fromCurrency);

  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment,react/prop-types
    const title = this.props.Title;
    const { amount, fromCurrency, currencies } = this.state;
    return (
      <div className="Converter">
        <h6>
          {title}
          <span role="img" aria-label="money">
            &#x1f4b5;
          </span>
        </h6>
        <div className="Form">
          <input
            name="amount"
            type="text"
            value={amount}
            onChange={this.onChangeEstimatedValue}
          />
          <select
            name="fromCurrency"
            onChange={event => this.selectHandler(event)}
            value={fromCurrency}
          >
            {currencies.map(cur => (
              <option key={cur}>{cur}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

Converter.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Converter);
