import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createUseStyles } from 'react-jss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from 'components/Container';

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
  country: '',
  bid: '',
};

const campaignSchema = yup.object({
  name: yup.string().required(),
  description: yup.string(),
  conversionType: yup.string().oneOf(['CPC', 'CPM', 'CPI']),
  country: yup.string(),
  bid: yup.string(),
});

const handleSubmit = (values, actions) => {
  console.log(values);
  actions.setSubmitting(false);
};

const Home = () => {
  const classes = useStyles();
  const formik = useFormik({
    initialValues,
    validationSchema: campaignSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <div className={classes.form}>
          <h1>Infleux</h1>
          <h3>Add a new campaign</h3>
          <TextField
            name="name"
            id="name"
            label="Campaign name"
            variant="outlined"
            value={formik.values.name}
            onChange={formik.handleChange}
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
          />
          <TextField
            name="bid"
            id="bid"
            label="Bid price"
            variant="outlined"
            value={formik.values.bid}
            onChange={formik.handleChange}
          />
          <Button type="submit" variant="contained" color="secondary">
            Submit
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default Home;
