import React, { useEffect, useState } from 'react';
import { useFormik, Field, FormikProvider } from 'formik';
import * as yup from 'yup';
import { createUseStyles } from 'react-jss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  FormControlLabel, Radio, FormControl, FormLabel, FormHelperText,
} from '@material-ui/core';
import { RadioGroup } from 'formik-material-ui';
import getAllCountries from 'services/countries';
import createCampaign from 'services/campaigns';
import { currencyMask, removeCurrencyMask } from 'utils/currencyMask';

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

const campaignSchema = yup.object({
  name: yup.string().required('You must give your campaign a name'),
  description: yup.string(),
  conversionType: yup.string().required('You must select at least one conversion type'),
  country: yup.object({
    name: yup.string(), Iso2: yup.string(), Iso3: yup.string(),
  }).required().nullable(),
  bid: yup.string().required('You must type a bid'),
});

const Form = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState([]);
  const [radioHelperText, setRadioHelperText] = useState('');
  const classes = useStyles();

  useEffect(() => {
    getAllCountries().then(
      (res) => {
        setCountries(res.data.data);
      },
      (err) => setError(err),
    );
  }, []);

  const formatCampaign = (campaign) => ({
    name: campaign.name,
    description: campaign.description,
    conversionType: campaign.conversionType,
    country: campaign.country.name.toLowerCase().replace(' ', '-'),
    bid: removeCurrencyMask(campaign.bid),
  });

  const sendCampaign = (campaign) => {
    createCampaign(campaign).then(
      (res) => console.log(res),
      (err) => console.log(err),
    );
  };

  const formik = useFormik({
    initialValues,
    validationSchema: campaignSchema,
    onSubmit: (values, errors) => {
      console.log(errors);
      if (formik.errors.conversionType) {
        setRadioHelperText('You must choose a country to advertise your campaign');
      }
      const newCampaign = formatCampaign(values);
      sendCampaign(newCampaign);
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
        <FormControl
          name="conversionType"
          error={formik.touched.conversionType && formik.errors.conversionType}
        >
          <FormLabel component="legend">Choose a conversion type:</FormLabel>
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
          <FormHelperText>{radioHelperText}</FormHelperText>
        </FormControl>
        {
          countries ? (
            <Autocomplete
              name="country"
              id="country"
              value={formik.values.country}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country"
                  variant="outlined"
                  error={formik.errors.country}
                  helperText={formik.errors.country}
                />
              )}
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
          label="Bid price (USD)"
          variant="outlined"
          value={formik.values.bid}
          onChange={(e) => formik.setFieldValue('bid', currencyMask(e.target.value))}
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
