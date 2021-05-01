import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { createUseStyles } from 'react-jss';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import colors from 'styles/colors';

const StyledTextInput = withStyles({
  root: {
    '& label.Mui-focused': {
      color: colors.purple,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: colors.purple,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&.Mui-focused fieldset': {
        borderColor: colors.purple,
      },
    },
  },
})(TextField);

const useStyles = createUseStyles({
  input: {
    width: '100%',
    marginBottom: '20px',
  },
  box: {
    width: '100%',
  },
});

const TextInput = ({
  name, label, value, error, helperText, rows, onChange,
}) => {
  const classes = useStyles();
  const { handleChange } = useFormikContext();

  TextInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    error: PropTypes.bool,
    helperText: PropTypes.string,
    rows: PropTypes.number,
    onChange: PropTypes.func,
  };

  TextInput.defaultProps = {
    error: false,
    helperText: '',
    rows: 1,
    onChange: handleChange,
  };

  return (
    <Box m={1.5} className={classes.box}>
      <StyledTextInput
        className={classes.input}
        id={name}
        name={name}
        label={label}
        value={value}
        error={error}
        helperText={helperText}
        rows={rows}
        multiline
        onChange={onChange}
      />
    </Box>
  );
};

export default TextInput;
