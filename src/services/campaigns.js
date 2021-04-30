import axios from 'axios';

const http = axios.create({
  baseURL: `${process.env.REACT_APP_CAMPAIGNS_API}/api/v1`,
  headers: { 'Content-type': 'application/json' },
  timeout: 10000,
});

const createCampaign = (campaign) => http.post('/campaigns', campaign);

export default createCampaign;
