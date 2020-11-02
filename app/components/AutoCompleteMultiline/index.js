import React from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import './app.css';

class AutoCompleteMultiLine extends React.Component {

  render() {
    const { data } = this.props;
    return (
      <Autocomplete
        multiple
        fullWidth
        className="auto-complete-multiline"
        options={data}
        getOptionLabel={(option) => option.name}
        defaultValue={[data[0]]}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="Service Type" />
        )}
      />
    );
  }
}


AutoCompleteMultiLine.propTypes = {
  data: PropTypes.array.isRequired,
};

export default AutoCompleteMultiLine;
