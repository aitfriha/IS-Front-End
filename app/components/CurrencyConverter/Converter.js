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

  convertHandler = () => {
    if (this.state.fromCurrency !== this.state.toCurrency) {
      axios
        .get(
          `https://api.exchangeratesapi.io/latest?base=${
            this.state.fromCurrency
          }&symbols=${this.state.toCurrency}`
        )
        .then(response => {
          const result = this.state.amount * response.data.rates[this.state.toCurrency];
          this.setState({ result: result.toFixed(5) });
        })
        .catch(error => {
          console.log('Opps', error.message);
        });
    } else {
      this.setState({ result: 'You cant convert the same currency!' });
    }
  };

  selectHandler = event => {
    if (event.target.name === 'from') {
      this.setState({ fromCurrency: event.target.value });
    } else if (event.target.name === 'to') {
      this.setState({ toCurrency: event.target.value });
    }
  };

  render() {
    // eslint-disable-next-line react/destructuring-assignment,react/prop-types
    const title = this.props.Title;
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
            value={this.state.amount}
            onChange={event => this.setState({ amount: event.target.value })}
          />
          <select
            name="from"
            onChange={event => this.selectHandler(event)}
            value={this.state.fromCurrency}
          >
            {this.state.currencies.map(cur => (
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
