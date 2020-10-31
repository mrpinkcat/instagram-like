import Axios from 'axios';

const strapiAPI = new Axios.create({
  baseURL: 'http://localhost:1337',
  timeout: 1000,
});

export default strapiAPI;
