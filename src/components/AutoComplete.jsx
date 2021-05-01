import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const AutoComplete = ({
  value, name, label, error, options,
}) => (
  <Autocomplete
    name={name}
    id={name}
    value={value}
    renderInput={(params) => (
      <TextField
        {...params}
        label={label}
        variant="outlined"
        error={error}
        helperText={error}
      />
    )}
    options={options}
    getOptionLabel={(option) => (option ? option.name : '')}
    style={{ width: 230 }}
    onChange={(e, value) => formik.setFieldValue('country', value)}
  />
);

AutoComplete.PropTypes = {
  value,
};

export default AutoComplete;
