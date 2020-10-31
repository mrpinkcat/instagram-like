import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// Connexion HTTP à l'API
const httpLink = createHttpLink({
  uri: `${process.env.VUE_APP_STRAPI_API_URL}/graphql` || 'http://localhost:1337/graphql',
});

// Implémentation du cache
const cache = new InMemoryCache();

// Création du client apollo
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

export default apolloClient;
