import React, { useEffect, useState } from 'react';
import { useFormik, Field, FormikProvider } from 'formik';
// import * as yup from 'yup';
import { createUseStyles } from 'react-jss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FormControlLabel, Radio } from '@material-ui/core';
import { RadioGroup } from 'formik-material-ui';
import getAllCountries from 'services/countries';

const useStyles = createUseStyles({
  form: {
    overflow: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const initialValues = {
  name: '',
  description: '',
  conversionType: '',
  country: { name: '', Iso2: '', Iso3: '' },
  bid: '',
};

// const campaignSchema = yup.object({
//   name: yup.string(),
//   description: yup.string(),
//   conversionType: yup.string(),
//   country: yup.string(),
//   bid: yup.string(),
// });

const Form = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    getAllCountries().then(
      (res) => {
        const emptyValue = { name: '', Iso2: '', Iso3: '' };
        setCountries(res.data.data);
        countries.push(emptyValue);
      },
      (err) => setError(err),
    );
  }, []);

  const classes = useStyles();

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={formik.handleSubmit}
        className={classes.form}
      >
        <h1>Infleux</h1>
        <h3>Add a new campaign</h3>
        <TextField
          name="name"
          id="name"
          label="Campaign name"
          variant="outlined"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && formik.errors.name}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          name="description"
          id="description"
          label="Campaign description"
          variant="outlined"
          multiline
          rows={4}
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && formik.errors.description}
          helperText={formik.touched.description && formik.errors.description}
        />
        <div>
          Choose a conversion type:
        </div>
        <Field
          component={RadioGroup}
          name="conversionType"
          error={formik.touched.conversionType && formik.errors.conversionType}
        >
          <FormControlLabel
            value="CPM"
            control={(<Radio />)}
            label="CPM - Cost per mille impressions"
          />
          <FormControlLabel
            value="CPC"
            control={(<Radio />)}
            label="CPC - Cost per clicks"
          />
          <FormControlLabel
            value="CPI"
            control={(<Radio />)}
            label="CPI - Cost per install"
          />
        </Field>
        {
          countries ? (
            <Autocomplete
              name="country"
              id="country"
              value={formik.values.country}
              renderInput={(params) => <TextField {...params} label="Country" variant="outlined" />}
              options={countries}
              getOptionLabel={(option) => (option ? option.name : '')}
              getOptionSelected={(option, value) => option.name === value.name}
              style={{ width: 230 }}
              onChange={(e, value) => formik.setFieldValue('country', value)}
            />
          ) : (<div>{error}</div>)
        }

        <TextField
          name="bid"
          id="bid"
          label="Bid price"
          variant="outlined"
          value={formik.values.bid}
          onChange={formik.handleChange}
          error={formik.touched.bid && formik.errors.bid}
          helperText={formik.touched.bid && formik.errors.bid}
        />
        <Button type="submit" variant="contained" color="secondary" onClick={formik.handleSubmit}>
          Submit
        </Button>
      </form>
    </FormikProvider>
  );
};

export default Form;
