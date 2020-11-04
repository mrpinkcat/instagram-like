import { create as Create } from 'axios';

const StrapiAPI = new Create({
  baseURL: process.env.VUE_APP_STRAPI_API_URL,
});

export default StrapiAPI;
