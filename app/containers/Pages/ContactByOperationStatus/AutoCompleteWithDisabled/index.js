import React from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import '../../../../components/AutoCompleteMultiline/app.css';

class AutoCompleteMultiLineDisabled extends React.Component {

  render() {
    const { data } = this.props;
    return (
      <Autocomplete
        multiple
        fullWidth
        className="auto-complete-multiline"
        options={data}
        getOptionDisabled={(option) => option === data[0] || option === data[7] || option === data[11]}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="Service Type" />
        )}
      />
    );
  }
}


AutoCompleteMultiLineDisabled.propTypes = {
  data: PropTypes.array.isRequired,
};

export default AutoCompleteMultiLineDisabled;
