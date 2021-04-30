import axios from 'axios';

const http = axios.create({
  baseURL: `${process.env.REACT_APP_COUNTRIES_API}/api/v0.1`,
  headers: { 'Content-type': 'application/json' },
  timeout: 10000,
});

const getAllCountries = () => http.get('/countries/iso');

export default getAllCountries;
