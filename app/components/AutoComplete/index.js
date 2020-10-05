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

const languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'C#',
    year: 2000
  },
  {
    name: 'C++',
    year: 1983
  },
  {
    name: 'Clojure',
    year: 2007
  },
  {
    name: 'Elm',
    year: 2012
  },
  {
    name: 'Go',
    year: 2009
  },
  {
    name: 'Haskell',
    year: 1990
  },
  {
    name: 'Java',
    year: 1995
  },
  {
    name: 'Javascript',
    year: 1995
  },
  {
    name: 'Perl',
    year: 1987
  },
  {
    name: 'PHP',
    year: 1995
  },
  {
    name: 'Python',
    year: 1991
  },
  {
    name: 'Ruby',
    year: 1995
  },
  {
    name: 'Scala',
    year: 2003
  }
];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function renderInput(inputProps) {
  const { classes, ref, ...other } = inputProps;

  return (
    <TextField
      variant="outlined"
      fullWidth
      className={classes.textField}
      InputProps={{
        inputRef: ref,
        ...other,
      }}
    />
  );
}
function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps}>
      {children}
    </Paper>
  );
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
    const { data } = this.props;
    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');
    const suggestions = data.filter(language => regex.test(language.name));

    if (suggestions.length === 0) {
      return [
        { isAddNew: true }
      ];
    }

    return suggestions;
  }

  getSuggestionValue = suggestion => {
    if (suggestion.isAddNew) {
      return this.state.value;
    }

    return suggestion.name;
  };

  renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const matches = match(suggestion.name, query);
    const parts = parse(suggestion.name, matches);
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
          {parts.map((part, index) => (
            part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 700 }}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            )
          ))}
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
    if (suggestion.isAddNew) {
      console.log('Add new:', this.state.value);
    }
  };

  render() {
    const { value, suggestions } = this.state;
    const { classes, placeholder, data } = this.props;
    const inputProps = {
      classes,
      placeholder,
      value,
      onChange: this.onChange
    };
    return (
      <Autosuggest
        theme={{
          container: classes.containerSearch,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
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
  type: PropTypes.string.isRequired
};

export default withStyles(styles)(AutoComplete);
