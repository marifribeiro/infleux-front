import React, { useEffect, useState } from 'react';
import { useFormik, Field, FormikProvider } from 'formik';
import * as yup from 'yup';
import { createUseStyles } from 'react-jss';
import { Autocomplete, Alert } from '@material-ui/lab';
import {
  Box,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  FormHelperText,
  TextField,
  Button,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { RadioGroup } from 'formik-material-ui';
import TextInput from 'components/TextInput';
import getAllCountries from 'services/countries';
import createCampaign from 'services/campaigns';
import { currencyMask, removeCurrencyMask } from 'utils/currencyMask';
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
  root: {
    margin: '10px 0',
  },
  form: {
    overflow: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    textAlign: 'center',
    '& h1': {
      color: colors.pink,
    },
    '& h3': {
      marginTop: '15px',
    },
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  field: {
    width: '100%',
  },
  label: {
    textAlign: 'left',
  },
});

const initialValues = {
  name: '',
  description: '',
  conversionType: '',
  country: '',
  bid: '',
};

const campaignSchema = yup.object({
  name: yup.string().required('You must give your campaign a name'),
  description: yup.string(),
  conversionType: yup.string().required('You must select at least one conversion type'),
  country: yup.string().required().nullable(),
  bid: yup.string().required('You must type a bid'),
});

const Form = () => {
  const [countries, setCountries] = useState([]);
  const [toast, setToast] = useState({ severity: null, message: null });
  const classes = useStyles();

  useEffect(() => {
    getAllCountries().then(
      (res) => {
        setCountries(res.data.data.map((item) => item.name));
      },
    );
  }, []);

  const showToast = (severity, message) => {
    const delay = 5000;
    setToast({ severity, message });
    setTimeout(() => setToast({ severity: null, message: null }), delay);
  };

  const formatCampaign = (campaign) => ({
    name: campaign.name,
    description: campaign.description,
    conversionType: campaign.conversionType,
    country: campaign.country.toLowerCase().replace(' ', '-'),
    bid: removeCurrencyMask(campaign.bid),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: campaignSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const newCampaign = formatCampaign(values);
      createCampaign(newCampaign).then(
        () => {
          showToast('success', 'Campaign created successfully!');
          setSubmitting(false);
          resetForm();
        },
        () => {
          showToast('error', 'Something went wrong :( please try again');
        },
      );
    },
  });

  return (
    <FormikProvider value={formik}>
      {toast.severity
      && (
      <Alert variant="filled" severity={toast.severity}>
        {toast.message}
      </Alert>
      )}
      <form
        onSubmit={formik.handleSubmit}
        className={classes.form}
      >
        <div className={classes.title}>
          <h1>Infleux</h1>
          <h3>Create a new campaign</h3>
        </div>
        <div className={classes.fieldContainer}>
          <TextInput
            className={classes.root}
            name="name"
            label="Campaign name"
            value={formik.values.name}
            error={formik.touched.name && formik.errors.name}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextInput
            name="description"
            label="Campaign description"
            value={formik.values.description}
            error={formik.touched.description && formik.errors.description}
            helperText={formik.touched.description && formik.errors.description}
            rows={3}
          />
          <Box m={1}>
            <FormControl
              className={classes.field}
              name="conversionType"
              error={formik.touched.conversionType && formik.errors.conversionType}
            >
              <FormLabel color="secondary" classes={classes.label}>Choose a conversion type:</FormLabel>
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
            formik.touched.conversionType && formik.errors.conversionType && (
            <FormHelperText>You must select at least one conversion type</FormHelperText>
            )
          }
            </FormControl>
          </Box>
          { countries && (
            <Autocomplete
              className={classes.field}
              name="country"
              id="country"
              value={formik.values.country}
              renderInput={(params) => (
                <StyledTextInput
                  className={classes.field}
                  {...params}
                  label="Country"
                  error={formik.errors.country}
                  helperText={formik.errors.country}
                />
              )}
              options={countries}
              getOptionLabel={(option) => (option || '')}
              getOptionSelected={(option, value) => option === value}
              style={{ width: '100%' }}
              onChange={(e, value) => formik.setFieldValue('country', value)}
            />
          ) }
          <TextInput
            name="bid"
            label="Bid price (USD)"
            value={formik.values.bid}
            onChange={(e) => formik.setFieldValue('bid', currencyMask(e.target.value))}
            error={formik.touched.bid && formik.errors.bid}
            helperText={formik.touched.bid && formik.errors.bid}
          />
          <Box m={1}>
            <Button
              className={classes.button}
              type="submit"
              variant="contained"
              color="secondary"
              onClick={formik.handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </div>
      </form>
    </FormikProvider>
  );
};

export default Form;
