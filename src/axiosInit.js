import { create as Create } from 'axios';

const StrapiAPI = new Create({
  baseURL: 'http://localhost:1337',
  timeout: 1000,
});

export default StrapiAPI;
