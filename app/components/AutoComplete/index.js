import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { NavLink } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import styles from './AutoComplete-jss';

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function renderInput(inputProps) {
  const {
    classes, ref, lenghtCode, ...other
  } = inputProps;
  return (
    <TextField
      variant="outlined"
      className={classes.textField}
      InputProps={{
        inputRef: ref,
        ...other
      }}
      inputProps={{ maxLength: lenghtCode }}
      fullWidth
    />
  );
}
function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return <Paper {...containerProps}>{children}</Paper>;
}

class AutoComplete extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
    const { value, type } = this.props;
    value(newValue, type);
  };

  getSuggestions = value => {
    const escapedValue = escapeRegexCharacters(value.trim());
    const { data, attribute } = this.props;
    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');
    const suggestions = data.filter(elem => regex.test(elem[attribute]));

    if (suggestions.length === 0) {
      return [{ isAddNew: true }];
    }

    return suggestions;
  };

  getSuggestionValue = suggestion => {
    const { attribute } = this.props;
    if (suggestion.isAddNew) {
      return this.state.value;
    }

    return suggestion[attribute];
  };

  renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const { attribute } = this.props;
    const matches = match(suggestion[attribute], query);
    const parts = parse(suggestion[attribute], matches);
    if (suggestion.isAddNew) {
      return (
        <MenuItem selected={isHighlighted}>
          <div>
            [+] Add new:
            {' '}
            <strong>{this.state.value}</strong>
          </div>
        </MenuItem>
      );
    }
    return (
      <MenuItem selected={isHighlighted}>
        <div>
          {parts.map((part, index) => (part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 700 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          ))
          )}
        </div>
      </MenuItem>
    );
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (event, { suggestion }) => {
    const { choosedSuggestion } = this.props;
    if (suggestion.isAddNew) {
    } else {
      choosedSuggestion(suggestion);
    }
  };

  render() {
    const { value, suggestions } = this.state;
    const {
      classes, style, placeholder, data,lenghtCode
    } = this.props;
    const inputProps = {
      classes,
      placeholder,
      value,
      style,
      lenghtCode,
      onChange: this.onChange
    };
    return (
      <Autosuggest
        theme={{
          container: classes.containerSearch,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion
        }}
        renderInputComponent={renderInput}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        renderSuggestionsContainer={renderSuggestionsContainer}
        onSuggestionSelected={this.onSuggestionSelected}
        className={classes.autocomplete}
        inputProps={inputProps}
      />
    );
  }
}

AutoComplete.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  attribute: PropTypes.string.isRequired,
  choosedSuggestion: PropTypes.func
};

AutoComplete.defaultProps = {
  choosedSuggestion: () => {}
};

export default withStyles(styles)(AutoComplete);
